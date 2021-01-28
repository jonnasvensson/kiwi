import React from 'react';
import '../styles/MiddleMain.scss'
import Card from '../components/Card'


export default function MiddleMain() {
    return (
        <>
            <main className="middleMainContainer">
                <div className="container">
                    <section className="topContainer">
                        <div className="usernameInfo">
                            <p className="username">Hej lindis.</p>
                            <button className="button">ändra profil.</button>
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
                            <p className="content">bokklubbar har matchats enligt följande uppgifter</p>
                            <div className="line"></div>
                        </div>
                        <div className="containerLowerInfo">

                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}