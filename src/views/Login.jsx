import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {useRef, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Login() {
    const {setToken} = useStateContext();
    const [errors, setErrors] = useState(null);
    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit = (ev) => {
        axiosClient.post('/user/login', {
            email_address: emailRef.current.value,
            password: passwordRef.current.value,
        })
            .then((data) => {
                setToken(data.data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 401) {
                    setErrors(response.data.message);
                    window.scrollTo(0, 0);
                }
            })
        ev.preventDefault();
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                {errors && <div className="alert alert-warning">
                    {errors}
                </div>}
                <form onSubmit={onSubmit}>
                    <h1 className="title">Logowanie</h1>
                    <input ref={emailRef} type="email" placeholder="email"/>
                    <input ref={passwordRef} type="password" placeholder="hasło"/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Nie masz konta? <Link to="/rejestracja">Utwórz konto</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
