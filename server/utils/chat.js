const io = require('socket.io')(3001, { cors: { origin: '*' }, wsEngine: 'ws' })
const users = {}
const messages = [ { id: 123124, name: 'Test', image: "test" }]

io.on('connection', socket => {
    console.log('connected')


    socket.on('connectUser', data => {

        console.log(` User connected -> ${socket.id} `)
        users[socket.id] = { id: socket.id, name: data.name, image: data.image }
        socket.broadcast.emit('userConnected', users[socket.id])
        
        setTimeout( () => { console.log(` sending to ${socket.id}`); socket.to(socket.id).emit('PRIVATE', messages) }, 1000)
    })

    socket.on('intial', () => {
        console.log(args)
    })

    socket.on('world',  (data) => {
        console.log(` Incoming message ${JSON.stringify(data)} `)
        messages.push(data)
        io.emit('world',data)

    })
})