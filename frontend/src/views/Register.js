import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Register.scss';
import { areaOneApi, areaTwoApi, areaThreeApi, registerUserApi, allUsersApi, bookClubsApi } from '../assets/axiosURLs'
import { BookClubsContext } from '../UserContext';
import ModalUserCreated from '../components/ModalUserCreated';



export default function Register() {
    const { bookClubs, setBooksClubs } = useContext(BookClubsContext);

    const [allAreas, setAllAreas] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [input, setInput] = useState({
        username: '',
        password: '',
        repeatPassword: '',
        name: '',
        gender: '',
    });
    const [categories, setCategories] = useState([]);
    const [meetUpTimes, setMeetUpTimes] = useState([]);
    const [readLanguages, setReadLanguages] = useState([]);
    const [speakLanguages, setSpeakLanguages] = useState([]);

    const [selectArea, setSelectArea] = useState('');
    const [selectAge, setSelectAge] = useState('');
    const [error, setError] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorBookClub, setErrorBookClub] = useState(false);
    const [usersInBooklub, setUsersInBookClub] = useState([]);
    const [googleBooks, setgoogleBooks] = useState([]);
    const [modalActive, setModalActive] = useState(false)


    useEffect(() => {
        getAreaAPI();
        getUsers();
        // getBooks();
    }, [])

    const activateModal = () => {
        setModalActive(true);
    }
    
    const deactivateModal = () => {
        setModalActive(false);
    }

    // const createBookClub = (members) => {

    //     let bookClub = {
    //         name: randomTitle(googleBooks),
    //         area: selectArea,
    //         gender: input.gender,
    //         age: selectAge,
    //         category: categories,
    //         members: members
    //     }

    //     let selectedValue = bookClub.category.find(value => value)
    //     let y = bookClubs.filter(bookClub => {
    //         let i = bookClub.category.find(value => {
    //             return value === selectedValue
    //         })
    //         if (i === null) {
    //             console.log(i);
    //             return
    //         }
    //         if (i) {
    //             return bookClub
    //         }
    //         return i
    //     })

    //     let mapped = y.map(bookClubs => {
    //         return bookClubs
    //     })
    //         .filter(bookClubsfilter => {
    //             let x = bookClubsfilter.members.length
    //             if (x < 10) {
    //                 return bookClubsfilter
    //             }
    //             else {
    //                 return
    //             }
    //         })

    //     if (categories) {
    //         axios
    //             .post(bookClubsApi, bookClub)
    //             .then((res) => { })
    //             .catch(error => console.error(error));
    //     }
    // }

    const postAxiosUser = () => {
        let usersFromMatching = matchingUsers();

        const user = {
            username: input.username,
            password: input.password,
            name: input.name,
            gender: input.gender,
            area: selectArea,
            age: selectAge,
            categories: categories,
            meetUpTimes: meetUpTimes,
            readLanguages: readLanguages,
            speakLanguages: speakLanguages
        }
        axios
            .post(registerUserApi, user)
            .then((res) => {
                // let newArray = [...usersFromMatching, ...res.data.ops]
                // setUsersInBookClub([...res.data.ops, ...usersFromMatching])
                // if (newArray.length >= 2) {
                //     createBookClub(newArray);
                //     console.log('bokklubb skapad');
                // } else {
                //     console.log('Bokklubb not created');
                //     return
                // }
            })
            .catch(err => {
                console.error(err);
            })
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.username) {
            setError(true)
            return
        }
        if (input.username) {
            setError(false);
            if (!input.password) {
                setErrorPassword(true);
                return
            }
            if (input.password === input.repeatPassword) {
                setErrorPassword(false);
                matchingUsers();
                if (categories.length >= 1) {
                    postAxiosUser();
                }
                if (categories.length === 0) {
                    setErrorBookClub(true);
                } else {
                    setErrorBookClub(false);
                }
            } else {
                setErrorPassword(false);
            }
        }
        activateModal();
    }


    const randomTitle = (title) => {
        return title[Math.floor(Math.random() * title.length)]
    }

    // const getBooks = () => {
    //     axios
    //         .get('https://www.googleapis.com/books/v1/volumes?q=intitle:holiday&maxResults=40')
    //         .then(resp => {
    //             setgoogleBooks(resp.data.items.map(item => item.volumeInfo.title))
    //         })
    // }


    const findBookClub = () => {
        let x = bookClubs && bookClubs.filter(bookClub => bookClub)
        .filter(bookClub => bookClub.area === selectArea)
        .filter(bookClub => bookClub.gender === input.gender)
        .filter(bookClub => bookClub.age === selectAge)
        .filter(bookClub => {
            let categoryMatch = bookClub.category.find((value, index) => {
                return value === categories[index];
            })
            if (categoryMatch == null) {
                return
            }
            if (categoryMatch) {
                return bookClub;
            }
            return bookClub;
        })
        // console.log(x);
    }
    findBookClub();


    const matchingUsers = (mappedUser) => {
        mappedUser = allUsers.map(user => user)
            .filter(user => user.area === selectArea)
            .filter(user => user.gender === input.gender)
            .filter(user => user.age === selectAge)

            .filter(user => {
                let categoryMatch = user.categories.find((category, index) => {
                    return category === categories[index];
                })
                if (categoryMatch == null) {
                    return
                }
                if (categoryMatch) {
                    return user;
                }
                return user;
            })
            .filter(user => {
                let meetUpTimeMatch = user.meetUpTimes.find((meetUpTime, index) => {
                    return meetUpTime === meetUpTimes[index];
                })
                if (meetUpTimeMatch) {
                    return user
                }
                return user;
            })
            .filter(user => {
                let readLanguageMatch = user.readLanguages.find((readLanguage, index) => {
                    return readLanguage === readLanguages[index];
                })
                if (readLanguageMatch) {
                    return user
                }
                return user;
            })
            .filter(user => {
                let speakLanguageMatch = user.speakLanguages.find((speakLanguage, index) => {
                    return speakLanguage === speakLanguages[index];
                })
                if (speakLanguageMatch) {
                    return user
                }
                return user;
            })
        return mappedUser
    }

    const getAreaAPI = () => {
        axios.all([
            axios.get(areaOneApi),
            axios.get(areaTwoApi),
            axios.get(areaThreeApi)
        ])
            .then(responses => {
                const responsesOne = responses[0]
                const responsesTwo = responses[1]
                const responsesThree = responses[2]
                setAllAreas([...responsesOne.data.results, ...responsesTwo.data.results, ...responsesThree.data.results])
            }
            )
            .catch(errors => console.error(errors));
    }

    const getUsers = () => {
        axios
            .get(allUsersApi)
            .then(res => {
                setAllUsers(res.data)
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleChangeInput = (e) => {
        // hanterar inputs och radiobuttons for gender
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setInput({
            ...input,
            [name]: value
        });
    }


    const handleSelectArea = (e) => {
        setSelectArea(e.target.value);
        // const target = e.target;
        // const value = target.value;
        // const name = target.name;

        //         setSelected({
        //         ...selected,
        //         [name]: value
        //     });
    }

    const handleSelectAge = (e) => {
        setSelectAge(e.target.value);
    }

    const handleCategories = (e) => {
        let checked = e.target.checked;
        let value = e.target.value;
        if (checked) {
            setCategories([...categories, value]);
        } else {
            let filteredCategories = categories.filter(category => category !== value);
            return setCategories(filteredCategories);
        }

        // const target = e.target;
        // const value = target.type === "checkbox" ? target.checked : target.value;
        // const name = target.name;

    }
    const handleMeetUpTime = (e) => {
        let checked = e.target.checked;
        let value = e.target.value;
        if (checked) {
            setMeetUpTimes([...meetUpTimes, value]);
        } else {
            // nedan gör att om man klickar ur checkbxen så ändras värdet
            let filteredmeetUpTimes = meetUpTimes.filter(meetUpTime => meetUpTime !== value);
            return setMeetUpTimes(filteredmeetUpTimes);
        }
    }

    const handleReadLanguage = (e) => {
        let checked = e.target.checked;
        let value = e.target.value;
        if (checked) {
            setReadLanguages([...readLanguages, value]);
        } else {
            let filteredreadLanguages = readLanguages.filter(readLanguage => readLanguage !== value);
            return setReadLanguages(filteredreadLanguages);
        }
    }

    const handleSpeakLanguage = (e) => {
        let checked = e.target.checked;
        let value = e.target.value;
        if (checked) {
            setSpeakLanguages([...speakLanguages, value]);
        } else {
            let filteredspeakLanguages = speakLanguages.filter(speakLanguage => speakLanguage !== value);
            return setSpeakLanguages(filteredspeakLanguages);
        }
    }



    const
        agesToMap = ['Tonåring', 'Ung vuxen', 'Vuxen', 'Pensionär'],
        meetUpTimesToMap = ['Vardagar dag', 'Vardag kväll', 'Helger dag', 'Helger kväll'],
        categoriesToMap = ['Biografi', 'Deckare', 'Fantasy', 'Historia', 'Klassiker', 'Noveller', 'Personlig utveckling', 'Roman', 'Romance', 'Thriller'],
        languagesToMap = ['Arabiska', 'Engelska', 'Danska', 'Finska', 'Franska', 'Italienska', 'Polska', 'Svenska', 'Spanska', 'Tyska'];

    return (
        <>
            <div className="wrapper">
                <div className="containerImg">
                    {/* <div className="imgWrapper">
                        <img className="img" srcSet={img} alt="bok och blommor"/>
                    </div> */}
                </div>
            </div>

            <form className="register-container" onSubmit={handleSubmit} >
                <input
                    className="input"
                    type="text"
                    placeholder="användarnamn"
                    name="username"
                    required
                    value={input.username}
                    onChange={handleChangeInput}
                />
                <div className="error">
                    {
                        error && <div className="title">börja med ett användarnamn</div>
                    }
                </div>
                <input
                    className="input"
                    type="password"
                    placeholder="lösenord"
                    name="password"
                    value={input.password}
                    onChange={handleChangeInput}
                />
                <div className="error">
                    {
                        errorPassword && <div className="title">lösenorden stämmer inte överrens</div>
                    }
                </div>
                <input
                    className="input"
                    type="password"
                    placeholder="repetera lösenord"
                    name="repeatPassword"
                    value={input.repeatPassword}
                    onChange={handleChangeInput}
                />
                <div className="error">
                    {
                        errorPassword && <div className="title">lösenorden stämmer inte överrens</div>
                    }
                </div>
                <input
                    className="input"
                    type="text"
                    placeholder="namn"
                    name="name"
                    value={input.name}
                    onChange={handleChangeInput}
                />

                <div className="select-container">
                    <p className="title">Kommun</p>
                    <select className="select" value={selectArea} required onChange={handleSelectArea} >
                        <option default></option>
                        {
                            allAreas.map((area) => (
                                <option
                                    name={area.kommun}
                                    key={area.kommunkod}
                                    value={area.kommun}
                                >{area.kommun}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="radio-buttons-container">
                    <p className="title">Kön</p>
                    <div className="radio-group">
                        <input
                            type="radio"
                            name="gender"
                            value='kvinna'
                            onChange={handleChangeInput}
                        />
                        <label>Kvinna</label>
                        <input
                            type="radio"
                            name="gender"
                            value='man'
                            onChange={handleChangeInput}
                        />
                        <label>Man</label>
                    </div>
                </div>

                <div className="select-container">
                    <p className="title">Ålder</p>
                    <select className="select" value={selectAge} onChange={handleSelectAge}>
                        <option default ></option>
                        {
                            agesToMap.map(age => (
                                <option
                                    name={age}
                                    key={age}
                                    value={age}
                                >{age}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="line"></div>
                {/* behöver jag id på category, languagesToMap, age? */}
                <div className="mapped-arrays-container">
                    <div className="container-title">
                        <p className="title">Kategori</p>
                        <div className="error">
                            {
                                errorBookClub && <div className="title">välj en kategori</div>
                            }
                        </div>
                    </div>
                    <div className="mapped-group">
                        {
                            categoriesToMap.map((category, id) => (
                                <div className="mappedArrays" key={category}>
                                    <input
                                        type="checkbox"
                                        value={category}
                                        name={category}
                                        onChange={handleCategories}
                                    />
                                    <label>{category}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="mapped-arrays-container">
                    <div className="container-title">
                        <p className="title">När vill du träffas?</p>
                    </div>
                    <div className="mapped-group">
                        {
                            meetUpTimesToMap.map((meetUpTime, id) => (
                                <div className="mappedArrays" key={meetUpTime}>
                                    <input
                                        type="checkbox"
                                        name={meetUpTime}
                                        value={meetUpTime}
                                        onChange={handleMeetUpTime}
                                    />
                                    <label>{meetUpTime}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="mapped-arrays-container">
                    <div className="container-title">
                        <p className="title">Vilket språk vill du läsa på?</p>
                    </div>
                    <div className="mapped-group">
                        {
                            languagesToMap.map((language, id) => (
                                <div className="mappedArrays" key={language}>
                                    <input
                                        type="checkbox"
                                        value={language}
                                        name={language}
                                        onChange={handleReadLanguage}
                                    />
                                    <label>{language}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="mapped-arrays-container">
                    <div className="container-title">
                        <p className="title">Vilket språk vill du prata på?</p>
                    </div>
                    <div className="mapped-group">
                        {
                            languagesToMap.map((language, id) => (
                                <div className="mappedArrays" key={language}>
                                    <input
                                        type="checkbox"
                                        value={language}
                                        name={language}
                                        onChange={handleSpeakLanguage}
                                    />
                                    <label>{language}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="button-container">
                    <input className="button reg" type="submit" onClick={handleSubmit} value="REGISTERA MIG"/>
                </div>
            {
                modalActive && <ModalUserCreated deactivateModal={deactivateModal} />
            }
            </form>
        </>
    )
}