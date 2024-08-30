import classes from "./ChatBox.module.css";
import {useEffect, useState} from "react";
import {getConversation} from "../../api/conversationApi.jsx";
import {useSelector} from "react-redux";
import {formatTo12HoursTime} from "../../utils/utilHelper.js";

export default function ChatBox({ conversationId }) {
    const loggedInUser = useSelector(state => state.authData.user);
    const [chats, setChats] = useState([])

    const handleFetchChats = () => {
        getConversation(conversationId)
            .then(result => {
                setChats(result.data.chats);
            })
            .catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        handleFetchChats();
    }, []);
    return (
        <>
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
        </>
    )
}
