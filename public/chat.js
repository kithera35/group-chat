const socket = io.connect('http://localhost:4000')

const sender = document.getElementById('sender')
const message = document.getElementById('message')
const btnSendMessage = document.getElementById('btnSendMessage')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')

btnSendMessage.addEventListener('click', () => {

    if(!message.value==""){
        socket.emit('chat', {
            message: message.value,
            sender: sender.value
        })
    }
})

socket.on('chat', data => {
    output.innerHTML += '<p>' + '<strong>' +data.sender +'</strong>'+ ':' + data.message
    message.value = ' '
    feedback.innerHTML = ' '
})

message.addEventListener('keypress', () => { // user typing
    socket.emit('typing', sender.value)
})
message.addEventListener('blur', () => { // user not typing anymore
    feedback.innerHTML = ' '
})

socket.on('typing', data => { // change typing value
    feedback.innerHTML = '<strong>'+data +'</strong>'+ ' typing...'
})