import React, { useContext, useEffect, useState } from 'react';
import { UserContext, UserIdContext, BookClubsContext } from '../UserContext';
import axios from 'axios';
import book from '../assets/book.jpg'

export default function Profile({ }) {
    const { user, setUser } = useContext(UserContext);
    const [img, setImg] = useState('');

    const handleImg = (e) => {
        setImg(e.target.files[0]);

        // let reader = new FileReader();
        // let file = e.target.files[0];

        // reader.onloadend = () => {
        //   setImg({
        //     file: file,
        //     imagePreviewUrl: reader.result
        //   });
        // }
        // reader.readAsDataURL(file)
    }


    const postImg = () => {
        let id = user._id
        console.log(img.name);
        let imgUser = {
            img: img.name
        }
        // const formData = new FormData();
        // formData.append('photo', imgUser) 

        axios
            .put(`http://localhost:5000/users/${id}`, imgUser)
            .then(resp => {
                console.log(resp);
            })
            .catch(error => console.error(error));
    }
    return (

        <>
            <div className="top-container">
                <div className="inner-container">
                    {/* <div>
                    <input type="file" accept=".jpg .png .jpeg" onChange={handleImg} />
                    <div>
                        <p>Plats för bild</p>
                        {
                            img && 
                            <img src={img.name}/>
                        }
                    
                        <button onClick={postImg}>lägg till bild</button>
                    </div>
                     <div>{user.img}</div>
                        <img src={user.img}/>
                </div> */}
                    <div className="content-group">
                        <div className="group">
                            <p className="title">Användarnamn</p>
                            <p>{user.username}</p>
                        </div>
                    </div>
                    <div className="content-group">
                        <div className="group">
                            <p className="title">Namn</p>
                            <p>{user.name}</p>
                        </div>
                    </div>
                    <div className="content-group">

                        <div className="group">
                            <p className="title">Ålder</p>
                            <p>{user.age}</p>
                        </div>
                    </div>
                    <div className="content-group">

                        <div className="group">
                            <p className="title">Kommun</p>
                            <p>{user.area}</p>
                        </div>
                    </div>
                    <div className="content-group">

                        <div className="group">
                            <p className="title">Kön</p>
                            <p>{user.gender}</p>
                        </div>
                    </div>
                    <div className="content-group">

                        <div className="group">
                            <p className="title">Kategori</p>
                            {
                                user.categories &&
                                <p>{user.categories[0]}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}




