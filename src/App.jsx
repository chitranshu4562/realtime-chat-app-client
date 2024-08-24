import {RouterProvider} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import router from "./router.jsx";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <>
            <ToastContainer
                autoClose={1000}
            />
            <RouterProvider router={router}/>
        </>
    )
}

export default App
