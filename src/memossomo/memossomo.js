export const MEMOSSOMO_VERSION="0.1.0";

export function exportMemossomo({state,memory=[],references=[],provenance=[]}={}) {
  return {
    protocol:"memossomo",
    version:MEMOSSOMO_VERSION,
    createdAt:new Date().toISOString(),
    state:{
      currentTopic:state?.currentTopic??null,
      userGoal:state?.userGoal??null,
      currentTask:state?.currentTask??null,
      pendingQuestion:state?.pendingQuestion??null,
      entities:state?.entities??{},
      preferences:state?.preferences??{},
      conversationPhase:state?.conversationPhase??null
    },
    memory,
    references,
    provenance
  };
}

export function importMemossomo(packet,{state,memoryStore}={}) {
  if(!packet || packet.protocol!=="memossomo") throw new Error("Invalid Memossomo packet");
  const nextState={...state,...packet.state};
  for(const item of packet.memory||[]) memoryStore?.addTurn(item);
  return {state:nextState,version:packet.version};
}
