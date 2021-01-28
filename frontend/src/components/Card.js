import React from 'react';
import '../styles/Card.scss';

export default function () {
    return (
        <div className="containerBookClub">
            <p className="title">book ladies.</p>
            <div className="containerInfo">
                <div className="group">
                    <p>medlemmar.</p>
                    <p>2.</p>
                </div>
                <div className="line"></div>
                <div className="containerButton">
                    <button className="button">visa medlemmar.</button>
                </div>
                <div className="group">
                    <p>kategori.</p>
                    <p>personlig utveckling.</p>
                </div>
                <div className="line"></div>
            </div>
            <div className="containerButton">
                <button className="button">gå med.</button>
            </div>
        </div>
    )
}