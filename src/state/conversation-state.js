export function createConversationState(overrides={}) {
  return {
    sessionId: crypto.randomUUID(),
    currentTopic:null, previousTopic:null, userGoal:null, currentTask:null,
    lastQuestion:null, lastAnswer:null, pendingQuestion:null,
    entities:{}, references:[], relevantHistory:[],
    availableKnowledge:[], unknownInformation:[], conversationPhase:"greeting",
    preferences:{}, turns:0, ...overrides
  };
}

export function applyStateUpdate(state, patch={}) {
  return {...state,...patch,turns:(state.turns||0)+1};
}
