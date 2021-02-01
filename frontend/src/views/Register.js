import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Register.scss';

// styling ligger i App.scss

export default function Register() {
    const [areas, setAreas] = useState([]);
    const [input, setInput] = useState({
        username: '',
        password: '',
        repeatPassword: '',
        name: ''
    });

    useEffect(() => {
        getAreas();
    }, [])

    const getAreas = () => {
        axios
            .get('https://catalog.skl.se/rowstore/dataset/8621fe21-0120-407e-a81f-705ef45f76d2')
            .then(res => {
                setAreas(res.data.results);
            })
    }

    const handleChangeInput = (e) => {
        const value = e.target.value;
        setInput({
            ...input,
            [e.target.name]: value
        });
    }

    const
        ages = ['Tonåring', 'Ung vuxen', 'Vuxen', 'Pensionär'],
        meetUpTimes = ['Vardagar dag', 'Vardag kväll', 'Helger dag', 'Helger kväll'],
        categories = ['Biografi', 'Deckare', 'Fantasy', 'Historia', 'Klassiker', 'Noveller', 'Personlig utbeckling', 'Roman', 'Romance', 'Thriller'],
        languages = ['Arabiska', 'Engelska', 'Danska', 'Finska', 'Franska', 'Italienska', 'Polska', 'Svenska', 'Spanska', 'Tyska'];

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
                <input
                    className="input"
                    type="password"
                    placeholder="lösenord"
                    name="password"
                    value={input.password}
                    onChange={handleChangeInput}
                />
                <input
                    className="input"
                    type="password"
                    placeholder="repetera lösenord"
                    name="repeatPassword"
                    value={input.repeatPassword}
                    onChange={handleChangeInput}
                />

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
                    <select className="select">
                        {areas.map((area) => (
                            <option key={area.kommunkod}>{area.kommun}</option>
                        ))}
                    </select>
                </div>

                <div className="radio-buttons-container">
                    <p className="title">Kön</p>
                    <div className="radio-group">
                        <input type="radio" name="sex" />
                        <label>Kvinna</label>
                        <input type="radio" name="sex" />
                        <label>Man</label>
                    </div>
                </div>

                <div className="select-container">
                    <p className="title">Ålder</p>
                    <select className="select">
                        {
                            ages.map(age => (
                                <option key={age}>{age}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="line"></div>
                {/* behöver jag id på category, languages, age? */}
                <div className="mapped-arrays-container"> 
                    <div className="container-title">
                        <p className="title">Kategorier</p>
                    </div>
                    <div className="mapped-group">
                            {
                            categories.map((category, id) => (
                                <div className="mappedArrays" key={category}>
                                    <input type="checkbox" value={category} />
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
                            meetUpTimes.map((meetUpTime, id) => (
                                <div className="mappedArrays" key={meetUpTime}>
                                    <input type="checkbox" value={meetUpTime} />
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
                            languages.map((language, id) => (
                                <div className="mappedArrays" key={language}>
                                    <input type="checkbox" value={language} />
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
                            languages.map((language, id) => (
                                <div className="mappedArrays" key={language}>
                                    <input type="checkbox" value={language} />
                                    <label>{language}</label>
                                </div>
                            ))
                        }
                    </div> 
                </div>

                <div className="button-container">
                    <button className="button">klar.</button>
                </div>
                    <Link to="/">Är du redan medlem? Klicka här.</Link>
            </div>
        </>
    )
}