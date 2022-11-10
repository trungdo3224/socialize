import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { UilSetting } from "@iconscout/react-unicons";

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";


import "../../components/RightSide/RightSide.css";
import "./Chat.css";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import Conversation from '../../components/Conversation/Conversation';
import { userChats } from '../../api/chatRequest';
import ChatBox from '../../components/ChatBox/ChatBox';
import { io } from "socket.io-client"
import { useRef } from 'react';



const Chat = () => {
    const { user } = useSelector((state) => state.authReducer.authData);

    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    // Get the chat in chat section
    const socket = io(process.env.REACT_APP_BASE_SOCKET);

    useEffect(() => {
        let isMounted = false; // handle useEffect async possible data leak
        const getChats = async () => {
            try {
                if (!isMounted) {
                    const { data } = await userChats(user._id);
                    setChats(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
        return () => { isMounted = true }
    }, [user._id]);

    // Connect to Socket.io
    useEffect(() => {

        socket.emit("add-new-user", user._id);
        socket.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [user]);

    // Send Message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.emit("send-message", sendMessage);
        }
    }, [sendMessage]);


    // Get the message from socket server
    useEffect(() => {
        socket.on("recieve-message", (data) => {
            console.log(data)
            setReceivedMessage(data);
        }

        );
    }, []);

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    }

    return (
        <div className='chat'>
            <div className="left-side-chat">
                <LogoSearch />
                <div className="chat-container">
                    <h2>CHATS</h2>

                    <div className="chat-list">
                        {chats.map((chat, index) => (
                            <div key={index} onClick={() => setCurrentChat(chat)}>
                                <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="right-side-chat">
                <div style={{ width: '10rem', alignSelf: 'flex-end' }}>
                    <div className="nav-icons">
                        <Link to="/home"><img src={Home} alt="" /></Link>
                        <UilSetting />
                        <img src={Noti} alt="" />
                    </div>
                </div>

                {/* chat body */}
                <ChatBox
                    chat={currentChat}
                    currentUserId={user._id}
                    setSendMessage={setSendMessage}
                    receivedMessage={receivedMessage}
                />
            </div>
        </div>
    )
}

export default Chat
