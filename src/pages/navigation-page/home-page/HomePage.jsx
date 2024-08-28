import classes from "./HomePage.module.css";
import {useState} from "react";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import {Button, IconButton} from "@mui/material";
import ModalBox from "../../../components/ModalBox.jsx";
import CreateGroup from "../../../components/create-group/CreateGroup.jsx";

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
            <CreateGroup open={isOpen} onClose={handleClose}/>
            <div className={`row mt-4 ${classes.homeContainer}`}>
                <div className={`d-flex justify-content-end`}>
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

                </div>
                <div className={`col-9`}>
                    <div className={`w-100 h-100 d-flex justify-content-center align-items-center`}>
                        <span className={`fs-4`}>Welcome to chat room</span>
                    </div>
                </div>
            </div>
        </>
    )
}
