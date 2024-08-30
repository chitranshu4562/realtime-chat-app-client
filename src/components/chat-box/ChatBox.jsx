import classes from "./ChatBox.module.css";
import {useEffect, useState} from "react";
import {getConversation} from "../../api/conversationApi.jsx";
import {useSelector} from "react-redux";
import {formatTo12HoursTime} from "../../utils/utilHelper.js";
import {useSocket} from "../../context/SocketContext.jsx";
import SendIcon from '@mui/icons-material/Send';
import {Button} from "@mui/material";

export default function ChatBox({ conversationId }) {
    const socket = useSocket();
    const loggedInUser = useSelector(state => state.authData.user);
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState('');

    const handleFetchChats = () => {
        getConversation(conversationId)
            .then(result => {
                setChats(result.data.chats);
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleReceivedMessage = () => {
        if (socket) {
            socket.on('conversation', (messageData) => {
                console.log('Received from conversation channel', messageData);
                if (conversationId === messageData.conversation.toString()) {
                    setChats(prevState => [...prevState, messageData])
                }
            })
        }
    }

    useEffect(() => {
        handleReceivedMessage();

        return () => {
            if (socket) {
                socket.off('conversation');
            }
        }
    }, []);

    useEffect(() => {
        handleFetchChats();
    }, [conversationId]);

    const setScrollToBottom = () => {
        const element = document.getElementById('chat-box-container');
        element.scrollTop = element.scrollHeight;
    }

    useEffect(() => {
        setScrollToBottom();
    }, [chats]);

    const handleSentMessage = (e) => {
        e.preventDefault();
        const data = {
            message: message,
            conversationId: conversationId,
            senderId: loggedInUser.id
        }
        socket.emit('conversation', data);
        setMessage('');
    }
    return (
        <>
            <div className={classes.chatTextContainer}>
                <div className={classes.chatTextBoxContainer} id="chat-box-container">
                    {chats.length === 0 && (
                        <h2 className={`w-100 h-100 d-flex justify-content-center align-items-center`}>
                            No chats yet
                        </h2>
                    )}
                    {chats.length > 0 && chats.map(chat => {
                        const isSender = chat.sender.toString() === loggedInUser.id;
                        return (
                            <div key={chat._id} className={`d-flex my-1 ${isSender ? 'justify-content-end' : ''}`}>
                                <div className={classes.chatText}>
                                    <p key={chat._id} className={`mb-0`}>{chat.content}</p>
                                    <p className={`mb-0 ${classes.timestamp}`}>{formatTo12HoursTime(chat.createdAt)}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={`my-2`}>
                <form onSubmit={handleSentMessage} className={`d-flex gap-2`}>
                    <input
                        type="text"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        className={`form-control`}
                        placeholder="Enter something here"
                    />
                    <Button type="submit">
                        <SendIcon/>
                    </Button>
                </form>
            </div>
        </>
    )
}
