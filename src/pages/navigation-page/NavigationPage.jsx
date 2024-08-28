import classes from './NavigationPage.module.css';
import {Link, Outlet, redirect, useNavigate} from "react-router-dom";
import {
    getAuthToken,
    getAuthUserData,
    getExpirationTimeInSeconds,
    removeAuthDataFromLocalStorage
} from "../../utils/authHelper.js";
import {dispatch} from "../../store.js";
import {removeAuthData, storeAuthData} from "../../features/authDataSlice.js";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {Avatar} from "@mui/material";
import userProfileIcon from "../../assets/user-profile-icon.jpg";

export default function NavigationPage() {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.authData.user);
    const handleLogout = () => {
        removeAuthDataFromLocalStorage();
        dispatch(removeAuthData());
        navigate('/login');
    }

    useEffect(() => {
        const token = getAuthToken();
        const authUser = getAuthUserData();
        dispatch(storeAuthData({ authToken: token, user: authUser }));
        if (!token) {
            return;
        }

        const expTime = getExpirationTimeInSeconds();
        console.log('Expiration time: ', expTime);
        if (expTime < 0) {
            handleLogout();
        } else {
            setTimeout(() => {
                handleLogout();
            }, expTime * 1000);
        }
    }, []);
    return (
        <>
            {currentUser && <>
                <div className={`row ${classes.navigationBox}`}>
                    <div className={`col-11`}>
                        <div className={`d-flex gap-2`}>
                            <Link to={`user-profile`}>
                                <Avatar src={currentUser?.avatar ? currentUser.avatar : userProfileIcon}/>
                            </Link>
                            <p className={classes.navHeader}>{currentUser.name}</p>
                            <Link to={`/home`}>
                                <button className={classes.navigationTab}>Home</button>
                            </Link>
                        </div>
                    </div>
                    <div className={`col-1`}>
                        <button className={classes.navigationTab} onClick={handleLogout}>Logout</button>
                    </div>
                </div>

                <div className={`container ${classes.contentBox}`}>
                    <Outlet/>
                </div>
            </>}
        </>
    )
};

export const restrictUnAthorizedAccess = () => {
    const token = getAuthToken();
    if (!token) {
        return redirect('/login');
    }
    return null;
}
