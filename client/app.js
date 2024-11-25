const { createApp, ref, onMounted, onBeforeUnmount } = Vue;

import MessageInput from './messageinput.js';

const app = createApp({
    setup() {
        const messages = ref([]);
        let socket = null;

        const connectWebSocket = () => {
            socket = new WebSocket(`ws://${window.location.host}/ws`);

            socket.onopen = () => {
                addMessage('Connected to server', 'received');
            };

            socket.onmessage = (event) => {
                addMessage(`Server: ${event.data}`, 'received');
            };

            socket.onclose = () => {
                addMessage('Disconnected from server', 'received');
            };

            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        };

        const sendMessage = (msg) => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(msg);
                addMessage(`You: ${msg}`, 'sent');
            } else {
                alert('WebSocket is not connected.');
            }
        };

        const addMessage = (text, type) => {
            messages.value.push({ text, type });
            setTimeout(() => {
                const messagesDiv = document.querySelector('.messages');
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }, 100);
        };

        onMounted(() => {
            connectWebSocket();
        });

        onBeforeUnmount(() => {
            if (socket) {
                socket.close();
            }
        });

        return {
            messages,
            sendMessage
        };
    }
});

// register components globally
app.component('message-input', MessageInput);

app.mount('#app');
