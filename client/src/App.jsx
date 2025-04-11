// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/login" 
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} 
        />
        <Route 
          path="/signup" 
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Signup />} 
        />

        <Route 
          path="/dashboard" 
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
