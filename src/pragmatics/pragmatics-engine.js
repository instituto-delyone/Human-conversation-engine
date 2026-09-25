const closure=/^(tá bom|ta bom|beleza|ok|certo|blz|até|ate|fechou|valeu)\s*[.!]?$/i;
const correction=/\b(não|nao)\s+(é|e)|não quis dizer|nao quis dizer|não foi isso|nao foi isso/i;
const continuation=/\b(e aí|então|entao|sobre isso|e outra coisa|continua|continuando)\b/i;
const topicChange=/\b(mudar de assunto|mudando de assunto|outra coisa|vamos falar de outra coisa)\b/i;
const pause=/^(para|pare|espera|calma|pausa|um minuto)\b/i;
const confusion=/\b(não entendi|nao entendi|não sei|nao sei|confuso|confusa)\b/i;

export function inferPragmatics(text="",state={}) {
  const signals=[];
  if(closure.test(text)) signals.push("possible_closure_or_acknowledgement");
  if(correction.test(text)) signals.push("correction");
  if(continuation.test(text)) signals.push("continuation");
  if(topicChange.test(text)) signals.push("topic_change");
  if(pause.test(text)) signals.push("pause");
  if(confusion.test(text)) signals.push("confusion_or_uncertainty");
  if(text.endsWith("...")) signals.push("incomplete_or_ellipsis");
  const conversationAct=signals.includes("correction")?"repair":
    signals.includes("pause")?"pause":
    signals.includes("topic_change")?"topic_change":
    signals.includes("continuation")?"continuation":
    signals.includes("confusion_or_uncertainty")?"clarification_request":
    signals.includes("possible_closure_or_acknowledgement")?"acknowledgement":"ordinary_turn";
  return {signals,conversationAct};
}
