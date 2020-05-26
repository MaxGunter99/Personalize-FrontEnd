import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

//React Router Dom
import { BrowserRouter as Router , withRouter } from 'react-router-dom';
const RootElement = document.getElementById('root')

//Router
const AppWithRouter = withRouter( App )

ReactDOM.render(

    <Router>
        <AppWithRouter/>
    </Router>,
    RootElement 
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
