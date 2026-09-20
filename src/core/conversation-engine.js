import {detectIntent} from "../intent/intent-engine.js";
import {resolveReferences} from "../context/reference-resolver.js";
import {inferPragmatics} from "../pragmatics/pragmatics-engine.js";
import {buildResponsePolicy,fallback} from "../response/response-policy.js";
import {assessGrounding} from "../grounding/grounding-policy.js";
import {validateResponse} from "../validation/response-validator.js";
import {createConversationState,applyStateUpdate} from "../state/conversation-state.js";
import {MemoryStore} from "../memory/memory-store.js";

export class ConversationEngine {
  constructor({provider,memory=new MemoryStore(),state=createConversationState(),logger=()=>{}}={}) {
    if(!provider) throw new Error("ConversationEngine requires a provider");
    this.provider=provider; this.memory=memory; this.state=state; this.logger=logger;
  }

  async handle(message) {
    const intent=detectIntent(message);
    const references=resolveReferences(message,this.state);
    const pragmatics=inferPragmatics(message,this.state);
    const retrieved=this.memory.retrieve(message);
    this.logger({event:"message_received",message});
    this.logger({event:"intent_detected",...intent});
    this.logger({event:"context_retrieved",references,retrievedCount:retrieved.length});
    this.logger({event:"pragmatics_detected",...pragmatics});

    const policy=buildResponsePolicy({intent:intent.intent,confidence:intent.confidence,context:this.state});
    let response, toolResults=[];

    if(policy.mode==="clarify") {
      response=fallback({kind:"uncertain"});
    } else if(policy.mode==="repair") {
      response="Certo — entendi a correção. Vou usar essa nova interpretação daqui para frente.";
    } else {
      const result=await this.provider.generate({
        message,intent:intent.intent,confidence:intent.confidence,
        state:this.state,references,pragmatics,memory:retrieved
      });
      response=result?.text ?? "";
      toolResults=result?.toolResults ?? [];
    }

    const grounding=assessGrounding({answer:response,knowledge:this.state.availableKnowledge,state:this.state,toolResults});
    const validation=validateResponse({response,grounding,claimedActions:toolResults});
    if(!validation.valid) {
      this.logger({event:"response_validation_failed",errors:validation.errors});
      if(validation.errors.includes("empty_response")) response=fallback({kind:"unknown"});
    }

    this.memory.addTurn({role:"user",text:message,intent:intent.intent});
    this.memory.addTurn({role:"assistant",text:response});
    this.state=applyStateUpdate(this.state,{
      previousTopic:this.state.currentTopic,
      currentTopic:references.referent||this.state.currentTopic,
      lastQuestion:intent.intent==="question"?message:this.state.lastQuestion,
      lastAnswer:response,
      references:references.referent?[...this.state.references,references.referent].slice(-12):this.state.references,
      relevantHistory:retrieved,
      conversationPhase:policy.mode==="repair"?"clarification":"answer"
    });
    this.logger({event:"response_generated",intent:intent.intent});
    return {response,intent,pragmatics,references,grounding,validation,policy,state:this.state};
  }
}
