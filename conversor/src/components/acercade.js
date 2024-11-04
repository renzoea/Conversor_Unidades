import React from "react";

const AcercaDe = () => {
    return (
        <div>
            <header>
                <nav>
                    <figure>
                        <a href="index.html">
                            <img className="logo" src="img/logo.png" alt="Logo" />
                        </a>
                    </figure>
                    <ul className="lista">
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="acercade.html">Acerca de</a></li>
                    </ul>
                </nav>
            </header>
            <main style={{ backgroundColor: "rgb(122, 120, 120)", marginBottom: "100px" }}>
                <p>
                    La página Convertodo se encarga en la ayuda de estudiante, profesores, o cualquier persona que esté buscando un conversor
                    de las unidades más usadas tanto en física como en química, esta permite ver las tablas de conversión de distintas unidades básicas, o simplemente hacerlo automáticamente.
                    Esto nos ayuda a tener una asistencia portable, ya que podemos usarla en teléfonos, tablets o computadoras, mediante páginas web o aplicaciones móviles.
                </p>
                
                <p>Objetivos:</p>
                <ul className="lista pruebita">
                    <li>Desarrollar una aplicación responsive para el pasaje rápido de unidades o tener las tablas para poder acceder al mismo fin.</li>
                    <hr className="hrs" />
                    <li>Implementar un diseño fácil y amigable para que cualquiera pueda acceder a él, y lo use sin tener ninguna dificultad.</li>
                    <hr className="hrs" />
                    <li>Que sea adaptable tanto desktop como para tablets y teléfonos.</li>
                </ul>
            </main>
            <footer className="footer">
                <p>&copy; 2024 Convertodo. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default AcercaDe;
