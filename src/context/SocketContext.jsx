import {createContext, useContext, useEffect, useState} from "react";
import {io} from "socket.io-client";
import {SERVER_URL} from "../api/config.js";

const SocketContext = createContext();

// custom hook to use socket
export const useSocket = () => useContext(SocketContext);

// create a provider component
export default function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io(SERVER_URL);
        setSocket(newSocket);
    }, []);
    return (
        <SocketContext.Provider value={socket}>
            { children }
        </SocketContext.Provider>
    )
}
