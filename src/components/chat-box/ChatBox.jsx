import classes from "./ChatBox.module.css";
import {useState} from "react";
import {getConversation} from "../../api/conversationApi.jsx";

export default function ChatBox({ conversationId }) {
    const [chats, setChats] = useState([])

    const handleFetchChats = () => {
        getConversation(conversationId)
            .then(result => {

            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <>
            {chats.length === 0 && (
                <h2 className={`w-100 h-100 d-flex justify-content-center align-items-center`}>
                    No chats yet
                </h2>
            )}
        </>
    )
}
