import React, { useState, useContext } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import '../styles/LoginForm.scss'
import { UserIdContext } from '../UserContext';
import axios from 'axios';
import { loginApi } from '../assets/axiosURLs'



export default function LoginForm() {
    const [input, setInput] = useState({
        username: "",
        password: ""
    });
    const { userId, setUserId } = useContext( UserIdContext );
    const [allUsers, setAllUSers] = useState();
    const history = useHistory();
    
     const  postUser = async () => {
        let user = {
            username: input.username,
            password: input.password
        }
        try {
            const response = await axios.post(loginApi, user);
            setUserId(response.data._id)
            localStorage.setItem('id', response.data._id);

        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setInput({
            ...input,
            [e.target.name]: value
        });
    }
    const handleSubmit = async  (e) => {
        e.preventDefault();
        if (input.username && input.password) {
            postUser();
        }
    }


    return (
        <>
            <div className="container-form">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="input"
                            placeholder="ANVÄNDARNAMN"
                            type="text"
                            value={input.username}
                            required
                            name="username"
                            onChange={handleChange}
                        />
                        <input
                            className="input"
                            placeholder="LÖSENORD"
                            type="password"
                            value={input.password}
                            name="password"
                            required
                            onChange={handleChange}
                        />
                        <div className="container-button">
                            <input
                                type="submit"
                                className="button"
                                value="LOGGA IN"
                            />
                        </div>
                    </form>
                </div>
                {
                    userId && <Redirect to="/main" />
                }
        </>
    )
}