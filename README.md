# Human Conversation Engine

RoboEd Conversational Core — infraestrutura para construir um agente que conversa naturalmente, mantém contexto, recupera memória relevante, entende referências, aceita correções e executa ferramentas sem confundir intenção com execução.

## Estado atual

**v0.1 — fundação arquitetural**

O repositório contém:
- especificação AURORA-CONVERSATIONAL-CORE;
- motor mínimo de estado e intenção;
- resolução inicial de referências;
- memória curta/longa;
- pragmática inicial;
- grounding;
- registry de ferramentas;
- validação de resposta;
- avaliação mínima;
- protocolo inicial do Memossomo;
- testes de fumaça;
- roadmap e documentação de estado da técnica.

## Arquitetura

`message → intent → context → pragmatics → policy → provider → grounding → validation → state update`\n\nO provider é substituível. O núcleo pode operar com um provider determinístico, sem LLM; providers externos são opcionais. O `RuleBasedProvider` fornece respostas conversacionais simples e não pretende responder conhecimento aberto.

O Conversation Engine controla o estado operacional da conversa. O uso de LLM não é requisito arquitetural.

## Objetivo

Construir um agente que converse como uma pessoa normal em situações cotidianas, sem depender de um histórico bruto infinito. Conhecimento especializado será acoplado depois; o núcleo primeiro aprende a conversar.

## Próximos passos

Ver `docs/ROADMAP.md`, `docs/EVALUATION.md` e `docs/STATE_OF_THE_ART.md`.

## Princípio do projeto

Fluência não é apenas geração de texto. Continuidade, referência, pragmática, memória, grounding, reparo e execução são propriedades arquiteturais que precisam ser observáveis e testáveis.
