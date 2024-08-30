import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getGroups} from "../../../../api/groupApi.js";
import {getUsers} from "../../../../api/usersApi.js";
import {errorNotification} from "../../../../utils/notificationHelper.js";
import {Button, CircularProgress} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {createConversation} from "../../../../api/conversationApi.jsx";
import {useSocket} from "../../../../context/SocketContext.jsx";
import classes from "./Conversation.module.css";
import ChatBox from "../../../../components/chat-box/ChatBox.jsx";
import {useSelector} from "react-redux";

export default function ConversationPage() {
    const loggedInUser = useSelector(state => state.authData.user);
    const socket = useSocket();
    const {chatEntityId, isGroup} = useParams();
    const [chatEntity, setChatEntity] = useState(null);
    const [message, setMessage] = useState('');
    const [conversationId, setConversationId] = useState(null);

    const getApiFunction = () => {
        if (JSON.parse(isGroup)) {
            return getGroups('', chatEntityId);
        } else {
            return getUsers('', chatEntityId);
        }
    }

    const handleGetChatEntityDetails = () => {
        getApiFunction()
            .then(result => {
                setChatEntity(result.data.data[0])
            })
            .catch(error => {
                errorNotification(error.response.data.message);
            })
    }
    const handleConversationCreation = () => {
        const data = {
            isGroup: isGroup,
            chatEntityId: chatEntityId
        }
        createConversation(data)
            .then(result => {
                console.log(result);
                setConversationId(result.data.data._id);
            })
            .catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        setChatEntity(null);
        handleGetChatEntityDetails();
        handleConversationCreation();
    }, [chatEntityId, isGroup]);

    useEffect(() => {
        handleReceivedMessage();
        return () => {
            if (socket) {
                socket.off('conversation');
            }
        }
    }, []);

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

    const handleReceivedMessage = () => {
        if (socket) {
            socket.on('conversation', (messageData) => {
                console.log('Received from conversation channel', messageData);

            })
        }
    }
    return (
        <>
            {chatEntity ? (
                <>
                    <div className={`h-100`}>
                        <div className={`p-2`}>
                            <p className={`my-1`}>{chatEntity.name}</p>
                        </div>
                        <div className={`mb-2 p-1 ${classes.chatTextBox}`}>
                            <ChatBox conversationId={conversationId}/>
                        </div>
                        <form onSubmit={handleSentMessage} className={`d-flex`}>
                            <input
                                type="text"
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                placeholder="Enter something here"
                                className={`form-control`}
                            />
                            <Button type="submit">
                                <SendIcon/>
                            </Button>
                        </form>
                    </div>
                </>
            ) : <div className={`w-100 h-100 d-flex justify-content-center align-items-center`}>
                <CircularProgress/>
            </div>}
        </>
    )
}
