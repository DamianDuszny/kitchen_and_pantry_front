import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Register() {
    const [errors, setErrors] = useState(null);
    const nameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        const payLoad = {
            first_name: nameRef.current.value,
            last_name: lastNameRef.current.value,
            email_address: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        axiosClient.put('/user/register', payLoad)
            .then( ({data}) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.message);
                    window.scrollTo(0, 0);
                }
            })
        ;
        ev.preventDefault();
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                {errors && <div className="alert alert-warning">
                    {errors}
                </div>}
                <form onSubmit={onSubmit}>
                    <h1 className="title">Rejestracja</h1>
                    <input ref={emailRef} type="email" placeholder="email"/>
                    <input ref={nameRef} type="text" placeholder="imię"/>
                    <input ref={lastNameRef} type="text" placeholder="nazwisko"/>
                    <input ref={passwordRef} type="password" placeholder="hasło"/>
                    <input ref={passwordConfirmationRef} type="password" placeholder="potwierdź hasło"/>
                    <button className="btn btn-block">Utwórz konto</button>
                    <p className="message">
                        Masz już konto? <Link to="/Logowanie">Przejdź do logowania</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
