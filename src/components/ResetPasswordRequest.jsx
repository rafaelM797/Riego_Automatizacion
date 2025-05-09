import React, { useState } from 'react';
import './ResetPasswordRequest.css';

function ResetPasswordRequest() {
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
        setErrorMessage(data.message || 'Error al solicitar el restablecimiento.');
        setMessage('');
      }
    } catch (error) {
      console.error('Error al solicitar el restablecimiento:', error);
      setErrorMessage('Error al conectar con el servidor.');
      setMessage('');
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Restablecer Contraseña</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <button type="submit">Enviar Solicitud</button>
        {message && <div className="success-message">{message}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default ResetPasswordRequest;
