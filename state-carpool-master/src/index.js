import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import { Container } from 'react-bootstrap';
import { UserProvider} from "./Components/UserContext";
import App from './App';
import NavigationBar from './Components/NavigationBar';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Container fluid id="rootContainer">
        <UserProvider>
            <NavigationBar/>
            <App />
        </UserProvider>
    </Container>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
