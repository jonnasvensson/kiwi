import React from 'react';
import '../styles/Card.scss';
import ModalBookClub from './ModalBookClub';


export default function Card ({ 
            suggestions, 
            handleClickedBookClub, 
            clickedBookClub ,
            modalActiveBookClub,
            setModalActiveBookClub,
            deactivateModalBookClub,
            handleAddMember,
            handleLeaveBookClub
        }) 
    {
    return (
        <>
            {
                suggestions && suggestions.map(bookClub => {
                    return (
                        <div className="container-book-club" key={bookClub._id} >
                            <div className="container-info" onClick={() => handleClickedBookClub(bookClub)} value={bookClub}>
                                <p className="book-title" >{bookClub.name}</p>
                                <div className="group-lower">
                                    <div className="group-info">
                                        <p>medlemmar</p>
                                        {
                                            bookClub.members &&
                                            <p>{bookClub.members.length}</p>
                                        }
                                    </div>
                                    <div className="line"></div>
                                    <div className="group-info">
                                        <p>kategori</p>
                                        
                                        <p>{bookClub.category}</p>
                                    </div>
                                <div className="line"></div>
                                </div>
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
                                        handleLeaveBookClub={handleLeaveBookClub}
                                    />
                            }
                        </div>
                    )
                })}
        </>
    )
}