import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Conversor from "./components/Conversor";
import Historial from "./components/historial";
import Contacto from "./components/contacto";
import Registro from "./components/registro";
import Cerrar_sesion from "./components/cerrar_sesion";
import Login from "./components/login";
import { Confirmacion } from "./components/Confirmacion";
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <nav>
          <figure>
            <a href="/">
              <img className="logo" id="logo" src="./img/logo.png" alt="Logo" />
            </a>
          </figure>

          <button className="abrir-btn" id="botonera">
            Menu
          </button>
          <ul className="lista" id="lista">
            <button className="cerrar-btn" id="cerrar">
              Cerrar
            </button>
            <li>
              <Link to="/">Inicio</Link>
            </li>
          
            <li>
              <Link to="/Contacto">Contacto</Link>
            </li>
            <li>
              <Link to="/historial">Historial</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/cerrar_sesion">Cerrar Sesión</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/registro">Registrarse</Link>
                </li>
                <li>
                  <Link to="/login">Iniciar Sesión</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      <Routes>
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/Confirmacion" element={<Confirmacion />} />
        <Route path="/" element={<Conversor />} />

        <Route path="/historial" element={<Historial />} />
        <Route path="/cerrar_sesion" element={<Cerrar_sesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <footer className="footer">
        <p>&copy; 2024 Convertodo. Todos los derechos reservados.</p>
      </footer>
    </Router>
  );
}

export default App;