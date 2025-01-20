import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import SendPasswordResetLinkRequest from "../../request/SendPasswordResetLinkRequest";
export default function ResetPasswordForm() {
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);

    const onSubmit = async (ev) => {
        ev.preventDefault();
        setErrors(null);
        setMessage(null);

        await SendPasswordResetLinkRequest(ev.target.elements.email.value).then(response => {
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
                    <div className="alert-success alert">
                        <p>{message}</p>
                    </div>
                )}
                <form onSubmit={onSubmit}>
                    <h1 className="title">Resetowanie hasła</h1>
                    <input type="email" name="email" placeholder="Email" />
                    <button className="btn btn-block">Wyślij link do resetowania hasła</button>
                </form>
            </div>
        </div>
    );
}