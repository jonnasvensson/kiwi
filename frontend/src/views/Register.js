import React, { useEffect, useState } from 'react';
import axios from 'axios';

// styling ligger i App.scss

export default function Register() {
    const [areas, setAreas] = useState([]);

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

    const
        ages = ['Tonåring', 'Ung vuxen', 'Vuxen', 'Pensionär'],
        meetUpTimes = ['Vardagar dag', 'Vardag kväll', 'Helger dag', 'Helger kväll'],
        categories = ['Biografi', 'Deckare', 'Fantasy', 'Historia', 'Klassiker', 'Noveller', 'Personlig utbeckling', 'Roman', 'Romance', 'Thriller'],
        languages = ['Arabiska', 'Engelska', 'Danska', 'Finska', 'Franska', 'Italienska', 'Polska', 'Svenska', 'Spanska', 'Tyska'];

    return (
        <>
            <h3>Register</h3>
            <main className="container">

                <div className="containerRegister">
                    <input type="text" placeholder="användarnamn" />
                    <input type="password" placeholder="lösenord" />
                    <input type="password" placeholder="repetera lösenord" />

                    <input type="text" placeholder="namn" />

                    <label>kommun</label>
                    <select>
                        {areas.map((area) => (
                            <option key={area.kommunkod}>{area.kommun}</option>
                        ))}
                    </select>
                    <div>
                        <label>Kvinna</label>
                        <input type="radio" name="sex" />

                        <label>Man</label>
                        <input type="radio" name="sex" />
                    </div>
                    <label>Ålder</label>
                    <select>
                        {
                            ages.map(age => (
                                <option key={age}>{age}</option>
                            ))
                        }
                    </select>
                    {/* behöver jag id på category, languages, age? */}
                    <div className="contiainerMappedArrays"> Kategorier
                        {
                            categories.map((category, id) => (
                                <div className="mappedArrays" key={category}>
                                    <label>{category}</label>
                                    <input type="checkbox" value={category} />
                                </div>
                            ))
                        }
                    </div>
                    <div className="contiainerMappedArrays"> När vill du träffas?
                        {
                            meetUpTimes.map((meetUpTime, id) => (
                                <div className="mappedArrays" key={meetUpTime}>
                                    <label>{meetUpTime}</label>
                                    <input type="checkbox" value={meetUpTime} />
                                </div>
                            ))
                        }
                    </div>
                    <div className="contiainerMappedArrays">Vilket språk vill du läsa på?
                        {
                            languages.map((language, id) => (
                                <div className="mappedArrays" key={language}>
                                    <label>{language}</label>
                                    <input type="checkbox" value={language} />
                                </div>
                            ))
                        }
                    </div>
                    <div className="contiainerMappedArrays">Vilket språk vill du diskutera på?
                        {
                            languages.map((language, id) => (
                                <div className="mappedArrays" key={language}>
                                    <label>{language}</label>
                                    <input type="checkbox" value={language} />
                                </div>
                            ))
                        }
                    </div>
                    <div className="containerButton">
                        <button className="button">klar.</button>
                    </div>
                </div>

            </main>
        </>
    )
}