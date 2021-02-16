import React, { useContext, useEffect } from 'react';
import img from '../assets/book.jpg'
import MiddleMain from '../components/MiddleMain'
import { UserIdContext } from '../UserContext';
import { Redirect } from 'react-router-dom';

// styling ligger i App.scss



export default function Main ({}) {
    const { userId, setUserId } = useContext(UserIdContext);
    
    useEffect(() => {
        getItem();
    })
    const getItem = () => {
        setUserId(localStorage.getItem('id'))
    }
    return (
        <>
            {
                !userId && <Redirect to="/" />
            }
            <MiddleMain />
            {/* <div className="containerImgMain">
                <div className="imgWrapper">
                    <img className="img" srcSet={img} alt="bok och blommor"/>
                </div>
            </div> */}
        </>
    )
}