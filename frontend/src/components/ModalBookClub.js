import React, { useContext } from 'react';
import AriaModal from 'react-aria-modal';
import '../styles/Modals.scss';
import { UserContext } from '../UserContext';


export default function ModalBookClub({
    deactivateModalBookClub,
    clickedBookClub,
    handleAddMember,
    handleLeaveBookClub
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
                    <div className="book-club-info">
                        <h2>{clickedBookClub.name}</h2>
                        {
                            clickedBookClub.category.map((category) => { 
                                return  <p key={category}>{category}</p>
                            })
                        }
                        <div className="group">
                            <p>kommun</p>
                            <p>{clickedBookClub.area}</p>
                        </div>
                        <div className="group">
                            <p>kön</p>
                            <p>{clickedBookClub.gender}</p>
                        </div>
                        <div className="group">
                            <p>ålder</p>
                            <p>{clickedBookClub.age}</p>
                        </div>
                        
                    </div>
                </div>
                <footer className="modal-footer">
                    {
                        clickedBookClub.members.map(member => {
                            return (
                                <div key={member._id} className="container-member">
                                    <p className="title">{member.username}</p>
                                    {
                                        member.categories && member.categories.map(category => {
                                            return <p className="title" key={category}>{category}</p>
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                    {
                        renderButton &&
                            <div className="container-button">
                                <button className="button" onClick={handleLeaveBookClub}>Lämna bokklubb</button>
                            </div>
                    
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