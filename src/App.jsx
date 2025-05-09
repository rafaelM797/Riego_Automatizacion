import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import ForgotPassword from './components/ForgotPassword';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create_account" element={<CreateAccount />} />
        <Route path="/reset_password" element={<ForgotPassword />} />
        <Route path="/admin/dashboard" element={<h1>Panel de Administrador</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
