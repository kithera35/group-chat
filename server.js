const express = require('express')
const socket = require('socket.io')

const app = express()
const server = app.listen(4000)


app.use(express.static('public'))

const io = socket(server)

io.on('connection', (socket) => {
    console.log("someone has connected the server")

    socket.on('chat', data => { // sending message
        io.sockets.emit('chat', data)
    })

    socket.on('typing', data => { // typing message
        io.sockets.emit('typing', data)
    })
})