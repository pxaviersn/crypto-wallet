import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage'
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import PremiumPage from './pages/PremiumPage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={ <HomePage/> }/>
        <Route path='/about' element={ <AboutPage/>}/>
        <Route path='/sign-in' element={ <SignInPage/> }/>
        <Route path='/sign-up' element={ <SignUpPage/> }/>
        <Route path='/dashboard' element={ <DashboardPage/> }/>
        <Route path='/premium' element={ <PremiumPage/> }/>
      </Routes>
    </div>
  );
}

export default App;