import React from 'react';
import AriaModal from 'react-aria-modal';
import '../styles/Modals.scss';
import { Link } from 'react-router-dom';



export default function ModalUserCreated({
    deactivateModal,
    redirect
}) {

    return (
        <AriaModal
            titleId="demo-two-title"            
            onExit={deactivateModal}
            underlayClickExits={false}
            verticallyCenter={true}
        >
            <div id="demo-two-modal" className="modal-register">
                <div className="modal-body-register">
                    <p className="title">Vad kul! Du är nu medlem hos oss</p>

                </div>
                <footer className="modal-footer">
                    <div className="container-button">
                        <Link to="/">
                            <button id="demo-one-deactivate" 
                                className="button"
                                onClick={deactivateModal}
                            >LOGGA IN
                            </button>
                        </Link>
                    </div>
                </footer>
            </div>
        </AriaModal>
    );
}