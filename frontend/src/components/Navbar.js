import React, { useContext } from 'react';
import '../styles/Navbar.scss'
import { UserContext,  } from '../UserContext';


export default function Navigation({
    handleLogout,
    handleToggle,
    
}) {
    const { user, setUser } = useContext(UserContext);

    return (
        <>
            <nav className="container-navigation">
                <div className="user-container">
                    <div className="group">
                        <div className="circle"></div>
                        <p className="title">{user.username}</p>
                    </div>
                </div>    
                <div className="group">
                    <button 
                        className="button-nav"
                        value="profile" 
                        onClick={handleToggle}
                        >PROFIL</button>
                    <button 
                        className="button-nav"
                        value="bookClubs" 
                        onClick={handleToggle}
                    >BOKKLUBBAR</button>
                </div>
                <div className="button-container">
                    <button className="button" onClick={handleLogout}>LOGGA UT</button>
                </div>
            </nav>
        </>
    )
}




