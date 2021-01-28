import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";
import '../styles/LoginForm.scss'
import {UserContext} from '../UserContext';
import axios from 'axios';
import { ThemeConsumer } from 'styled-components';



export default function LoginForm() {
    const [input, setInput] = useState({
        username: "",
        password: ""
    });
    const { user, setUser } = useContext(UserContext);
    const [allUsers, setAllUSers] = useState();
    const history = useHistory();

    const postUser = () => {
        let user = {
            username: input.username,
            password: input.password
        }
        axios
            .post('http://localhost:5000/login', user)
            .then((resp) => {
                console.log(resp);
                // setUser(resp.data)
            })
            .catch(error => {
                console.error(error);
            })
            console.log(user);
    }
    const handleChange = (e) => {
        const value = e.target.value;
        setInput({
            ...input,
            [e.target.name]: value
        });
    }
    console.log(user);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.username && input.password) {
            history.push('/main');
        }
        postUser();
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