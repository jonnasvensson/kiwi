import React, { useState } from 'react';
import '../styles/Card.scss';
import ModalBookClub from './ModalBookClub';


export default function Card ({ 
            membersBookClubs, 
            handleShowMembers, 
            suggestions, 
            handleClickedBookClub, 
            clickedBookClub ,
            modalActiveBookClub,
            setModalActiveBookClub,
            deactivateModalBookClub
        }) 
    {

    return (
        <>
            {
                suggestions && suggestions.map(bookClubs => {
                    return (
                        <div className="containerBookClub" key={bookClubs._id} onClick={() => handleClickedBookClub(bookClubs)}>
                            <div className="containerInfo">
                                <p className="book-title" >{bookClubs.name}</p>
                                <div className="group">
                                    <p>medlemmar</p>
                                    <p>{bookClubs.members.length}</p>
                                </div>
                                <div className="line"></div>
                                {/* <div className="containerButton">
                                    <button className="button" onClick={(e) => handleShowMembers(bookClubs)} >visa medlemmar.</button>
                                </div> */}
                                <div className="group">
                                    <p>kategori</p>
                                    
                                    <p>{bookClubs.category}</p>
                                </div>
                                <div className="line"></div>
                            </div>
                            {
                                modalActiveBookClub && 
                                    <ModalBookClub 
                                        bookClubs={bookClubs}
                                        clickedBookClub={clickedBookClub}
                                        setModalActiveBookClub={setModalActiveBookClub}
                                        deactivateModalBookClub={deactivateModalBookClub}
                                    />
                            }
                        </div>
                    )
                })}
        </>
    )
}