import React from 'react';
import './App.css';
import NavBar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/screens/Home';
import Signin from './components/screens/SignIn';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
