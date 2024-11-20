const { ref } = Vue;

export default {
    name: "MessageInput",
    template: `
        <div>
            <input 
                v-model="input" 
                @keyup.enter="send" 
                placeholder="Type a message..." 
            />
            <button @click="send">Send</button>
        </div>
    `,
    setup(props, { emit }) {
        const input = ref('');

        const send = () => {
            if (input.value.trim() !== '') {
                emit('send', input.value);
                input.value = '';
            }
        };

        return {
            input,
            send
        };
    }
};
