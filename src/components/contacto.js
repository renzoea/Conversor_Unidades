import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Contacto = () => {
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
    

    setSubmittedData({ name, email, message });
    

    navigate('/Confirmacion');
  };

  return (
    <main className="main-contacto">
      <h1>Contáctanos</h1>
      <div className="contact-container">
        <div className="contact-info">
          <p className="p-contacto">📍 Dirección: Ramos Mejia, Buenos Aires, Argentina</p>
          <p className="p-contacto">📞 Teléfono: +54 11 1234-5678</p>
          <p className="p-contacto">📧 Correo: Convertodo@convert.com.ar</p>
        </div>
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
            <div className="form-group">
              <label className="form-label">Mensaje:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-textarea"
                required
              />
            </div>
            <button type="submit" className="form-button">Enviar</button>
          </form>
          {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
        </div>
      </div>
    </main>
  );
};

export default Contacto;
