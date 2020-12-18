import React, { useEffect } from 'react'
import io from 'socket.io-client'

function Chat() {

    const socket = io('ws://localhost:3001')
    
    useEffect(  () => {
        socket.on('connect', () => {
            socket.send('hello')
        })

        socket.on('message', data => {
            console.log(` Server said -> ${data} `)
        })
        
    } ,[])

    return (
        <div>
            hi
        </div>
    )
}


export default Chat