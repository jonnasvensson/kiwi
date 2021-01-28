import React from 'react';
import img from '../assets/book.jpg'
import MiddleMain from '../components/MiddleMain'


export default function Main () {
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