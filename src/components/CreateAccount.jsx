import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';

function CreateAccount() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const new_username = event.target.new_username.value;
    const new_email = event.target.new_email.value;
    const new_password = event.target.new_password.value;

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `new_username=${encodeURIComponent(new_username)}&new_email=${encodeURIComponent(new_email)}&new_password=${encodeURIComponent(new_password)}`,
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        navigate('/');
      } else {
        setErrorMessage(data.message || 'Error al crear la cuenta.');
      }
    } catch (error) {
      console.error('Error al crear la cuenta:', error);
      setErrorMessage('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="create-account-container">
      <h1>Crear Cuenta</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="new_username">Usuario:</label>
          <input type="text" id="new_username" name="new_username" required />
        </div>
        <div className="form-group">
          <label htmlFor="new_email">Correo Electrónico:</label>
          <input type="email" id="new_email" name="new_email" required />
        </div>
        <div className="form-group">
          <label htmlFor="new_password">Contraseña:</label>
          <input type="password" id="new_password" name="new_password" required />
        </div>
        <button type="submit">Crear Cuenta</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
      <button className="back-button" onClick={() => navigate('/')}>Regresar</button>
    </div>
  );
}

export default CreateAccount;
