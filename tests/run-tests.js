import assert from "node:assert/strict";
import {ConversationEngine} from "../src/core/conversation-engine.js";
import {EchoProvider} from "../src/providers/provider.js";

const engine=new ConversationEngine({provider:new EchoProvider()});
const a=await engine.handle("Oi, tudo bem?");
assert.equal(a.intent.intent,"greeting");
const b=await engine.handle("Qual foi aquele projeto?");
assert.ok(b.state.turns>=2);
const c=await engine.handle("Não, não foi isso que eu quis dizer.");
assert.equal(c.policy.mode,"repair");
import {RuleBasedProvider} from "../src/providers/provider.js";
import {inferPragmatics} from "../src/pragmatics/pragmatics-engine.js";

const ruleProvider=new RuleBasedProvider();
const greeting=await ruleProvider.generate({message:"Oi!",intent:"greeting",state:{turns:0}});
assert.match(greeting.text,/Oi|Opa/);
assert.equal(greeting.mode,"rule_based_dialogue");
assert.equal(inferPragmatics("Quero mudar de assunto.").conversationAct,"topic_change");
assert.equal(inferPragmatics("Espera, calma.").conversationAct,"pause");
assert.equal(inferPragmatics("Não entendi.").conversationAct,"clarification_request");
console.log("✓ conversation core and rule-based dialogue tests passed");
