import React, { useState, useEffect } from 'react';
import { Counter } from './features/counter/Counter';
import './styles/App.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from './views/Login'
import Register from './views/Register'
import Main from './views/Main'
import Aside from './components/Aside'
import {UserContext} from './UserContext';



function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Router>
        <Aside />
          
        {/* kan /main göras till att bli username i URL */}
        <UserContext.Provider value={{user, setUser}} >
          <Route exact path="/" component={Login} />
          <Route path="/main" component={Main} /> 
          <Route path="/registrera" component={Register} />
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
