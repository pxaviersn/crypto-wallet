import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import PortfolioPage from './pages/PortfolioPage';
import HomePage from './pages/HomePage';
import EditPositionPage from './pages/EditPositionPage';
import CreatePositionPage from './pages/CreatePositionPage'
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={ <HomePage/>} />
        <Route path='/login' element={ <SignInPage/> }/>
        <Route path='/sign-up' element={ <SignUpPage/> }/>
        <Route path='/about' element={ <AboutPage/>}/>
        <Route path='/operations/new' element={ <CreatePositionPage /> }/>
        <Route path='/operations/user/:id/' element={ <EditPositionPage />} />
        <Route path='/operations' element={ <PortfolioPage/> }/>
      </Routes>
    </div>
  );
}

export default App;