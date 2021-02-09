import React, { useState } from 'react';
import { Counter } from './features/counter/Counter';
import './styles/App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './views/Login'
import Register from './views/Register'
import Main from './views/Main'
import Aside from './components/Aside'
import { UserContext, UserIdContext } from './UserContext';



function App() {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Router>
        <Aside />

        {/* kan /main göras till att bli username i URL */}
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
