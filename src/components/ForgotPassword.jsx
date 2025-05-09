import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;

    try {
      const response = await fetch('/reset_password_request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}`,
      });

      const data = await response.json();
      if (data.success) {
        setMessage(data.message);
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Error al enviar la solicitud.');
        setMessage('');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setErrorMessage('Error al conectar con el servidor.');
      setMessage('');
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Recuperar Contraseña</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <button type="submit">Enviar Solicitud</button>
        {message && <div className="success-message">{message}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
      <button className="back-button" onClick={() => navigate('/')}>Regresar</button>
    </div>
  );
}

export default ForgotPassword;
