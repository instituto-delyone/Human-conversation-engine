export function validateResponse({response="",grounding={},claimedActions=[]}={}) {
  const errors=[];
  if(!response.trim()) errors.push("empty_response");
  if(grounding.shouldSayUnknown && /certamente|com certeza|resultado é|resultado e/i.test(response)) errors.push("unsupported_certainty");
  if(claimedActions.some(a=>a.status!=="completed")) errors.push("unconfirmed_action_claim");
  return {valid:errors.length===0,errors};
}
