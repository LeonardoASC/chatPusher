import { createApp } from 'vue';
import axios from 'axios';
import ChatMessages from './components/ChatMessages.vue';
import ChatForm from './components/ChatForm.vue';
// import Pusher from 'pusher-js';

const app = createApp({});

app.component('chat-messages', ChatMessages);
app.component('chat-form', ChatForm);


app.mixin({
    data() {
        return {
            messages: []
        };
    },
    created() {
        this.fetchMessages();
        
    },
    methods: {
        fetchMessages() {
            axios.get('/messages').then(response => {
                this.messages = response.data;
            });
        },
        addMessage(message) {
            this.messages.push(message);
            axios.post('/messages', message).then(response => {
                console.log(response.data);
            });
        }
    }
});

app.mount('#app');
