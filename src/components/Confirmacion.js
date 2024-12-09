import React, { useState, useEffect } from 'react';

export const Confirmacion = () => {
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [message, setMessage] = useState(localStorage.getItem('message') || '');

    useEffect(() => {

        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('message');
    }, []);

    return (
        <main className='main-contacto'>
        <div>
            <h1>Confirmación</h1>
            <p>Los datos enviados son:</p>
            <p><strong>Nombre:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Mensaje:</strong> {message}</p>

        </div>
        <h2>¡Gracias por contactarnos! Te responderemos pronto.</h2>
        </main>
        
    );
};

export default Confirmacion;
