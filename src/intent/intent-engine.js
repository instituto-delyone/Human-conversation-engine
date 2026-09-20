const rules=[
  [/^(oi|olá|ola|bom dia|boa tarde|boa noite)\b/i,"greeting"],
  [/\b(obrigad|valeu|brigad)\b/i,"thanks"],
  [/\b(não|nao) (é|e) isso|não quis dizer|nao quis dizer/i,"correction"],
  [/\b(pode explicar|me explica|o que é|o que significa)\b/i,"request_explanation"],
  [/\b(pesquisa|procura|busca)\b/i,"request_search"],
  [/\b(resuma|resume|resumo)\b/i,"request_summary"],
  [/\b(compare|comparar|diferença entre)\b/i,"request_comparison"],
  [/\b(faça|faz|crie|gera|construa|coloque)\b/i,"request_action"],
  [/[?？]$/,"question"]
];

export function detectIntent(text="") {
  for(const [rx,intent] of rules) if(rx.test(text)) return {intent,confidence:0.86};
  return {intent:"conversation",confidence:0.58};
}
