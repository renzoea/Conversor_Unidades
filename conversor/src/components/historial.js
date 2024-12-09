import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase';





const Historial = ({ }) => {
    const [conversiones, setConversiones] = useState([]);
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
        <div>
            <h1>Historial de Conversiones</h1>
            {conversiones.length === 0 ? (
                <p>No hay conversiones guardadas.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Unidad 1</th>
                            <th>Valor 1</th>
                            <th>Unidad 2</th>
                            <th>Valor 2</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {conversiones.map((conversion, index) => (
                            <tr key={index}>
                                <td>{conversion.primer_unidad}</td>
                                <td>{conversion.primer_valor}</td>
                                <td>{conversion.segundo_unidad}</td>
                                <td>{conversion.segundo_valor}</td>
                                <td>{conversion.tipo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Historial;