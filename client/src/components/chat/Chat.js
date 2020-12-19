import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import {List, Avatar, Row, Col, Typography, Input} from 'antd'
import EVENTS from './event'

function insertMessage(msg){
    // name, id, image, message

    return (
        <div>
            
        </div>
    )

}

let socket;

const { Title, Text } = Typography

function Chat() {


    const [userId, setUserId] = useState(null)
    const [msg, setMsg] = useState('')
    const [chats, setChats] = useState([ { name:'Test', image: null, message: 'Lorem Ipsum' } ])
    
    
    useEffect(  () => {
        console.log('called')
        socket = io('ws://localhost:3001')

        socket.on('connect', () => {
            console.log(`connected`)
            socket.send('hello')
            setUserId(socket.id)
        })

        socket.emit(EVENTS.CONNECT, { name: "Irfan", "image": "http:/sadjas" })

        socket.on(EVENTS.CONNECTED, data => {
            console.log(` userConencted -> ${JSON.stringify(data)} `)
        })

        socket.on(EVENTS.MESSAGE, (data) => {
           // alert(` New message ${JSON.stringify(data)} `)

            setChats((d) =>  {
                let x = d.concat(data)
              //alert(x)

                return x
            } )
        })

        return function cleanup(){
            socket.close()
        }

        
    } ,[])

    function sendMessage(){
        let tmp = {
            name: 'Irfan Shaikh',
            image: null,
            message: msg
        }

        socket.emit(EVENTS.MESSAGE, tmp)
    }

    const handleEnter = (e) => {
        e.preventDefault()

        sendMessage()
        setMsg('')

        
    }

    return (
        <Row >
            <Col span={24}>
                <Title>Chats</Title>
            </Col>
            

            {!userId ? (<h1>CONNECTING</h1>) : null }
            {userId ? (
            <Col span={24}>
                <List
                    size="small
                    "
                    itemLayout="horizontal"
                    dataSource={chats}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={item.name}
                        description={item.message}
                        />
                    </List.Item>
                    )}
                />
             </Col>)
           : null}

           <Col span={24}>
                <Input placeholder='Send a message' 
                    onChange={ (e) => setMsg(e.target.value) }
                    value={msg}
                    onPressEnter={handleEnter}
                />
           </Col>
        </Row>
    )
}


export default Chat