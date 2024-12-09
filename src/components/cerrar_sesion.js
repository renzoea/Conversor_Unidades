
import { getAuth, signOut } from "firebase/auth";
import React, { useState, useEffect } from 'react';

export const Cerrar_sesion = () => {


const auth = getAuth();


signOut(auth)
  .then(() => {

    console.log("Cierre de sesión exitoso");

    window.location.href = "/";
  })
  .catch((error) => {

    console.error("Error al cerrar sesión:", error);
  });};

  export default Cerrar_sesion;