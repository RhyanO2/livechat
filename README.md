# 💬 LiveChat — WebSocket Chat em Tempo Real

Projeto desenvolvido com o objetivo de **entender na prática como funciona um chat via WebSocket**, explorando a comunicação bidirecional em tempo real entre múltiplos clientes conectados a um servidor.

---

## 📌 Sobre o Projeto

O LiveChat é uma aplicação simples de chat em tempo real. Cada mensagem enviada por um cliente é repassada para todos os outros conectados na mesma sala, sem necessidade de recarregar a página.

O backend roda como um servidor **Fastify** com suporte a WebSocket, hospedado no **Railway**. O frontend é um arquivo HTML estático que pode ser aberto localmente via um servidor local simples.

---

## 🚀 Tecnologias Utilizadas

### Backend
| Tecnologia | Descrição |
|---|---|
| TypeScript | Linguagem principal do servidor |
| Fastify | Framework web leve e de alta performance |
| @fastify/websocket | Plugin para suporte a WebSocket no Fastify |
| @fastify/cors | Plugin de CORS para permitir conexões do frontend |
| ws | Biblioteca WebSocket utilizada internamente |
| pino-pretty | Formatação legível dos logs do servidor |
| tsx | Execução de TypeScript diretamente no Node.js (dev) |

### Frontend
| Tecnologia | Descrição |
|---|---|
| HTML + CSS | Interface do chat (sem frameworks) |
| JavaScript (Vanilla) | Lógica de conexão WebSocket no lado do cliente |
| WebSocket API | API nativa do browser para conexão com o servidor |

...e muito mais!
