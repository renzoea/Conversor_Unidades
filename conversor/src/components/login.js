import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [message, setMessage] = useState(localStorage.getItem('message') || '');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('message', message);
  }, [name, email, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmationMessage('¡Gracias por contactarnos! Te responderemos pronto.');
    
    // Guardar datos enviados en el estado `submittedData`
    setSubmittedData({ name, email, message });
    
    // Limpiar campos
   

    // Redirigir a otra página (por ejemplo, a "/gracias")
    navigate('/Confirmacion');
  };

  return (
    <main className="main-contacto">
      <h1>Inicio de Sesion</h1>
      <div className="contact-container">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label className="form-label">Nombre:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
              />
            </div>
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
           
            <button type="submit" className="form-button">Iniciar Sesion</button>
          </form>
          {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
        </div>
      </div>
    </main>
  );
};

export default Login;
