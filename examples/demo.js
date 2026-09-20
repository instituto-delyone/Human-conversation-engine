import {ConversationEngine} from "../src/core/conversation-engine.js";
import {EchoProvider} from "../src/providers/provider.js";

const engine=new ConversationEngine({
  provider:new EchoProvider(),
  logger:event=>console.log("[event]",event.event)
});
for(const message of ["Oi!","A gente pode continuar aquele projeto?","Não, não foi isso que eu quis dizer."])
  console.log(">",message,"\n<",(await engine.handle(message)).response);
