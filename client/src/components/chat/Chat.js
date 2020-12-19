import React, { useEffect, useState, useContext } from 'react'
import io from 'socket.io-client'
import {List, Avatar, Row, Col, Typography, Input} from 'antd'
import EVENTS from './event'
import { AuthContext } from '../../firebase/Auth';
import defaultPhoto from '../../img/no-user.png'

const { Title, Text } = Typography
let socket

function Chat() {
    const { currentUser } = useContext(AuthContext);
    const [userId, setUserId] = useState(null)
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState('')
    const [chats, setChats] = useState([ { name:'Test', image: null, message: 'Lorem Ipsum' } ])
    
    
    useEffect(  () => {
        console.log('called')

        async function _init(){
            const token = await currentUser.getIdToken()
            socket = io('ws://localhost:3001',{ auth : { token }})

            socket.on('connect', () => {
                console.log(`connected`)
                setUserId(socket.id)
    
                if(error)
                    setError(null)
            })
    
            socket.on('connect_error', (r) => {
                setError('Connection failed')
            })
    
            socket.emit(EVENTS.CONNECT, { name: "Irfan", "image": "http:/sadjas" })
    
            socket.on(EVENTS.CONNECTED, data => {
                console.log(` userConencted -> ${JSON.stringify(data)} `)
            })
    
            socket.on(EVENTS.MESSAGE, (data) => {
                setChats((d) =>  {
                    let x = d.concat(data)
                    return x
                } )
            })
        }
        
        _init()
       

        return function cleanup(){
            if(socket)
                socket.close()
        }

        
    } ,[])

    function sendMessage(){
        let tmp = {
            name: currentUser.displayName,
            image: currentUser.photoURL ? currentUser.photoURL : defaultPhoto,
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
            

            {!userId && !error ? (<h1>CONNECTING</h1>) : null }
            {!userId && error ? (<h1>Failed connecting</h1>) : null}
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
                        avatar={<Avatar src={item.image} />}
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