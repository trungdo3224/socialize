import React, { useEffect, useState, useRef } from "react";
import { useId } from "react";
import { addMessage, getMessages } from "../../api/messageRequest";
import Moment from 'react-moment';

import { getUser } from "../../api/userRequests";
import "./ChatBox.css";
// import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'

const ChatBox = ({ chat, currentUserId, setSendMessage, receivedMessage }) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scroll = useRef();
    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    // fetching data for header
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUserId);
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) getUserData();
    }, [chat, currentUserId]);

    // fetch messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) fetchMessages();
    }, [chat]);




    // Send Message
    const handleSend = async (e) => {
        e.preventDefault()
        const message = {
            senderId: currentUserId,
            text: newMessage,
            chatId: chat._id,
        }
        const receiverId = chat.members.find((id) => id !== currentUserId);
        // send message to socket server
        setSendMessage({ ...message, receiverId })
        // send message to database
        try {
            const { data } = await addMessage(message);
            setMessages([...messages, data]);
            setNewMessage("");
        }
        catch
        {
            console.log("error")
        }
    }

    // Receive Message from parent component
    useEffect(() => {
        console.log("Message Arrived: ", receivedMessage)
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage]);
        }

    }, [receivedMessage])

    // scroll to the last message 
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages]);

    return (
        <div className="chatbox-container">
            {chat ? <>
                <div className="chat-header">
                    <div className="follower">

                        <div>

                            <img
                                src={`${process.env.REACT_APP_PUBLIC_FOLDER}${userData?.profilePicture}`
                                    || `${process.env.REACT_APP_PUBLIC_FOLDER}defaultProfile.png`}
                                alt=""
                                className='follower-image'
                                style={{ width: '50px', height: '50px' }}
                            />
                            <div className="name" style={{ fontSize: "0.8rem" }}>
                                <span>{userData?.firstname} {userData?.lastname}</span>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="chat-body">
                    {messages.map((message, i) => (
                        <>
                            <div ref={scroll}></div>
                            <div
                                key={i}
                                className={message.senderId === currentUserId ? 'message own' : 'message'}
                            >

                                <span>{message.text}</span>
                                <span><Moment fromNow>{message.createdAt}</Moment></span>
                            </div>
                        </>
                    ))}
                </div>
                <div className="chat-sender">
                    <div>+</div>
                    <InputEmoji
                        value={newMessage}
                        onChange={handleChange}
                    />
                    <div className="send-button button" onClick={handleSend}>
                        Send
                    </div>
                </div>
            </>
                : (
                    <span className="chatbox-empty-message">
                        Click on a chat to start a conversation
                    </span>
                )
            }
        </div>
    )
}

export default ChatBox
