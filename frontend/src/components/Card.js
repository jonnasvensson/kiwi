import React from 'react';
import '../styles/Card.scss';

export default function ({ membersBookClubs, handleShowMembers }) {



    return (
        <>
            {
                membersBookClubs.map(bookClubs => {
                    return (
                        <div className="containerBookClub" key={bookClubs._id}>
                            <div className="containerInfo">
                                <p className="book-title" >{bookClubs.name}</p>
                                <div className="group">
                                    <p>medlemmar</p>
                                    <p>{bookClubs.members.length}</p>
                                </div>
                                <div className="line"></div>
                                <div className="containerButton">
                                    <button className="button" onClick={(e) => handleShowMembers(bookClubs)} >visa medlemmar.</button>
                                </div>
                                <div className="group">
                                    <p>kategori</p>
                                    <p>{bookClubs.category}</p>
                                </div>
                                <div className="line"></div>
                            </div>
                        </div>
                    )
                })}
        </>
    )
}