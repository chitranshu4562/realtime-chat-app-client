import {useFormik} from "formik";
import * as Yup from "yup";
import {EMAIL_REGEX} from "../../utils/Constants.js";
import {Button} from "@mui/material";
import classes from "./LoginPage.module.css";
import {login} from "../../api/authApi.js";
import {errorNotification, successNotification} from "../../utils/notificationHelper.js";
import {hasEmptyStringOnly} from "../../utils/utilHelper.js";
import {displayLoader, hideLoader} from "../../utils/loaderHelper.js";
import {Link, redirect, useNavigate} from "react-router-dom";
import {getAuthToken, storeAuthDataInLocalStorage} from "../../utils/authHelper.js";
import {dispatch} from "../../store.js";
import {storeAuthData} from "../../features/authDataSlice.js";

export default function LoginPage() {
    const navigate = useNavigate();
    const handleLogin = (values) => {
        displayLoader();
        login(values)
            .then(result => {
                hideLoader();
                successNotification(result.data.message);
                loginForm.handleReset();
                const authData = {
                    authToken: result.data.authToken,
                    expirationTime: result.data.expirationTime,
                    user: result.data.user
                }
                storeAuthDataInLocalStorage(authData);
                dispatch(storeAuthData(authData));
                navigate('/');
            })
            .catch(error => {
                hideLoader();
                errorNotification(error.response.data.message);
            })
    }

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('*Required').matches(EMAIL_REGEX, 'Email is invalid'),
            password: Yup.string().required('*Required').min(6, 'Password must have at least six character')
        }),
        onSubmit: handleLogin
    })
    return (
        <>
            <div className={`shadow ${classes.formContainer}`}>
                <h3 className={`text-center`}>Login Form</h3>
                <form onSubmit={loginForm.handleSubmit}>
                    <div className={`form-group my-2`}>
                        <label htmlFor={`email`}>Email</label>
                        <input id={`email`} type={`email`} {...loginForm.getFieldProps('email')}
                               className={`form-control`}/>
                        {(loginForm.touched.email && loginForm.errors.email) &&
                            <span className="text-danger">{loginForm.errors.email}</span>}
                    </div>

                    <div className={`form-group my-2`}>
                        <label htmlFor={`password`}>Password</label>
                        <input id={`password`} type={`password`} {...loginForm.getFieldProps('password')}
                               className={`form-control`}/>
                        {(loginForm.touched.password && loginForm.errors.password) &&
                            <span className="text-danger">{loginForm.errors.password}</span>}
                    </div>

                    <div className={`d-flex justify-content-center`}>
                        <Button variant="contained" type="submit" disabled={!loginForm.isValid || hasEmptyStringOnly(loginForm.values) }>
                            Login
                        </Button>
                    </div>
                </form>
                <div className={`d-flex justify-content-end`}>
                    <Link to={`/sign-up`}>Create new user</Link>
                </div>
            </div>
        </>
    )
};

export const redirectAuthorizedUser = () => {
    const token = getAuthToken();
    if (!token) {
        return null;
    }
    return redirect('/');
}
