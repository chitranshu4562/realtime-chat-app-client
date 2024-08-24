import {createBrowserRouter, Navigate} from "react-router-dom";
import NavigationPage, {restrictUnAthorizedAccess} from "./pages/navigation-page/NavigationPage.jsx";
import HomePage from "./pages/navigation-page/home-page/HomePage.jsx";
import LoginPage, {redirectAuthorizedUser} from "./pages/login-page/LoginPage.jsx";
import SignUpPage from "./pages/sign-up-page/SignUpPage.jsx";

const router = createBrowserRouter([
    {path: '/', element: <NavigationPage/>, children: [
            {path: '', element: <Navigate to={`home`}/>},
            {path: 'home', element: <HomePage/>}
        ], loader: restrictUnAthorizedAccess},
    {path: '/login', element: <LoginPage/>, loader: redirectAuthorizedUser},
    {path: '/sign-up', element: <SignUpPage/>, loader: redirectAuthorizedUser}
])

export default router;
