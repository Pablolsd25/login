import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Box from './components/Box';
import Registro from './components/Registro';
import './App.css'

function App() {
  return (
    <div className='root-background'>
    <Router >
  <Routes>
    <Route path="/registro" element={<Registro />} />
    <Route path="/" element={<Box />} />
  </Routes>
</Router>
</div>
  );
}

export default App;
