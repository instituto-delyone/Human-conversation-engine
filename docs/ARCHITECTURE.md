# Human Conversation Engine — arquitetura v0.1

## Objetivo
Construir um agente conversacional que pareça uma pessoa em conversa cotidiana: acompanha contexto, entende referências, aceita correções, muda de assunto sem perder o fio e sabe dizer quando não sabe.

## Princípio
O LLM é o motor linguístico; o Conversation Engine é a camada de estado, contexto, memória, decisão, ferramentas e observabilidade.

## Camadas
1. Input/normalização
2. Intenção
3. Entidades e referências
4. Estado do diálogo
5. Memória seletiva
6. Política de resposta
7. Provider LLM
8. Validação/grounding
9. Ferramentas
10. Observabilidade
11. Memossomo para transporte de estado

## Estado da técnica que orienta o projeto
A literatura recente mostra que memória de longo prazo continua sendo um gargalo em agentes conversacionais. Trabalhos recentes exploram memórias centradas em eventos, grafos e recuperação seletiva; benchmarks também destacam recuperação correta, aprendizagem durante o uso, compreensão de longo alcance e esquecimento seletivo como competências distintas.

## Regra de ouro
Não confundir fluência linguística com continuidade conversacional. O primeiro vem principalmente do modelo; a segunda precisa de arquitetura.
