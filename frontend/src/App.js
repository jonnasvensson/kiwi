import React, { useState } from 'react';
import './styles/App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";


import Login from './views/Login'
import Register from './views/Register'
import Main from './views/Main'
import { UserContext, UserIdContext } from './UserContext';
import Navigation from './components/Navigation';

function App() {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({});



  return (
    <div className="App">
      <Router>
        <div className="container-left">
          <div className="container-title-unions">
          <p className="title">tale to tell</p>
            <div className="collection-unions">
          <div className="group"> 
              <svg width="27" height="20" viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="union">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.492 16.226C18.3859 18.5259 15.1386 20 11.4956 20C5.14677 20 0 15.5228 0 10C0 4.47715 5.14677 0 11.4956 0C14.7712 0 17.7269 1.19177 19.8208 3.10405C20.4427 3.12414 21.0761 3.23409 21.7066 3.4445C27.4566 5.36361 27.7798 13.3752 22.2031 15.7513C21.637 15.9925 21.0627 16.1481 20.492 16.226Z" fill="#F5E8BC" />
              </svg>
              <svg width="27" height="20" viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="union-opp">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.492 16.226C18.3859 18.5259 15.1386 20 11.4956 20C5.14677 20 0 15.5228 0 10C0 4.47715 5.14677 0 11.4956 0C14.7712 0 17.7269 1.19177 19.8208 3.10405C20.4427 3.12414 21.0761 3.23409 21.7066 3.4445C27.4566 5.36361 27.7798 13.3752 22.2031 15.7513C21.637 15.9925 21.0627 16.1481 20.492 16.226Z" fill="#F5E8BC" />
              </svg>
            </div>

            <div className="group"> 
              <svg width="27" height="20" viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="union">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.492 16.226C18.3859 18.5259 15.1386 20 11.4956 20C5.14677 20 0 15.5228 0 10C0 4.47715 5.14677 0 11.4956 0C14.7712 0 17.7269 1.19177 19.8208 3.10405C20.4427 3.12414 21.0761 3.23409 21.7066 3.4445C27.4566 5.36361 27.7798 13.3752 22.2031 15.7513C21.637 15.9925 21.0627 16.1481 20.492 16.226Z" fill="#F5E8BC" />
              </svg>
              <svg width="27" height="20" viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="union-opp">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.492 16.226C18.3859 18.5259 15.1386 20 11.4956 20C5.14677 20 0 15.5228 0 10C0 4.47715 5.14677 0 11.4956 0C14.7712 0 17.7269 1.19177 19.8208 3.10405C20.4427 3.12414 21.0761 3.23409 21.7066 3.4445C27.4566 5.36361 27.7798 13.3752 22.2031 15.7513C21.637 15.9925 21.0627 16.1481 20.492 16.226Z" fill="#F5E8BC" />
                
              </svg>
              <svg width="27" height="20" viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="union-opp">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.492 16.226C18.3859 18.5259 15.1386 20 11.4956 20C5.14677 20 0 15.5228 0 10C0 4.47715 5.14677 0 11.4956 0C14.7712 0 17.7269 1.19177 19.8208 3.10405C20.4427 3.12414 21.0761 3.23409 21.7066 3.4445C27.4566 5.36361 27.7798 13.3752 22.2031 15.7513C21.637 15.9925 21.0627 16.1481 20.492 16.226Z" fill="#F5E8BC" />
              </svg>
            </div>

          </div>
          </div>
          <Navigation />
        </div>
        <div className="container-right">
        </div>
        <UserIdContext.Provider value={{ userId, setUserId }} >
          <UserContext.Provider value={{ user, setUser }}>
            <Route exact path="/" component={Login} />
            <Route path="/main" component={Main} />
          </UserContext.Provider>
          <Route path="/registrera" component={Register} />
        </UserIdContext.Provider>
      </Router>
    </div>
  );
}

export default App;
