import React, { useState } from 'react';
import '../styles/Card.scss';
import ModalBookClub from './ModalBookClub';


export default function Card ({ 
            suggestions, 
            handleClickedBookClub, 
            clickedBookClub ,
            modalActiveBookClub,
            setModalActiveBookClub,
            deactivateModalBookClub,
            handleAddMember
        }) 
    {
    return (
        <>
            {
                suggestions && suggestions.map(bookClub => {
                    return (
                        <div className="containerBookClub" key={bookClub._id} >
                            <div className="containerInfo" onClick={() => handleClickedBookClub(bookClub)} value={bookClub}>
                                <p className="book-title" >{bookClub.name}</p>
                                <div className="group">
                                    <p>medlemmar</p>
                                    <p>{bookClub.members.length}</p>
                                </div>
                                <div className="line"></div>
                                <div className="group">
                                    <p>kategori</p>
                                    
                                    <p>{bookClub.category}</p>
                                </div>
                                <div className="line"></div>
                            </div>
                            {
                                modalActiveBookClub && 
                                    <ModalBookClub 
                                        suggestions={suggestions}
                                        bookClub={bookClub}
                                        clickedBookClub={clickedBookClub}
                                        setModalActiveBookClub={setModalActiveBookClub}
                                        deactivateModalBookClub={deactivateModalBookClub}
                                        handleAddMember={handleAddMember}
                                    />
                            }
                        </div>
                    )
                })}
        </>
    )
}