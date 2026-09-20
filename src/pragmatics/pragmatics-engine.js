const closure=/^(tá bom|ta bom|beleza|ok|certo|blz|até|ate)\s*[.!]?$/i;
const correction=/\b(não|nao)\s+(é|e)|não quis dizer|nao quis dizer/i;
const continuation=/\b(e aí|então|entao|sobre isso|e outra coisa)\b/i;

export function inferPragmatics(text="",state={}) {
  const signals=[];
  if(closure.test(text)) signals.push("possible_closure_or_acknowledgement");
  if(correction.test(text)) signals.push("correction");
  if(continuation.test(text)) signals.push("continuation");
  if(text.endsWith("...")) signals.push("incomplete_or_ellipsis");
  return {signals,conversationAct:signals.includes("correction")?"repair":signals.includes("continuation")?"continuation":signals.includes("possible_closure_or_acknowledgement")?"acknowledgement":"ordinary_turn"};
}
