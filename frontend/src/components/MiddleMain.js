import React, { useContext, useEffect, useState } from 'react';
import '../styles/MiddleMain.scss'
import Card from '../components/Card'
import { UserContext, UserIdContext, BookClubsContext } from '../UserContext';
import axios from 'axios';
import { userApi, bookClubsApi } from '../assets/axiosURLs'
import ModalCreateBookClub from './ModalCreateBookClub';
import Navbar from './Navbar'
import Profile from './Profile'


export default function MiddleMain({ }) {
    // const { bookClubs, setBooksClubs } = useContext(BookClubsContext);
    const { userId, setUserId } = useContext(UserIdContext);
    const { user, setUser } = useContext(UserContext);
    const [clickedBookClub, setClickedBookClub] = useState({});
    const [modalCreateBookClub, setModalCreateBookClub] = useState(false);
    const [modalActiveBookClub, setModalActiveBookClub] = useState(false);
    const [bookClubTitle, setbookClubTitle] = useState('');
    const [input, setInput] = useState('');
    const [toggle, setToggle] = useState(false);
    const [bookClubs, setBookClubs] = useState([]);
    const [update, setUpdate] = useState(false);

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
                const resp = await axios.get('https://www.googleapis.com/books/v1/volumes?q=intitle:holiday&maxResults=40')
                setInput(randomTitle(resp.data.items.map(item => item.volumeInfo.title)));
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [])

    useEffect(() => {
        let mounted = true;
        axios
            .get(bookClubsApi)
            .then (res => {
                if (mounted) {
                    setBookClubs(res.data)
                }
            })
            .catch(error => {
                console.error(error);
            })
            return () => mounted = false;
    }, [update])


    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const randomTitle = (title) => {
        return title[Math.floor(Math.random() * title.length)]
    }

    const activateModalCreateBookClub = (e) => {
        setModalCreateBookClub(true);
    }

    const deactivateModalCreateBookClub = () => {
        setModalCreateBookClub(false);
    }

    const deactivateModalBookClub = (e) => {
        setModalActiveBookClub(false);
    }

    const createBookClub = () => {

        let bookClub = {
            name: input,
            area: user.area,
            gender: user.gender,
            age: user.age,
            category: user.categories,
            members: [user]
        }
        axios
            .post(bookClubsApi, bookClub)
            .then(() => { 
                setUpdate(!update);
            })
            .catch(error => console.error(error));
    }

    const findBookClubsBasedOnCriterias = () => {
        let noMatch = [];
        let match = [];
        let x = bookClubs && bookClubs.filter(bookClub => bookClub)
            .filter(bookClub => bookClub.area === user.area)
            .filter(bookClub => bookClub.gender === user.gender)
            .filter(bookClub => bookClub.age === user.age)
            .filter(bookClub => {
                let categoryMatch = bookClub.category.find((value, index) => {
                    return value === user.categories[index];
                })
                if (categoryMatch == null) {
                    return
                }
                if (categoryMatch) {
                    return bookClub;
                }
                return bookClub;
            })
            .map(bookClub => {
                let a = bookClub.members && bookClub.members.find((member) => {
                    return member.name === user.name
                })

                if (a) {
                    match = [...match, bookClub]
                    return match
                }
                if (!a) {
                    noMatch = [...noMatch, bookClub]
                    let x = noMatch.map(members => {
                        if (members.members) {
                            return members.members.length;
                        }
                    })
                    if (x >= 10) {
                        noMatch = [];
                    }
                }
                return a
            })
        let object = { noMatch: noMatch, match: match }
        return object;
    }

    const handleAddMember = () => {
        // let x = suggestions.noMatch.reduce((acc, suggestion) => {
        //     return [...acc, ...suggestion.members]
        // }, [])

        let id = clickedBookClub._id
        let updatedBookClub = {
            // members: [...x, user]
            members: [...suggestions.noMatch[0].members, user]
        };
        axios
            .put(`http://localhost:5000/bookClubs/${id}`, updatedBookClub)
            .then(resp => { 
                setUpdate(!update)
             })
            .then(() => {

            })
            .catch(error => console.error(error));

        deactivateModalBookClub();
    }

    const handleCreateNewBookClub = () => {
        createBookClub();
        deactivateModalCreateBookClub();
    }
    const handleLeaveBookClub = () => {
        let id = clickedBookClub._id;

        let member = clickedBookClub.members.find((member, index) => {
            return member._id === user._id;
        })
        let memberLeaving = {
            member: member._id
        };

        axios
            .put(`http://localhost:5000/bookClubs/${id}`, memberLeaving)
            .then(() => {
                setUpdate(!update)
            })
            .catch(error => {
                console.error(error);
            })
        deactivateModalBookClub();
    }

    const handleLogout = () => {
        setUserId(localStorage.removeItem('id'));
    }

    const handleToggle = (e) => {
        setToggle(e.target.value);
    }

    const handleClickedBookClub = (id) => {
        setModalActiveBookClub(true);
        setClickedBookClub(id)
    }

    const suggestions = findBookClubsBasedOnCriterias();
    console.log(suggestions);


    return (
        <>
            <div className="outer-container"></div>

            {
                user &&

                <main className="middleMainContainer">
                    <div className="container">
                        <Navbar
                            handleLogout={handleLogout}
                            handleToggle={handleToggle}
                            toggle={toggle}
                        />
                        {
                            toggle === 'profile' ?
                                <Profile />
                                :
                                <section className="top-container">

                                    <div className="top-content-group">
                                        <p className="content">Bokklubbar du är med i</p>
                                        <button className="new-book-club" onClick={activateModalCreateBookClub}>NY BOKKLUBB</button>

                                    </div>
                                    <div className="content-group">
                                        {
                                            suggestions.match.length === 0 ? <p>Inga matchande bokklubbar</p> :
                                                <Card
                                                    suggestions={suggestions.match}
                                                    clickedBookClub={clickedBookClub}
                                                    modalActiveBookClub={modalActiveBookClub}
                                                    deactivateModalBookClub={deactivateModalBookClub}
                                                    handleClickedBookClub={handleClickedBookClub}
                                                    handleAddMember={handleAddMember}
                                                    handleLeaveBookClub={handleLeaveBookClub}
                                                />
                                        }
                                        <div className="buttonContainer">
                                        </div>
                                    </div>

                                    <div className="content-group">
                                        <p className="content">Förslag på bokklubbar </p>
                                    </div>
                                    <div className="content-group">
                                        {
                                            suggestions.noMatch.length === 0 ? <p>Inga väntande bokklubbar</p> :

                                                <Card
                                                    suggestions={suggestions.noMatch}
                                                    handleClickedBookClub={handleClickedBookClub}
                                                    handleAddMember={handleAddMember}
                                                    clickedBookClub={clickedBookClub}
                                                    modalActiveBookClub={modalActiveBookClub}
                                                    deactivateModalBookClub={deactivateModalBookClub}
                                                    handleLeaveBookClub={handleLeaveBookClub}
                                                />
                                        }

                                    </div>

                                </section>
                        }
                        {
                            modalCreateBookClub &&
                            <ModalCreateBookClub
                                bookClubTitle={bookClubTitle}
                                deactivateModalCreateBookClub={deactivateModalCreateBookClub}
                                handleChange={handleChange}
                                input={input}
                                handleCreateNewBookClub={handleCreateNewBookClub}
                            />
                        }
                    </div>
                </main>
            }
        </>
    )
}
