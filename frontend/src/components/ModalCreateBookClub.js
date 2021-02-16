import React, { useContext, useState, useEffect } from 'react';
import AriaModal from 'react-aria-modal';
import '../styles/Modals.scss';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { UserContext, UserIdContext, BookClubsContext } from '../UserContext';



export default function ModalCreateBookClub({
        deactivateModalCreateBookClub,
        bookClubTitle,
        input,
        handleChange,
        handleCreateNewBookClub
    }) 
{
    const { user, setUser } = useContext(UserContext);


    return (
        <AriaModal
            titleId="demo-two-title"            
            onExit={deactivateModalCreateBookClub}
            underlayClickExits={false}
            verticallyCenter={true}
        >
            <div id="demo-two-modal" className="modal">
                <div className="modal-body">
                    <div className="container-button">
                        <button className="button" onClick={deactivateModalCreateBookClub} >X</button>
                    </div>
                    <h2>Vad kul!</h2>
                    <p>Bokklubb kommer att skapas med nedan detaljer</p>
                    <input className="input" type="text" onChange={handleChange} value={input} placeholder={bookClubTitle}/>
                    <div className="group">
                        <p>kommun</p>
                        <p>{user.area}</p>
                    </div>
                    <div className="group">
                        <p>ålder</p>
                        <p>{user.age}</p>
                    </div>
                    <div className="group">
                        <p>kön</p>
                        <p>{user.gender}</p>
                    </div>
                    <div className="group">
                    <p>kategori</p>
                        {user.categories.map(category=> {
                            return <p key={category}>{category}</p>
                        })}
                    </div>

                </div>
                <footer className="modal-footer">
                    <div className="container-button">
                        <button className="button" id="demo-one-deactivate" onClick={handleCreateNewBookClub}
                        >Ok, skapa klubben</button>
                    </div>
                </footer>
            </div>
        </AriaModal>
    );
}