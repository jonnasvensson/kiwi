import React from 'react';
import { Counter } from './features/counter/Counter';
import './styles/App.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from './views/Login'
import Register from './views/Register'
import Main from './views/Main'
import Aside from './components/Aside'



function App() {
  return (
    <div className="App">
      <Router>
        <Aside />
          <Route exact path="/" component={Login} />
          
        {/* kan /main göras till att bli username i URL */}
        <Route path="/main" component={Main} /> 
        <Route path="/registrera" component={Register} />
      </Router>
    </div>
  );
}

export default App;
