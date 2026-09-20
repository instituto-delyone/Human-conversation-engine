export function buildResponsePolicy({intent,confidence,context}) {
  if(confidence<0.55) return {mode:"clarify",reason:"low_confidence"};
  if(intent==="correction") return {mode:"repair",reason:"user_correction"};
  if(intent==="greeting") return {mode:"converse",reason:"greeting"};
  return {mode:"answer",reason:"normal"};
}

export function fallback({kind="unknown",options=[]}={}) {
  if(kind==="uncertain") return options.length ? `Entendi parte do que você quis dizer. Você está falando de ${options.join(" ou ")}?` : "Entendi parte do que você disse, mas quero confirmar antes de seguir.";
  if(kind==="unavailable") return "Entendi o que você quer fazer, mas essa função ainda não está disponível aqui.";
  return "Entendi o objetivo, mas não tenho informação suficiente para responder sem inventar.";
}
