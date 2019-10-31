import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './containers/marsPicture.css';
//import './containers/marsWeather.css';
import Pic from './containers/marsPicture';
//import Report from './containers/marsWeather';

function App() {
  return (
    <div className="App">
        <Router>
            <Route exact path="/" component={Pic} />
        </Router>
    </div>
  );
}

export default App;
