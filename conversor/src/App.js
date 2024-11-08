import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Conversor from "./components/Conversor";

import "./App.css";
import AcercaDe from "./components/acercade";
function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <figure>
            <a href="index.html">
              <img class="logo" id="logo" src="img/logo.png" alt="Logo" />
            </a>
          </figure>

          <button class="abrir-btn" id="botonera">
            Menu
          </button>
          <ul class="lista" id="lista">
            <button class="cerrar-btn" id="cerrar">
              Cerrar
            </button>
            <li>
            <Link to='/' >Inicio</Link>
            </li>
            <li>
              <Link to="/acercade">Acerca de</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Conversor />} />
        <Route path="/acercade" element={<AcercaDe />} />
      </Routes>
    </Router>
  );
}

export default App;
