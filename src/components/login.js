import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setConfirmationMessage('Inicio de sesión exitoso.');
      setError('');

      const from = location.state?.from?.pathname || '/';
      if (from === '/registro') {
        navigate('/');
      } else {
        navigate(from);
      }
    } catch (error) {
      setError('Error al iniciar sesión');
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
            <button type="submit" className="form-button5">Iniciar Sesion</button>
          </form>
          {error && <p className="error">{error}</p>}
          {confirmationMessage && <p className="confirmacion">{confirmationMessage}</p>}
        </div>
      </div>
    </main>
  );
};

export default Login;