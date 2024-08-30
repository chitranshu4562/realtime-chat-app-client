import classes from "./HomePage.module.css";
import {useState} from "react";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import {Button, IconButton} from "@mui/material";
import CreateGroup from "../../../components/create-group/CreateGroup.jsx";
import ChatList from "../../../components/chat-list/ChatList.jsx";
import {Outlet} from "react-router-dom";

export default function HomePage() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <>
            {isOpen && <CreateGroup open={isOpen} onClose={handleClose}/>}
            <div className={`row mt-4 ${classes.homeContainer}`}>
                <div className={`d-flex justify-content-end my-2`}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: 'green' }}
                        startIcon={<AddCircleSharpIcon/>}
                        onClick={handleOpen}
                    >
                        Create Group
                    </Button>
                </div>
                <div className={`col-3`}>
                    <ChatList/>
                </div>
                <div className={`col-9 ${classes.chatRoom}`}>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
