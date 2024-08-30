import {RouterProvider} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import router from "./router.jsx";
import {ToastContainer} from "react-toastify";
import SocketProvider from "./context/SocketContext.jsx";

function App() {
    return (
        <>
            <SocketProvider>
                <ToastContainer
                    autoClose={1000}
                />
                <RouterProvider router={router}/>
            </SocketProvider>
        </>
    )
}

export default App
