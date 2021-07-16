import React, {useState, useContext} from 'react';
import Navbar from './features/navbar/Navbar';
import Products from './features/products/Products.js';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import ProductModal from './features/modals/ProductModal.js';
import CreateProductCardModal from './features/modals/CreateProductCardModal.js';
import Payment from './features/modals/PaymentModal.js';
import { Context } from "./index.js";
import {useAuthState} from 'react-firebase-hooks/auth';
import Loader from './features/loader/Loader.js';


function App() {
  const {auth} = useContext(Context)
  const [, loading] = useAuthState(auth)

  const [userInput, setUserInput] = useState('')
  function changeUserInput(e) {
      setUserInput(e.target.value)
  }

  if (loading) {
    return <Loader/>
  }

  return (
    <BrowserRouter>
      <Navbar userInput={userInput} onChangedUserInput={changeUserInput}/>
      <Products filter={userInput}/>
      <Switch>
        <Route exact path='/product/:id/pay'>
          <Payment/>
        </Route>
        <Route exact path='/product/:id'>
          <ProductModal/>
        </Route>
        <Route exact path='/createCard'>
          <CreateProductCardModal/>
        </Route>
        <Redirect to='/'/>
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
