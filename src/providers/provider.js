export class Provider {
  async generate(){throw new Error("Provider.generate() must be implemented");}
}

export class EchoProvider extends Provider {
  async generate({message}) { return {text:`Entendi: ${message}`,citations:[]}; }
}


// Deterministic conversational scaffolding inspired by AIGAR's local dialogue patterns.
// It supports social turns and conversational repair; it is not a general knowledge engine.
export class RuleBasedProvider extends Provider {
  constructor({seed=0}={}) { super(); this.seed=seed; }

  async generate({message="",intent="conversation",pragmatics={},state={},memory=[]}={}) {
    const text=String(message).trim();
    const lower=text.toLocaleLowerCase("pt-BR");
    const signals=pragmatics.signals||[];
    const recentUser=(memory||[]).filter(x=>x.role==="user").at(-2)?.text||"";
    let response;

    if(intent==="greeting") {
      response=["Oi! Pode falar, estou acompanhando.","Opa! Manda, o que você queria me contar?","Oi! Tô aqui. Pode continuar."][(state.turns||0)+this.seed)%3];
    } else if(/\\b(para|pare|espera|calma|pausa)\\b/.test(lower)) {
      response="Tá. Pausando por aqui. Pode continuar quando quiser.";
    } else if(/\\b(não entendi|nao entendi|não sei|nao sei|confuso|confusa)\\b/.test(lower)) {
      response="Sem problema. Vamos por partes. Qual trecho ficou confuso, ou prefere que eu retome de outro jeito?";
    } else if(signals.includes("possible_closure_or_acknowledgement") || intent==="thanks") {
      response=["Fechou. Pode continuar quando quiser.","Por nada! Seguimos.","Certo. Tô acompanhando."][(state.turns||0)+this.seed)%3];
    } else if(signals.includes("topic_change") || /\\b(mudar de assunto|outra coisa|mudando de assunto)\\b/.test(lower)) {
      response="Claro, mudamos. Qual é o novo assunto?";
    } else if(signals.includes("continuation") || /\\b(e aí|então|sobre isso|e outra coisa)\\b/.test(lower)) {
      response=recentUser
        ? "Tá, vamos continuar desse ponto. Qual parte você quer retomar?"
        : "Claro. Me situa rapidinho: qual ponto você quer continuar?";
    } else if(intent==="question") {
      response="Entendi a pergunta. Você quer uma resposta direta ou quer que a gente explore o raciocínio juntos?";
    } else if(intent==="request_action") {
      response="Entendi o que você quer fazer. Antes de agir, vou confirmar o resultado esperado e o que está disponível aqui.";
    } else {
      response=["Entendi. Continua, tô acompanhando.","Certo — me conta mais dessa parte.","Ah, entendi a direção. O que aconteceu depois?","Tá. Qual é o ponto que você quer explorar primeiro?"][(state.turns||0)+this.seed)%4];
    }

    return {text:response,citations:[],mode:"rule_based_dialogue"};
  }
}
