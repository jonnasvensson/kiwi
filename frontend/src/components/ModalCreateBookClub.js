import React, { useContext, useState, useEffect } from 'react';
import AriaModal from 'react-aria-modal';
import '../styles/ModalUserCreated.scss';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import { UserContext, UserIdContext, BookClubsContext } from '../UserContext';



export default function ModalCreateBookClub({
        deactivateModal,
        deactivateModalModalCreateBookClub,
        bookClubTitle,
        input,
        handleChange,
        handleCreateNewBookClub
    }) 
{
    const { user, setUser } = useContext(UserContext);
    const [googleBooks, setgoogleBooks] = useState([]);
    // const [input, setInput] = useState('');
    
    // const handleChange = (e) => {
    //     setInput(e.target.value);
    // }
    // useEffect(() => {
    //     getBooks();
    // }, [])

    // const getBooks = () => {
    //     axios
    //         .get('https://www.googleapis.com/books/v1/volumes?q=intitle:holiday&maxResults=40')
    //         .then(resp => {
    //             setgoogleBooks(resp.data.items.map(item => item.volumeInfo.title))
    //         })
    // }

    return (
        <AriaModal
            titleId="demo-two-title"            
            onExit={deactivateModalModalCreateBookClub}
            underlayClickExits={false}
            verticallyCenter={true}
    >
            <div id="demo-two-modal" className="modal">
                <div className="modal-body">
                    <button onClick={deactivateModalModalCreateBookClub} >X</button>
                    <p>Vad kul! Ny bokklubb skall skapas</p>
                    <input type="text" onChange={handleChange} value={input} placeholder={bookClubTitle}/>
                    <p>{user.area}</p>
                    <p>{user.age}</p>
                    <p>{user.gender}</p>
                    {user.categories.map(category=> {
                        return <p key={category}>{category}</p>
                    })}
                </div>
                <footer className="modal-footer">
                        <button id="demo-one-deactivate" onClick={handleCreateNewBookClub}>
                            Ok, skapa klubben
                        </button>
                </footer>
            </div>
        </AriaModal>
    );
}