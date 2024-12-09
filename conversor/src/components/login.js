import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setConfirmationMessage('Inicio de sesión exitoso.');
      setError('');
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
      setConfirmationMessage('');
    }
  };

  return (
    <main className="main-contacto">
      <h1>Inicio de Sesion</h1>
      <div className="contact-container">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label className="form-label">Correo electrónico:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <button type="submit" className="form-button">Iniciar Sesion</button>
          </form>
          {error && <p className="error-message">{error}</p>}
          {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
        </div>
      </div>
    </main>
  );
};

export default Login;