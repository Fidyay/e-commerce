import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.scss'
import { store } from './app/store';
import { Provider } from 'react-redux';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'



firebase.initializeApp({
  apiKey: "AIzaSyDTvK6JvFy5n5oGu_648LO5liDP9Bpup3o",
  authDomain: "e-commerce-86af9.firebaseapp.com",
  projectId: "e-commerce-86af9",
  storageBucket: "e-commerce-86af9.appspot.com",
  messagingSenderId: "383459346286",
  appId: "1:383459346286:web:6b9900a60e30154322a37f"
})


const auth = firebase.auth()
const firestore = firebase.firestore()
const Context = createContext()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Context.Provider value={{firebase, auth, firestore}}>
        <App/>
      </Context.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


export {Context}