import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Provider} from "react-redux";
import store from "./store.js";
import LinearBackdropLoader from "./components/LinearBackdropLoader.jsx";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <LinearBackdropLoader/>
        <App/>
    </Provider>
)
