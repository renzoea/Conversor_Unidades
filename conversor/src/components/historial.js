import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase';





const Historial = ({ }) => {

    



    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
        window.location.href = '/login';
        }
      });
  
      return () => unsubscribe();
    }, []);

    const [conversiones, setConversiones] = useState([]);
    useEffect(() => {
        const obtenerConversiones = async () => {
            try {
                const q = query(collection(db, 'conversiones'), where('id_usuario', '==', user.uid));
                const querySnapshot = await getDocs(q);
                const conversionesArray = querySnapshot.docs.map(doc => doc.data());
                setConversiones(conversionesArray);
            } catch (error) {
                console.error('Error al obtener las conversiones:', error);
            }
        };

        obtenerConversiones();
    },);

    return (
        <main className="main-contacto">
        <div>
            <h1>Historial de Conversiones</h1>
            {conversiones.length === 0 ? (
                <p>No hay conversiones guardadas.</p>
            ) : (
                <table className='tabla'>
                    <thead>
                        <tr>
                        <th className="encabezado">Tipo</th>

                            <th className="encabezado">Conversiones</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {conversiones.map((conversion, index) => (
                            <tr key={index}>  <td>{conversion.tipo}</td>

                            <td>{conversion.primer_valor} {conversion.primer_unidad} = {conversion.segundo_valor} {conversion.segundo_unidad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    </main>
    );
};

export default Historial;