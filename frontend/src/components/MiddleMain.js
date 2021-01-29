import React, { useContext, useEffect } from 'react';
import '../styles/MiddleMain.scss'
import Card from '../components/Card'
import { UserContext, UserIdContext } from '../UserContext';
import axios from 'axios';


export default function MiddleMain() {
    const { userId, setUserId } = useContext(UserIdContext);
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        setUserId(localStorage.removeItem('id'));
    }

    useEffect(() => {
        getUser();
    }, [])

    const getUser = () => {
        axios
            .get(`http://localhost:5000/user/${userId}`)
            .then(resp => {
                setUser(resp.data)
            })
            .catch(error => {
                console.error(error);
            })
    }


    return (
        <>
            {/* Brukar ni Johanna och Anna gör så här? Eller returnar ni det */}
            {
                user &&

                <main className="middleMainContainer">
                    <div className="container">
                        <section className="topContainer">
                            <div className="usernameInfo">
                                <p className="username">Hej {user.username}.</p>
                                <button className="button">ändra profil.</button>
                                <button className="button" onClick={handleLogout}>logga ut.</button>
                            </div>
                            <div className="contentGroup">
                                <p className="content">förslag på bokklubbar visas nedan</p>
                                <div className="line"></div>
                            </div>
                            <div className="contentGroup">

                                <Card />
                            </div>
                        </section>
                        <section className="bottomContainer">
                            <div className="contentGroup">
                                <p className="content">bokklubbar du är med i</p>
                                <div className="line"></div>
                            </div>
                            <div className="containerLowerInfo">
                                {
                                    user.bookClubs.map((bookClub, _id) => (
                                        <div key={bookClub._id} className="containerclub">
                                            <p >{bookClub.name}</p>
                                        </div>
                                    ))
                                }

                            </div>
                        </section>
                    </div>
                </main>
            }
        </>
    )
}