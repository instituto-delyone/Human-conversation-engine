import {ConversationEngine} from "../src/core/conversation-engine.js";
import {RuleBasedProvider} from "../src/providers/provider.js";

const engine=new ConversationEngine({
  provider:new RuleBasedProvider(),
  logger:event=>console.log("[event]",event.event)
});
for(const message of ["Oi!","A gente pode continuar aquele projeto?","Não, não foi isso que eu quis dizer.","Quero mudar de assunto."])
  console.log(">",message,"\n<",(await engine.handle(message)).response);
