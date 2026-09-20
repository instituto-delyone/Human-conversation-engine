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
console.log("✓ conversation core smoke tests passed");
