import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";
import '../styles/LoginForm.scss'

export default function LoginForm() {
    const [input, setInput] = useState({
        username: "",
        password: ""
    });
    const [user, setUser] = useState({
        username: "", 
        password: ""
    })
    const history = useHistory();

    const handleChange = (e) => {
        const value = e.target.value;
        setInput({
            ...input,
            [e.target.name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.username && input.password) {
            history.push('/main');
        }
        setUser({
            username: input.username,
            password: input.password
        });
    }

    return (
        <>
            <div className="containerLoginForm">
                <div className="containerForm">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="input"
                            placeholder="användarnamn"
                            type="text"
                            value={input.username}
                            name="username"
                            onChange={handleChange}
                        />
                        <input
                            className="input"
                            placeholder="lösenord"
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={handleChange}
                        />
                        <div className="containerButton">
                            <input
                                type="submit"
                                className="button"
                                value="logga in."
                            />
                        </div>
                    </form>
                    <div className="containerLink">
                        <Link to="/registrera">registrera.</Link>
                    </div>
                </div>
                <div className="containerEmail">
                    <Link to="/registrera">taletotell@gmail.com.</Link>
                </div>
            </div>
        </>
    )
}