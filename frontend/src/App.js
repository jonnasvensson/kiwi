import React, { useState, useEffect } from 'react';
// import { Counter } from './features/counter/Counter';
import './styles/App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';


import Login from './views/Login'
import Register from './views/Register'
import Main from './views/Main'
// import Aside from './components/Aside'
import { UserContext, UserIdContext, BookClubsContext } from './UserContext';
import { userApi, bookClubsApi } from './assets/axiosURLs'
import Navigation from './components/Navigation';




function App() {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({});
  const [bookClubs, setBooksClubs] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
        try {
            const resp = await axios.get(bookClubsApi)
            const data = setBooksClubs(resp.data)

        } catch (error) {
            console.error(error);
        }
    }

    fetchData();
}, [])



  return (
    <div className="App">
      <Router>
      <div className="container-left">
        <Navigation />
        </div>
      <div className="container-right">
      </div>
        {/* <Aside /> */}

        {/* kan /main göras till att bli username i URL */}
        <UserIdContext.Provider value={{ userId, setUserId }} >
          <BookClubsContext.Provider value={{ bookClubs, setBooksClubs }}>
            <UserContext.Provider value={{ user, setUser }}>
              <Route exact path="/" component={Login} />
              <Route path="/main" component={Main} />
            </UserContext.Provider>
            <Route path="/registrera" component={Register} />
          </BookClubsContext.Provider>
        </UserIdContext.Provider>
      </Router>
    </div>
  );
}

export default App;
