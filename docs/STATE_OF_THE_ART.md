# Estado da técnica — baseline do RoboEd

Este documento registra o baseline arquitetural para que o projeto não seja guiado apenas por impressão subjetiva de “parecer humano”.

## 1. Memória
Priorizar memória estruturada e recuperável em vez de simplesmente anexar todo o histórico. Linhas recentes de pesquisa exploram representações centradas em eventos, grafos de memória e recuperação seletiva. O RoboEd deve manter origem, tempo e relevância dos itens lembrados.

## 2. Avaliação
Testar memória em interação incremental: recuperação, aprendizagem durante a interação, compreensão de longo alcance e esquecimento seletivo. Uma conversa longa não deve ser considerada bem-sucedida apenas porque a última resposta parece boa.

## 3. Contexto
O contexto enviado ao LLM deve ser uma seleção operacional: objetivo atual, estado do diálogo, referências resolvidas, memórias relevantes e resultados de ferramentas.

## 4. Agência
Separar compreender, decidir e executar. Uma intenção não é uma ação. Uma ação só pode ser confirmada depois do resultado real da ferramenta.

## 5. Naturalidade
Avaliar pragmaticamente: mudança de tópico, reparo, elipse, referências, subentendidos, correções, concordância, desacordo e encerramento.

## 6. Metaengenharia de linguagem
A hipótese específica deste projeto é que o Conversation Engine pode tratar a linguagem como um sistema operacional da conversa: estado + referência + intenção + pragmática + memória + geração. Essa hipótese precisa ser testada, não assumida.

## 7. Métricas futuras
- referência resolvida corretamente
- intenção correta
- memória relevante recuperada
- contradições
- repetições
- perguntas de esclarecimento desnecessárias
- ações indevidamente alegadas como executadas
- naturalidade avaliada por humanos
- tamanho de contexto por turno
- latência por turno

## 8. Meta de engenharia
Buscar forte redução de contexto transmitido sem degradar a continuidade. A meta percentual de redução do Memossomo deve ser tratada como hipótese de benchmark, não como claim.
