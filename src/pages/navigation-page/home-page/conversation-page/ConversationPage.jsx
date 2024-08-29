import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getGroups} from "../../../../api/groupApi.js";
import {getUsers} from "../../../../api/usersApi.js";
import {errorNotification} from "../../../../utils/notificationHelper.js";
import {CircularProgress} from "@mui/material";

export default function ConversationPage() {
    const {chatEntityId, isGroup} = useParams();
    const [chatEntity, setChatEntity] = useState(null);

    const getApiFunction = () => {
        if (JSON.parse(isGroup)) {
            return getGroups('', chatEntityId);
        } else {
            return getUsers('', chatEntityId);
        }
    }

    useEffect(() => {
        setChatEntity(null);
        getApiFunction()
            .then(result => {
                setChatEntity(result.data.data[0])
            })
            .catch(error => {
                errorNotification(error.response.data.message);
            })
    }, [chatEntityId, isGroup]);
    return (
        <>
            {chatEntity ? (
                <div>
                    <div className={`p-2`}>
                        <p className={`my-1`}>{chatEntity.name}</p>
                    </div>
                </div>
            ) : <div className={`w-100 h-100 d-flex justify-content-center align-items-center`}>
                <CircularProgress/>
            </div>}
        </>
    )
}
