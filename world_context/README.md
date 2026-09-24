# World Context

Esta pasta contém conhecimento geral usado pelo Human Conversation Engine para compreender referências e conceitos de mundo.

## Estrutura

- `books/` — livros e outras fontes extensas em PDF.
- `concepts/` — conceitos estruturados e conhecimento leve.
- `language/` — informações úteis para compreensão linguística.
- `social/` — contexto social e pragmático geral.
- `temporal/` — conceitos temporais e referências gerais.

## Livros

Coloque os PDFs em:

`world_context/books/`

Exemplo:

`world_context/books/Sapiens_Uma_Breve_Historia_da_Humanidade.pdf`

O PDF deve ser tratado como **fonte de conhecimento**, não como memória de uma conversa.

A próxima camada do engine poderá indexar os livros, localizar trechos relevantes e fornecer somente o contexto necessário à conversa.

## Regra arquitetural

**World Context ≠ Conversation Memory**

- World Context: conhecimento geral sobre o mundo.
- Logs/Memory: experiências e acontecimentos das conversas.
- Conversation State: contexto da conversa atual.
- Retrieval: mecanismo que seleciona o que precisa ser trazido para o contexto.

Não é necessário alterar o código quando um novo livro for adicionado. O objetivo é que a futura indexação descubra os livros presentes nesta pasta.
