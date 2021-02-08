import React, { useContext, useEffect, useState } from 'react';
import '../styles/MiddleMain.scss'
import Card from '../components/Card'
import { UserContext, UserIdContext } from '../UserContext';
import axios from 'axios';
import { userApi, bookClubsApi  } from '../assets/axiosURLs'


export default function MiddleMain() {
    const { userId, setUserId } = useContext(UserIdContext);
    const { user, setUser } = useContext(UserContext);
    const [bookClubs, setBooksClubs] = useState([]);
    const [showMembers, setShowMembers] = useState(false);

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

    const handleShowMembers = () => {
        setShowMembers( !showMembers );
    }
    console.log(showMembers);

    const findBookClub = () => {
        
        let mapped = bookClubs.map(bookClub => {
            return bookClub
        })
        .filter(bookClub => {
            let x = bookClub.members.find(member => {
                return member._id === userId
            })
            console.log(x);
            if (x) {
                return bookClub
            }
            return bookClub
        })    
        return mapped
    }
    
    
    const membersBookClubs = findBookClub();

    const mappad = membersBookClubs.map(bookClub => bookClub.members.map(member => member.username))
    console.log(mappad);

    
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

                                <Card membersBookClubs={membersBookClubs} handleShowMembers={handleShowMembers}/>
                            </div>
                        </section>
                        <section className="bottomContainer">
                            <div className="contentGroup">
                                <p className="content"></p>
                                <div className="line"></div>
                            </div>
                            <div className="containerLowerInfo">
                                {
                                    showMembers && membersBookClubs.map(bookClub => {
                                    return <div key={bookClub._id}>{bookClub.name}</div>
                                })
                            }
                                {/* <div>
                                    {
                                        membersBookClubs.map(bookClub => {
                                            {
                                                bookClub.members.map(member => <p>{member.username}</p>)
                                            }
                                        })
                                    }
                                </div> */}
                            </div>
                        </section>
                    </div>
                </main>
            }
        </>
    )
}


    // const getUser = () => {
        
    //     axios
    //     .get(`${userApi}${userId}`)
    //     .then(resp => {
    //         setUser(resp.data)
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     })
    // }
    
    // const getBookClubs = () => {
    //     const ac = new AbortController();

    //     axios
    //         .get(bookClubsApi, { signal: ac.signal })
    //         .then(resp => {
    //             setBooksClubs(resp.data) 
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         })
    //         return () => ac.abort();
    // }
