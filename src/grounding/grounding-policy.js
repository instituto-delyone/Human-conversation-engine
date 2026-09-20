export function assessGrounding({answer="",knowledge=[],state={},toolResults=[]}={}) {
  const hasSources=knowledge.length>0 || toolResults.length>0;
  const hasContext=Object.keys(state).length>0;
  return {
    status:hasSources?"supported":hasContext?"context_supported":"unsupported",
    shouldCite:hasSources,
    shouldSayUnknown:!hasSources && !hasContext,
    provenance:[...knowledge,...toolResults].map(x=>x.source||x.id||"unknown")
  };
}
