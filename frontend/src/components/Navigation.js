import react from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function Navigation() {
    return (
        <>
            <nav className="navbar">
                <section>
                    <Link to="/about">OM OSS</Link>
                    <Link to="/">LOGGA IN</Link>
                    <Link to="/registrera">REGISTRERA</Link>
                </section>
            </nav>
        </>
    )
}