import classes from './NavigationPage.module.css';
import {Outlet, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {
    getAuthToken,
    getAuthUserData,
    getExpirationTimeInSeconds,
    removeAuthDataFromLocalStorage
} from "../../utils/authHelper.js";
import {dispatch} from "../../store.js";
import {removeAuthData, storeAuthData} from "../../features/authDataSlice.js";
import {useEffect} from "react";

export default function NavigationPage() {
    const navigate = useNavigate();
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
            <div className={`row ${classes.navigationBox}`}>
                <div className={`col-11`}>
                    <button className={classes.navigationTab}>Home</button>
                    <button className={classes.navigationTab} onClick={() => toast('Hello world')}>Notify</button>
                </div>
                <div className={`col-1`}>
                <button className={classes.navigationTab} onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <div className={classes.contentBox}>
                <Outlet/>
            </div>
        </>
    )
}
