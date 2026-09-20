export function evaluateTurn({expected=[],actual={}}={}) {
  const labels=new Set(expected);
  const checks={
    intent:labels.has(actual.intent?.intent)?1:0,
    repair:labels.has("repair") ? (actual.policy?.mode==="repair"?1:0) : 1,
    reference_resolution:labels.has("reference_resolution") ? (actual.references?.referent?1:0) : 1,
    response:actual.response?.length>0?1:0
  };
  const keys=Object.keys(checks);
  const score=keys.reduce((a,k)=>a+checks[k],0)/keys.length;
  return {score,checks};
}
