const PRONOUNS=["isso","isto","aquilo","ele","ela","aquele","aquela","lá","aqui","o outro","mesmo","anterior"];

export function extractReferenceCues(text="") {
  const lower=text.toLowerCase();
  return PRONOUNS.filter(x=>lower.includes(x));
}

export function resolveReferences(text,state={}) {
  const cues=extractReferenceCues(text);
  const candidates=[...(state.references||[]),...(Object.values(state.entities||{}))].filter(Boolean);
  const referent=candidates.at(-1) ?? null;
  return {cues,referent,confidence:referent ? 0.65 : 0};
}
