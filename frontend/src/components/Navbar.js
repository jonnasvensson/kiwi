import React, { useContext, useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import '../styles/Navbar.scss'


export default function Navigation({ 
    handleLogout
}) {


    return (
        <>
            <nav className="container-navigation">
                <button className="button">PROFIL</button>
                <button className="button">BOKKLUBBAR</button>
                <button className="button" onClick={handleLogout}>LOGGA UT</button>
            </nav>
        </>
    )
}




