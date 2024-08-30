import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getGroups} from "../../../../api/groupApi.js";
import {getUsers} from "../../../../api/usersApi.js";
import {errorNotification} from "../../../../utils/notificationHelper.js";
import {CircularProgress} from "@mui/material";
import {createConversation} from "../../../../api/conversationApi.jsx";
import classes from "./Conversation.module.css";
import ChatBox from "../../../../components/chat-box/ChatBox.jsx";

export default function ConversationPage() {
    const {chatEntityId, isGroup} = useParams();
    const [chatEntity, setChatEntity] = useState(null);
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

    return (
        <>
            {chatEntity ? (
                <>
                    <div style={{ height: '70vh' }}>
                        <div className={`p-2`}>
                            <p className={`my-1`}>{chatEntity.name}</p>
                        </div>
                        <div className={`p-1`} style={{height: '90%'}}>
                            {conversationId && <ChatBox conversationId={conversationId}/>}
                        </div>
                    </div>
                </>
            ) : <div className={`w-100 h-100 d-flex justify-content-center align-items-center`}>
                <CircularProgress/>
            </div>}
        </>
    )
}
