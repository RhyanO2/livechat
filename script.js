const messages = document.getElementById('messages');
const form = document.getElementById('form');
const text = document.getElementById('text');

const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const ws = new WebSocket(`ws://livechat-production-4a9b.up.railway.app/t`);

function addMessage(content, type = 'recebida') {
  const wrapper = document.createElement('div');
  wrapper.className = `msg ${type}`;

  const card = document.createElement('div');
  card.className = 'card';
  card.textContent = content;

  wrapper.appendChild(card);
  messages.appendChild(wrapper);
  messages.scrollTop = messages.scrollHeight;
}

ws.onopen = () => addMessage('Conectado ao chat');
ws.onclose = () => addMessage('Desconectado');
ws.onerror = () => addMessage('Erro de conexão');
ws.onmessage = (event) => addMessage(event.data.toString());

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const value = text.value.trim();
  if (!value || ws.readyState !== WebSocket.OPEN) return;
  addMessage(value, 'enviada');
  ws.send(value);
  text.value = '';
  text.focus();
});
