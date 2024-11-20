const { createApp, ref, onMounted, onBeforeUnmount } = Vue;

createApp({
    setup() {
        const inputMessage = ref('');
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

        const sendMessage = () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(inputMessage.value);
                addMessage(`You: ${inputMessage.value}`, 'sent');
                inputMessage.value = '';
            } else {
                alert('WebSocket is not connected.');
            }
        };

        const addMessage = (text, type) => {
            messages.value.push({ text, type });
            // scroll to bottom
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
            inputMessage,
            messages,
            sendMessage
        };
    }
}).mount('#app');
