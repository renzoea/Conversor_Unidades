import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Registro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setConfirmacion('');

    try {
  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

  
      setConfirmacion('¡Registro exitoso! Bienvenido.');
      

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
          {confirmacion && <p className="confirmacion">{confirmacion}</p>}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </main>
  );
};

export default Registro;
