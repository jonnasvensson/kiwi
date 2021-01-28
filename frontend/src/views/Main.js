import React, { useContext } from 'react';
import img from '../assets/book.jpg'
import MiddleMain from '../components/MiddleMain'
import {UserContext} from '../UserContext';


export default function Main () {
    const { user, setUser } = useContext(UserContext);
    return (
        <>
            <MiddleMain />
            <div className="containerImgMain">
                <div className="imgWrapper">
                    <img className="img" srcSet={img} alt="bok och blommor"/>
                </div>
            </div>
        </>
    )
}