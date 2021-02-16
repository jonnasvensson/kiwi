import React, { useContext, useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import '../styles/MiddleMain.scss'
import Card from '../components/Card'
import { UserContext, UserIdContext, BookClubsContext } from '../UserContext';
import axios from 'axios';
import { userApi, bookClubsApi, updateBookClubsApi } from '../assets/axiosURLs'
import ModalCreateBookClub from './ModalCreateBookClub';
import Navbar from './Navbar'


export default function MiddleMain({  }) {
    const { userId, setUserId } = useContext(UserIdContext);
    const { user, setUser } = useContext(UserContext);
    const { bookClubs, setBooksClubs } = useContext(BookClubsContext);
    const [clickedBookClub, setClickedBookClub] = useState({});
    const [modalCreateBookClub, setModalCreateBookClub] = useState(false);
    const [modalActiveBookClub, setModalActiveBookClub] = useState(false);
    const [bookClubTitle, setbookClubTitle] = useState('');
    const [input, setInput] = useState('');
    const [suggestedBookClubs, setSuggestedBookClubs] = useState(false);
    // const [bookClubId, setBookClubId] = useState('');
    // const [googleBooks, setGoogleBooks] = useState([]);

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const randomTitle = (title) => {
        return title[Math.floor(Math.random() * title.length)]
    }

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
                // const data = setGoogleBooks(resp.data.items.map(item => item.volumeInfo.title))
            }
            catch (error) {
                console.error(error);
            }

            // try {
            //     const resp = await axios.get(bookClubsApi)
            //     const data = setBooksClubs(resp.data)

            // } catch (error) {
            //     console.error(error);
            // }
        }

        fetchData();
        findBookClubsBasedOnCriterias();
    }, [])

    const activateModalCreateBookClub = (e) => {
        setModalCreateBookClub(true);
    }

    // const activateModalBookClub = () => {
    //     setModalActiveBookClub(true);
    // }

    const deactivateModalCreateBookClub = () => {
        setModalCreateBookClub(false);
    }

    const deactivateModalBookClub = (e) => {
        setModalActiveBookClub(false);
        findBookClubsBasedOnCriterias();
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
        console.log(bookClub);
        axios
            .post(bookClubsApi, bookClub)
            .then((res) => { })
            .catch(error => console.error(error));

        // name: setbookClubTitle(randomTitle(googleBooks)),

        // let selectedValue = bookClub.category.find(value => value)
        // let y = bookClubs.filter(bookClub => {
        //     let i = bookClub.category.find(value => {
        //         return value === selectedValue
        //     })
        //     if (i === null) {
        //         console.log(i);
        //         return
        //     }
        //     if (i) {
        //         return bookClub
        //     }
        //     return i
        // })

        // let mapped = y.map(bookClubs => {
        //     return bookClubs
        // })
        //     .filter(bookClubsfilter => {
        //         let x = bookClubsfilter.members.length
        //         if (x < 10) {
        //             return bookClubsfilter
        //         }
        //         else {
        //             return
        //         }
        //     })

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
                let a = bookClub.members.find((member) => {
                    return member.name === user.name
                })

                if (a) {
                    match = [...match, bookClub]
                    return match
                }
                if (!a) {
                    noMatch = [...noMatch, bookClub]
                    let x = noMatch.map(members => {
                        return members.members.length;
                    })
                    console.log(noMatch);
                    if (x >= 10) {
                        console.log('x', x);
                        noMatch = [];
                        console.log(noMatch);
                    } 
                }
                return a
            })
            console.log(noMatch);
        let object = { noMatch: noMatch, match: match }
        return object;
    }

    const handleAddMember = () => {
        let x = suggestions.noMatch.reduce((acc, suggestion) => {
                return [...acc, ...suggestion.members]
        }, [])
        let id = clickedBookClub._id
        setSuggestedBookClubs(false);
        let updatedBookClub = {
            members: [...x, user]
        };
        axios
            .put(`http://localhost:5000/bookClubs/${id}`, updatedBookClub)
            .then(resp => {})
            .catch(error => console.error(error));

            deactivateModalBookClub();
    }


    const handleCreateNewBookClub = () => {
        createBookClub();
        setModalActiveBookClub(false);
    }

    const handleLogout = () => {
        setUserId(localStorage.removeItem('id'));
    }

    const handleClickedBookClub = (id) => {
        setModalActiveBookClub(true);
        setClickedBookClub(id)
    }

    const findBookClub = () => {
        if (bookClubs) {
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
    }

    const membersBookClubs = findBookClub();
    const suggestions = findBookClubsBasedOnCriterias();
    console.log(suggestions);

    return (
        <>
            <div className="outer-container"></div>

            {
                user &&

                <main className="middleMainContainer">
                    <div className="container">
                        <section className="topContainer">
                            <Navbar handleLogout={handleLogout} />
                            <div className="usernameInfo">
                                <p className="username">Hej {user.username}.</p>
                            </div>
                            <div className="contentGroup">
                                <p className="content">Bokklubbar du är med i</p>
                            </div>
                            <div className="contentGroup">
                                {
                                    suggestions.match.length === 0 ? <p>Inga matchande bokklubbar</p> :
                                        <Card
                                            suggestions={suggestions.match}
                                            clickedBookClub={clickedBookClub}
                                            modalActiveBookClub={modalActiveBookClub}
                                            deactivateModalBookClub={deactivateModalBookClub}
                                            handleClickedBookClub={handleClickedBookClub}
                                            handleAddMember={handleAddMember}

                                            />
                                        }


                                {/* <p>{suggestions.match.map(item => {
                                    return <div>{item.name}</div>
                                })}</p> */}
                                {/* {
                                    membersBookClubs &&
                                    <Card membersBookClubs={membersBookClubs} handleShowMembers={(id) => handleShowMembers(id)} />
                                }
                            */}
                                <div className="buttonContainer">
                                </div>
                            </div>

                            <div className="contentGroup">
                                <p className="content">Förslag på bokklubbar </p>
                            </div>
                            <div className="contentGroup">
                                {
                                    suggestions.noMatch.length === 0 ? <p>Inga väntande bokklubbar</p> :

                                    <Card
                                        suggestions={suggestions.noMatch}
                                        handleClickedBookClub={handleClickedBookClub}
                                        handleAddMember={handleAddMember}
                                        clickedBookClub={clickedBookClub}
                                        modalActiveBookClub={modalActiveBookClub}
                                        deactivateModalBookClub={deactivateModalBookClub}
                                    />
                                }

                            </div>

                        </section>

                        <button className="button" onClick={activateModalCreateBookClub}>NY BOKKLUBB</button>
                        <section className="bottomContainer">
                            <div className="containerLowerInfo">
                            </div>
                        </section>
                    {
                        modalCreateBookClub &&
                        <ModalCreateBookClub
                            bookClubTitle={bookClubTitle}
                            deactivateModalCreateBookClub={deactivateModalCreateBookClub}
                            // deactivateModal={deactivateModal}  
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

