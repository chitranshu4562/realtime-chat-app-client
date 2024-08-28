import {useEffect, useState} from "react";
import classes from "./UserProfilePage.module.css";
import {fetchCurrentUser, uploadUserAvatar} from "../../../api/usersApi.js";
import {displayLoader, hideLoader} from "../../../utils/loaderHelper.js";
import {errorNotification, successNotification} from "../../../utils/notificationHelper.js";
import userProfileIcon from "../../../assets/user-profile-icon.jpg";
import ModalBox from "../../../components/ModalBox.jsx";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Button} from "@mui/material";
import {dispatch} from "../../../store.js";
import {storeAuthData} from "../../../features/authDataSlice.js";
import {getAuthToken} from "../../../utils/authHelper.js";
import {AUTH_USER} from "../../../utils/Constants.js";

export default function UserProfilePage() {
    const [user, setUser] = useState(null);
    const [userAvatar, setUserAvatar] = useState('');
    const [open, setOpen] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);

    useEffect(() => {
        displayLoader();
        fetchCurrentUser()
            .then(result => {
                hideLoader();
                successNotification(result.data.message);
                setUser(result.data.user);
                if (result.data.user?.avatar) {
                    setUserAvatar(result.data.user.avatar);
                }
                console.log()
            })
            .catch(error => {
                hideLoader();
                errorNotification(error.response.data.message);
            });
    }, []);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleFileInputChange = (event) => {
        setAvatarFile(event.target.files[0]);
    }

    const handleImageUpload = (e) => {
        displayLoader();
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        uploadUserAvatar(formData, user._id)
            .then(result => {
                hideLoader();
                handleClose();
                successNotification(result.data.message);
                setUserAvatar(result.data.user.avatar);
                const authToken = getAuthToken();
                const authData = {
                    authToken: authToken,
                    user: result.data.user
                }
                const authUser = {
                    name: result.data.user.name,
                    avatar: result.data.user.avatar,
                    id: result.data.user._id
                }
                localStorage.setItem(AUTH_USER, JSON.stringify(authUser));
                dispatch(storeAuthData(authData));
            })
            .catch(error => {
                hideLoader();
                errorNotification(error.response.data.message);
            });
    }

    return (
        <>
            <ModalBox isOpen={open}>
                <div>
                    <form onSubmit={handleImageUpload}>
                        <input type="file" onChange={handleFileInputChange}/>
                        <div className={`d-flex justify-content-center gap-2 mt-5`}>
                            <Button onClick={handleClose} variant="contained">Cancel</Button>
                            <Button type="submit" variant="contained">Submit</Button>
                        </div>
                    </form>
                </div>
            </ModalBox>
            {user && (
                <div className={`row mx-auto my-5 ${classes.profileContainer}`}>
                    <div className={`col-4 h-100`}>
                        <img src={userAvatar ? userAvatar : userProfileIcon} alt={`profile`}/>
                    </div>
                    <div className={`col-8 d-flex flex-column justify-content-around`}>
                        <div>
                            <h2>{user.name}</h2>
                            <h6>{user.email}</h6>
                        </div>
                        <div className={`d-flex justify-content-center`}>
                            <Button
                                startIcon={<CloudUploadIcon/>}
                                variant="contained"
                                onClick={handleOpen}
                            >
                                {userAvatar ? 'Change Photo' : 'Upload Photo'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
