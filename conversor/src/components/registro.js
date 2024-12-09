import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Registro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setConfirmationMessage('');

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // You can add the user's name to their profile here if needed
      // await updateProfile(user, { displayName: name });

      setConfirmationMessage('¡Registro exitoso! Bienvenido.');
      
      // Redirect to another page (e.g., "/dashboard")
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError('Error en el registro: ' + error.message);
    }
  };

  return (
    <main className="main-contacto">
      <h1>Registro</h1>
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
            <button type="submit" className="form-button5">Registrarse</button>
          </form>
          {confirmationMessage && <p className="confirmacion">{confirmationMessage}</p>}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </main>
  );
};

export default Registro;
