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
                    <div className="containerButton">
                        <button>visa medlemmar.</button>
                    </div>
                </div>
                <div>
                    <p>kategori.</p>
                    <p>personlig utveckling.</p>
                </div>
            </div>
            <div>
                <button>gå med.</button>
            </div>
        </div>
    )
}