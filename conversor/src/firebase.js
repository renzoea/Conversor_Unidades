import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCKdM38wLWaln5mQng4n2_gRa0Y05UcLlM",
    authDomain: "conversor-de-unidades-65d71.firebaseapp.com",
    projectId: "conversor-de-unidades-65d71",
    storageBucket: "conversor-de-unidades-65d71.firebasestorage.app",
    messagingSenderId: "309225253260",
    appId: "1:309225253260:web:81320d86cb50598b5c4ea9",
    measurementId: "G-W2MMVZHR6E"
  };
// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener instancias de los servicios que vas a usar
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth };