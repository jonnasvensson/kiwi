import React, { useContext, useState, useEffect } from 'react';
import AriaModal from 'react-aria-modal';
import '../styles/ModalUserCreated.scss';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import { UserContext, UserIdContext, BookClubsContext } from '../UserContext';



export default function ModalBookClub ({
            deactivateModalBookClub,
            bookClubs,
            clickedBookClub={clickedBookClub}
        }) 
    {
    const { user, setUser } = useContext(UserContext);

    return (
        <AriaModal
            titleId="demo-two-title"            
            onExit={deactivateModalBookClub}
            underlayClickExits={false}
            verticallyCenter={true}
    >
            <div id="demo-two-modal" className="modal">
                <div className="modal-body">
                    <button onClick={deactivateModalBookClub} >X</button>
                    <p>{clickedBookClub.name}</p>
                    <p>{clickedBookClub.area}</p>
                    <p>{clickedBookClub.gender}</p>
                    <p>{clickedBookClub.age}</p>
                </div>
                <footer className="modal-footer">
                    {
                        clickedBookClub.members.map(member => {
                            return (
                                    <div key={member._id} className="containerBookClub">
                                        <p>{member.name}</p>
                                            {
                                                member.categories.map(category => {
                                                    return <p key={category}>{category}</p>
                                                })
                                            }
                                    </div>
                                )
                        })
                    }
                </footer>
            </div>
        </AriaModal>
    );
}