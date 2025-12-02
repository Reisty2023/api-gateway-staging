import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import ConnectDialog from './components/ConnectDialog';
import Connecting from './components/Connecting';
import Success from './components/Success';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/connect" element={<ConnectDialog />} />
        <Route path="/connecting" element={<Connecting />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
