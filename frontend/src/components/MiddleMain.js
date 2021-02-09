import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import '../styles/MiddleMain.scss'
import Card from '../components/Card'
import { UserContext, UserIdContext } from '../UserContext';
import axios from 'axios';
import { userApi, bookClubsApi } from '../assets/axiosURLs'


export default function MiddleMain() {
    const { userId, setUserId } = useContext(UserIdContext);
    const { user, setUser } = useContext(UserContext);
    const [bookClubs, setBooksClubs] = useState([]);
    const [showMembers, setShowMembers] = useState(false);
    const [clickedBookClub, setClickedBookClub] = useState('');


    useEffect(() => {

        const fetchData = async () => {
            try {
                const resp = await axios.get(`${userApi}${userId}`)
                const data = setUser(resp.data)
            }
            catch (error) {
                console.error(error);
            };
            try {
                const resp = await axios.get(bookClubsApi)
                const data = setBooksClubs(resp.data)

            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [])

    const handleLogout = () => {
        setUserId(localStorage.removeItem('id'));
    }

    const handleShowMembers = (id) => {
        setShowMembers(!showMembers);
        setClickedBookClub(id)
    }
    console.log(clickedBookClub);

    const findBookClub = () => {

        let mapped = bookClubs.map(bookClub => {
            return bookClub
        })
            .filter(bookClub => {
                let x = bookClub.members.find(member => {
                    return member._id === userId
                })
                if (x == null) {
                    return
                }
                if (x) {
                    return bookClub
                }
                return bookClub
            })
        return mapped
    }

    const membersBookClubs = findBookClub();


    return (
        <>
            {
                user &&

                <main className="middleMainContainer">
                    <div className="container">
                        <section className="topContainer">
                            <div className="usernameInfo">
                                <p className="username">Hej {user.username}.</p>
                                <button className="button">ändra profil.</button>
                                <button className="button" onClick={handleLogout}>logga ut.</button>
                            </div>
                            <div className="contentGroup">
                                <p className="content">bokklubbar du är med i</p>
                                <div className="line"></div>
                            </div>
                            <div className="contentGroup">

                                <Card membersBookClubs={membersBookClubs} handleShowMembers={(id) => handleShowMembers(id)} />
                            </div>
                        </section>
                        <section className="bottomContainer">
                            <div className="contentGroup">
                                <p className="content"></p>
                                <div className="line"></div>
                            </div>
                            <div className="containerLowerInfo">

                                {
                                    clickedBookClub && clickedBookClub.members.map(member => (
                                        <div key={member._id} className="container-members">
                                            <p className="title">{member.username}</p>
                                            <div className="line"></div>
                                            <p className="title">{member.name}</p>
                                            <p className="title">{member.gender}</p>
                                            <p className="title">{member.area}</p>
                                        </div>

                                    ))

                                }
                            </div>
                        </section>
                    </div>
                </main>
            }
        </>
    )
}



// {
//     showMembers && membersBookClubs.map(bookClub => (
//         bookClub.members.map(member => (
//             <div key={member._id} className="container-members">
//                 <p className="title">{member.username}</p>
//                 <div className="line"></div>
//                 <p className="title">{member.name}</p>
//                 <p className="title">{member.gender}</p>
//                 <p className="title">{member.area}</p>
//             </div>
//         ))
//     ))
// }
