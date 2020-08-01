const socket = io('https://baatein-chatapp.herokuapp.com/');

// Get DOM Elements w.r.t Js Variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

// Notification Sound
var audio = new Audio(src="Assets/sounds/notif.mp3");       

// Function that will append the event info to the container
const append = (message, position)=> {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

// Asking for Username and Notify Server
const name = prompt('Enter Your Username to Join:');
socket.emit('new-user-joined', name);

// New Users, receive event from the server
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')

})

socket.on('left', name => {
    append(`${data.name} left the chat`, 'left')

})

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''  
})  