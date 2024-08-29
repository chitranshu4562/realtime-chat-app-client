import userAvatarIcon from "../../assets/user-avatar.png";
import {Avatar} from "@mui/material";

export default function ChatCard({ cardData }) {
    return (
        <>
            <div className={`d-flex gap-2 align-items-center rounded p-1 my-1`} style={{ backgroundColor: '#cfffff'}}>
                <Avatar src={userAvatarIcon}/>
                <p className={`mb-0`}>{cardData.name}</p>
            </div>
        </>
    )
}
