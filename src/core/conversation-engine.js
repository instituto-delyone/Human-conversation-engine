import {createConversationState,applyStateUpdate} from "../state/conversation-state.js";
import {detectIntent} from "../intent/intent-engine.js";
import {resolveReferences} from "../context/reference-resolver.js";
import {MemoryStore} from "../memory/memory-store.js";
import {buildResponsePolicy,fallback} from "../response/response-policy.js";

export class ConversationEngine {
  constructor({provider,memory=new MemoryStore(),state=createConversationState(),logger=()=>{}}={}) {
    this.provider=provider; this.memory=memory; this.state=state; this.logger=logger;
  }

  async handle(message) {
    const intent=detectIntent(message);
    const refs=resolveReferences(message,this.state);
    const retrieved=this.memory.retrieve(message);
    this.logger({event:"message_received",message});
    this.logger({event:"intent_detected",...intent});
    this.logger({event:"context_retrieved",references:refs,retrievedCount:retrieved.length});

    const policy=buildResponsePolicy({intent:intent.intent,confidence:intent.confidence,context:this.state});
    let response;

    if(policy.mode==="clarify") response=fallback({kind:"uncertain"});
    else if(policy.mode==="repair") {
      this.state=applyStateUpdate(this.state,{conversationPhase:"clarification",relevantHistory:retrieved});
      response="Certo — entendi a correção. Vou usar essa nova interpretação daqui para frente.";
    } else {
      response=(await this.provider.generate({
        message,
        intent:intent.intent,
        confidence:intent.confidence,
        state:this.state,
        references:refs,
        memory:retrieved
      })).text;
    }

    this.memory.addTurn({role:"user",text:message,intent:intent.intent});
    this.memory.addTurn({role:"assistant",text:response});
    this.state=applyStateUpdate(this.state,{
      previousTopic:this.state.currentTopic,
      currentTopic:refs.referent||this.state.currentTopic,
      lastQuestion:intent.intent==="question"?message:this.state.lastQuestion,
      lastAnswer:response,
      references:refs.referent?[...this.state.references,refs.referent].slice(-12):this.state.references,
      conversationPhase:"answer"
    });
    this.logger({event:"response_generated",intent:intent.intent});
    return {response,intent,policy,state:this.state};
  }
}
