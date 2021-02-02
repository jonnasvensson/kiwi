import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Register.scss';
import { one, two, three } from './areaAPI'

export default function Register() {
    const [allAreas, setAllAreas] = useState([]);
    const [input, setInput] = useState({
        username: '',
        password: '',
        repeatPassword: '',
        name: '',
        gender: '',
        // area: '',
        // age: '',
        // categories: [],
        // meetUpTime: [],
        // readLanguage: [],
        // speakLanguage: []
    });
    const [categories, setCategories] = useState([]);
    const [meetUpTimes, setMeetUpTimes] = useState([]);
    const [readLanguages, setReadLanguages] = useState([]);
    const [speakLanguages, setSpeakLanguages] = useState([]);

    const [selectArea, setSelectArea] = useState('');
    const [selectAge, setSelectAge] = useState('');
    const [error, setError] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    useEffect(() => {
        getAreaAPI();
    }, [])

    const getAreaAPI = () => {
        axios.all([
            axios.get(one), 
            axios.get(two), 
            axios.get(three)
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
            // nedan gör att om man klickar ur checkbxen så ändras värdet
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

    const postAxios = () => {

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
            .post('http://localhost:5000/register', user)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleSubmit = () => {
        if (!input.username) {
            setError(true)
            return
        }
        if (input.username) {
            if (input.password === input.repeatPassword) {
                setErrorPassword(true);
                postAxios();
            } else {
                setErrorPassword(false);
            }
        }
    }


    const
        agesToMap = ['Tonåring', 'Ung vuxen', 'Vuxen', 'Pensionär'],
        meetUpTimesToMap = ['Vardagar dag', 'Vardag kväll', 'Helger dag', 'Helger kväll'],
        categoriesToMap = ['Biografi', 'Deckare', 'Fantasy', 'Historia', 'Klassiker', 'Noveller', 'Personlig utveckling', 'Roman', 'Romance', 'Thriller'],
        languagesToMap = ['Arabiska', 'Engelska', 'Danska', 'Finska', 'Franska', 'Italienska', 'Polska', 'Svenska', 'Spanska', 'Tyska'];

    return (
        <>
            <div className="register-container">
                <input
                    className="input"
                    type="text"
                    placeholder="användarnamn"
                    name="username"
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
                    <select className="select" value={selectArea} onChange={handleSelectArea} >
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
                        <p className="title">Kategorier</p>
                    </div>
                    <div className="mapped-group">
                        {
                            categoriesToMap.map((category, id) => (
                                <div className="mappedArrays" key={category}>
                                    <input
                                        type="checkbox"
                                        value={category}
                                        name={category}
                                        onChange={handleCategories} />
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
                    <button className="button" onClick={handleSubmit}>klar.</button>
                </div>
                <Link to="/">Är du redan medlem? Klicka här.</Link>
            </div>
        </>
    )
}