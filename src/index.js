import React from 'react';
import ReactDOM from "react-dom/client";
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Login from './components/Login/Login';
import NewApp from "./NewApp";
import {Provider} from "react-redux";
import {store} from "./store/store";
import SignUp from "./components/SignUp/SignUp"
import './style/style.scss';
import SubscriptionsMobilePage from "./components/Subscriptions/SubscriptionsMobilePage";


const router = createBrowserRouter([
    {
        path: "/social-app-2.0/",
        element: <NewApp/>,
        children: [
            {
                path: "login",
                element: <Login/>,
            },
            {
                path: "signup",
                element: <SignUp/>,
            },
            {
                path: "subscriptions",
                element: <SubscriptionsMobilePage/>,
            }
        ]
    },
]);

TimeAgo.addDefaultLocale(en);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
