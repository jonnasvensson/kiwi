import react from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../styles/Aside.scss'

export default function Aside() {
    return (
        <>
            <div className="containerAside">
                <Link to="/">Logga in</Link>
                <Link to="/registrera">Registera</Link>
                <Link to="/main">Main</Link>
            </div>
        </>
    )
}