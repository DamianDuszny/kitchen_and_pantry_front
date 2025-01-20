import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axiosClient from "../axios-client.js";
import SetNewPasswordRequest from "../../request/SetNewPasswordRequest.tsx";
export default function ResetPasswordForm() {
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");

    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    // Extract token and email from URL
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenFromUrl = queryParams.get("token");
        const emailFromUrl = queryParams.get("email");

        if (tokenFromUrl) setToken(tokenFromUrl);
        if (emailFromUrl) setEmail(emailFromUrl);
    }, [location]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setErrors(null);
        setMessage(null);

        const payLoad = {
            token,
            email,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        axiosClient
            .post("/user/set-new-password", payLoad)
            .then(({ data }) => {
                setMessage(data.message);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors || response.data.message);
                    window.scrollTo(0, 0);
                }
            });
        SetNewPasswordRequest(payLoad).then(response => {
            response.success ? setMessage(response.message) : setErrors(response.message);
        });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                {errors && (
                    <div className="alert alert-warning">
                        {typeof errors === "string" ? (
                            <p>{errors}</p>
                        ) : (
                            <ul>
                                {Object.keys(errors).map((key) => (
                                    <li key={key}>{errors[key][0]}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
                {message && (
                    <div className="alert alert-success">
                        <p>{message}</p>
                    </div>
                )}
                <form onSubmit={onSubmit}>
                    <h1 className="title">Resetowanie hasła</h1>
                    <input type="email" value={email} disabled placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Nowe hasło" required />
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Potwierdź nowe hasło"
                        required
                    />
                    <button className="btn btn-block">Zresetuj hasło</button>
                </form>
            </div>
        </div>
    );
}