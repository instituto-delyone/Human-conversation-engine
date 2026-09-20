# Avaliação do agente

A pergunta não é “ele parece inteligente?”. A pergunta é “ele mantém uma conversa coerente sob variação e pressão?”.

## Eixos
1. **Referência:** resolve isso/ele/aquilo/aquele e entidades omitidas.
2. **Intenção:** identifica objetivo comunicativo.
3. **Estado:** mantém tópico, objetivo e perguntas pendentes.
4. **Repair:** incorpora correções sem insistir no erro anterior.
5. **Pragmática:** distingue pergunta, encerramento, continuação, concordância e mudança de tópico.
6. **Memória:** recupera informação relevante e evita ruído.
7. **Grounding:** diferencia contexto, conhecimento, ferramenta e desconhecimento.
8. **Ação:** não afirma execução sem resultado confirmado.
9. **Naturalidade:** evita repetição, rigidez e respostas desproporcionais.
10. **Eficiência:** mede tokens/contexto, latência e custo.

## Teste de ouro
Cada diálogo deve poder ser executado novamente depois de uma alteração arquitetural. Se a mudança melhora um eixo e piora outro, isso deve aparecer no relatório.

## Futuro
Adicionar conjuntos LoCoMo/LongMemEval/MemoryAgentBench apenas conforme as licenças, formatos e condições de uso forem verificados; eles servem como referências externas, não como substitutos de um benchmark próprio de conversa em português.
