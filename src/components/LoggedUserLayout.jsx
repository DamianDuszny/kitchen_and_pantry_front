import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import Menu from "./Menu.jsx";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function LoggedUserLayout() {
    const {user, token, setUser, setToken} = useStateContext();

    if (!token) {
        return <Navigate to="/Logowanie"/>
    }

    const onLogout = (ev) => {
        axiosClient.get('/user/logout')
            .then(() => {
                setUser({});
                setToken(null);
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422) {
                    console.log(response.data.errors);
                }
            })
        ;
        ev.preventDefault();
    }

    useEffect(() => {
        axiosClient.get('/user/data')
            .then(({data}) => {
                setUser(data)
            })
    }, []);
    return (
        <div id="loggedUserLayout">
            <div className="content">
                <header>
                    <Menu />
                    <div>
                        {user?.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Wyloguj się</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
