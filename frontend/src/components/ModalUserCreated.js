import React from 'react';
import AriaModal from 'react-aria-modal';
import '../styles/ModalUserCreated.scss';
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
            <div id="demo-two-modal" className="modal">
                <div className="modal-body">
                    <p>Vad kul! Du är nu medlem hos oss :)</p>

                </div>
                <footer className="modal-footer">
                    <Link to="/">
                        <button id="demo-one-deactivate" onClick={deactivateModal}>
                            Ok, ta mig till log in
                        </button>
                    </Link>
                </footer>
            </div>
        </AriaModal>
    );
}