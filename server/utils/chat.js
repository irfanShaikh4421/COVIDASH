const io = require('socket.io')(3001, { cors: { origin: '*' }, wsEngine: 'ws' })
const users = {}
const messages = [ { id: 123124, name: 'Test', image: "test" }]

const { verifyToken } = require('../utils/firebase')


io.use(async (socket, next) => {
    const authToken = socket.handshake.auth.token
    //console.log(socket.handshake.auth)
    if(authToken)
    {
        try{
            let r =  await verifyToken(authToken)
            if(r)
                next(null,true)
            else
                next(new Error('Not authenticated'))
        }
        catch(e){
            next(new Error('Not authenticated'))
        }
        
    }
    else
        next( new Error('Not authenticated'))

}) 

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