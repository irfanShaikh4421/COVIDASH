const io = require('socket.io')(3001, { cors: { origin: '*' } })

io.on('connection', socket => {
    socket.send('Hello !')
    socket.send('YOlo !')
    socket.emit('greetings', 'Good Morning' )

    socket.on('marco',  () => {
        console.log(args)
    })
})