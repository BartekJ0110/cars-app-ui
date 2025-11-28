import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Outlet} from "react-router-dom";
import NavBar from './NavBar';

function App() {
  return (
    <>
        <NavBar />
        <Outlet />
    </>
  );
}

export default App;
