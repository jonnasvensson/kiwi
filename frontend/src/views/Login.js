import React from 'react';
import LoginForm from '../components/LoginForm'
import img from '../assets/book.jpg'


export default function Login() {
    return (
        <>
            <div className="containerImg">
                <div className="imgWrapper">
                    <img className="img" srcSet={img} alt="bok och blommor"/>
                </div>
            </div>
            <LoginForm />
        </>
    )
}
 