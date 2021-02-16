import React, { useContext, useState, useEffect } from 'react';
import AriaModal from 'react-aria-modal';
import '../styles/Modals.scss';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import { UserContext, UserIdContext, BookClubsContext } from '../UserContext';


export default function ModalBookClub({
    deactivateModalBookClub,
    clickedBookClub,
    handleAddMember
}) {
    const { user, setUser } = useContext(UserContext);

    const checkMembers = () => {
        let x = clickedBookClub.members.filter(member => member) 
            .find(member => member.username === user.username)
            return x;
    }
    let renderButton = checkMembers();


    return (
        <AriaModal
            titleId="demo-two-title"
            onExit={deactivateModalBookClub}
            underlayClickExits={false}
            verticallyCenter={true}
        >
            <div id="demo-two-modal" className="modal">
                <div className="modal-body">
                    <div className="container-button">
                        <button className="button" onClick={deactivateModalBookClub}>X</button>
                    </div>
                    <h2>{clickedBookClub.name}</h2>
                    <p>{clickedBookClub.username}</p>
                    <p>{clickedBookClub.area}</p>
                    <p>{clickedBookClub.gender}</p>
                    <p>{clickedBookClub.age}</p>
                    
                    {
                        clickedBookClub.category.map((category) => { 
                            return  <p key={category}>{category}</p>
                        })
                    }
                </div>
                <footer className="modal-footer">
                    {
                        clickedBookClub.members.map(member => {
                            return (
                                <div key={member._id} className="containerBookClub">
                                    <p>{member.username}</p>
                                    {
                                        member.categories.map(category => {
                                            return <p key={category}>{category}</p>
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                    {
                        renderButton == null ?
                            <div className="container-button">
                                <button className="button" onClick={handleAddMember}>GÅ MED</button>
                            </div>
                            : null
                    }
                </footer>
            </div>
        </AriaModal>
    );
}