// Importa la biblioteca de autenticación de Firebase
import { getAuth, signOut } from "firebase/auth";
import React, { useState, useEffect } from 'react';

export const Cerrar_sesion = () => {

// Inicializa la autenticación de Firebase
const auth = getAuth();

// Cierra sesión al usuario
signOut(auth)
  .then(() => {
    // Cierre de sesión exitoso
    console.log("Cierre de sesión exitoso");
    // Redirige al usuario a la página de inicio de sesión
    window.location.href = "/";
  })
  .catch((error) => {
    // Error al cerrar sesión
    console.error("Error al cerrar sesión:", error);
  });};

  export default Cerrar_sesion;