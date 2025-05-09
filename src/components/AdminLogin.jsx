import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      });

      const data = await response.json();
      if (data.success) {
        navigate(data.redirect); // Redirige al panel de administrador
      } else {
        setErrorMessage(data.message || 'Credenciales incorrectas.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión como administrador:', error);
      setErrorMessage('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="admin-login-container">
      <h1>Iniciar Sesión de Administrador</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Iniciar Sesión</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default AdminLogin;
