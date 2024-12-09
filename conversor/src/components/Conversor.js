import React, { useState, useRef, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase';

const Conversor = () => {
  const [unidad1, setUnidad1] = useState('');
  const [unidad2, setUnidad2] = useState('');
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState('');
  const [options, setOptions] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [error, setError] = useState(null);
  const [confirmacion,setConfirmacion] = useState(null);
  const [data, setData] = useState('');
  const [ultimoDato, setUltimoDato] = useState(null);
  const [conversionesGuardadas, setConversionesGuardadas] = useState([]);
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


  const tmp = ["Celcius", "Kelvin", "Fahrenheit"];
  const ener = ["kilo Whats", "Joule", "Kilo Joule", "Caloria-gramo", "Kilo Caloria", "Volt Hora", "Kilo Volt Hora"];
  const frec = ["Herz", "Kiloherz", "Megaherz", "Gigaherz"];
  const lon = ["Metro", "Kilometro", "Centimetro", "Milimetro", "Milla", "Yarda", "Pie", "Pulgada"];
  const timp = ["Mili Segundo", "Micro Segundo", "Segundo", "Minuto", "Hora", "Dia", "Semana", "Mes", "Año"];

  // Objeto de conversiones
  let conversiones = {
    'Celcius': {
        'Celcius': (X) => X,
        'Kelvin': (X) => X + 273.15,
        'Fahrenheit': (X) => (X * 9/5) + 32
        
    },
    'Kelvin': {
        'Kelvin': (X) => X,
        'Celcius': (X) => X - 273.15,
        'Fahrenheit': (X) => (X - 273.15) * 9/5 + 32
        
    },
    'Fahrenheit': {
        'Fahrenheit': (X) => X,
        'Celcius': (X) => (X - 32) * 5/9,
        'Kelvin': (X) => (X - 32) * 5/9 + 273.15
        
    }
    ///// Energia
    ,
    'kilo Whats': {
        'kilo Whats': (X) => X, // Conversión a sí mismo
        'Joule': (X) => X * 3600000, // 1 kW = 3600000 Joules
        'Kilo Joule': (X) => X * 3600, // 1 kW = 3600 kJ
        'Caloria-gramo': (X) => X * 860421, // 1 kW = 860421 Cal/g
        'Kilo Caloria': (X) => X * 860.421, // 1 kW = 860.421 kcal
        'Volt Hora': (X) => X * 1000, // 1 kW = 1000 Vh
        'Kilo Volt Hora': (X) => X // 1 kW = 1 kWh
        
    },
    'Joule': { 
        'Joule': (X) => X, // Conversión a sí mismo
        'kilo Whats': (X) => X / 3600000, // 1 Joule = 1/3600000 kW
        'Kilo Joule': (X) => X / 1000, // 1 Joule = 0.001 kJ
        'Caloria-gramo': (X) => X / 4.184, // 1 Joule = 1/4.184 Cal/g
        'Kilo Caloria': (X) => X / 4184, // 1 Joule = 1/4184 kcal
        'Volt Hora': (X) => X / 3600, // 1 Joule = 1/3600 Vh
        'Kilo Volt Hora': (X) => X / 3600000 // 1 Joule = 1/3600000 kWh
       
    },
    'Kilo Joule': {
        'Kilo Joule': (X) => X, // Conversión a sí mismo
        'kilo Whats': (X) => X / 3600, // 1 kJ = 1/3600 kW
        'Joule': (X) => X * 1000, // 1 kJ = 1000 Joules
        'Caloria-gramo': (X) => X * 239.006, // 1 kJ = 239.006 Cal/g
        'Kilo Caloria': (X) => X / 4.184, // 1 kJ = 1/4.184 kcal
        'Volt Hora': (X) => X / 3.6, // 1 kJ = 1/3.6 Vh
        'Kilo Volt Hora': (X) => X / 3600 // 1 kJ = 1/3600 kWh
    },
    'Caloria-gramo': {
        'Caloria-gramo': (X) => X, // Conversión a sí mismo
        'kilo Whats': (X) => X / 860421, // 1 Cal/g = 1/860421 kW
        'Joule': (X) => X * 4.184, // 1 Cal/g = 4.184 Joules
        'Kilo Joule': (X) => X / 239.006, // 1 Cal/g = 1/239.006 kJ
        'Kilo Caloria': (X) => X / 1000, // 1 Cal/g = 0.001 kcal
        'Volt Hora': (X) => X / 860.421, // 1 Cal/g = 1/860.421 Vh
        'Kilo Volt Hora': (X) => X / 860421 // 1 Cal/g = 1/860421 kWh
    },
    'Kilo Caloria': {
        'Kilo Caloria': (X) => X, // Conversión a sí mismo
        'kilo Whats': (X) => X / 860.421, // 1 kcal = 1/860.421 kW
        'Joule': (X) => X * 4184, // 1 kcal = 4184 Joules
        'Kilo Joule': (X) => X * 4.184, // 1 kcal = 4.184 kJ
        'Caloria-gramo': (X) => X * 1000, // 1 kcal = 1000 Cal/g
        'Volt Hora': (X) => X / 0.860421, // 1 kcal = 1/0.860421 Vh
        'Kilo Volt Hora': (X) => X / 860.421 // 1 kcal = 1/860.421 kWh
    },
    'Volt Hora': {
        'Volt Hora': (X) => X, // Conversión a sí mismo
        'kilo Whats': (X) => X / 1000, // 1 Vh = 1/1000 kW
        'Joule': (X) => X * 3600, // 1 Vh = 3600 Joules
        'Kilo Joule': (X) => X * 3.6, // 1 Vh = 3.6 kJ
        'Caloria-gramo': (X) => X * 860.421, // 1 Vh = 860.421 Cal/g
        'Kilo Caloria': (X) => X * 0.860421, // 1 Vh = 0.860421 kcal
        'Kilo Volt Hora': (X) => X / 1000 // 1 Vh = 1/1000 kWh
    },
    'Kilo Volt Hora': {
        'Kilo Volt Hora': (X) => X, // Conversión a sí mismo
        'kilo Whats': (X) => X, // 1 kWh = 1 kW
        'Joule': (X) => X * 3600000, // 1 kWh = 3600000 Joules
        'Kilo Joule': (X) => X * 3600, // 1 kWh = 3600 kJ
        'Caloria-gramo': (X) => X * 860421, // 1 kWh = 860421 Cal/g
        'Kilo Caloria': (X) => X * 860.421, // 1 kWh = 860.421 kcal
        'Volt Hora': (X) => X * 1000 // 1 kWh = 1000 Vh
    }/////frecuencia
    ,
        'Herz': {
            'Herz': (X) => X, // Conversión a sí mismo
            'Kiloherz': (X) => X / 1000, // 1 Hz = 1/1000 kHz
            'Megaherz': (X) => X / 1e6, // 1 Hz = 1/1,000,000 MHz
            'Gigaherz': (X) => X / 1e9 // 1 Hz = 1/1,000,000,000 GHz
        },
        'Kiloherz': {
            'Kiloherz': (X) => X, // Conversión a sí mismo
            'Herz': (X) => X * 1000, // 1 kHz = 1000 Hz
            'Megaherz': (X) => X / 1000, // 1 kHz = 1/1000 MHz
            'Gigaherz': (X) => X / 1e6 // 1 kHz = 1/1,000,000 GHz
        },
        'Megaherz': {
            'Megaherz': (X) => X, // Conversión a sí mismo
            'Herz': (X) => X * 1e6, // 1 MHz = 1,000,000 Hz
            'Kiloherz': (X) => X * 1000, // 1 MHz = 1000 kHz
            'Gigaherz': (X) => X / 1000 // 1 MHz = 1/1000 GHz
        },
        'Gigaherz': {
            'Gigaherz': (X) => X, // Conversión a sí mismo
            'Herz': (X) => X * 1e9, // 1 GHz = 1,000,000,000 Hz
            'Kiloherz': (X) => X * 1e6, // 1 GHz = 1,000,000 kHz
            'Megaherz': (X) => X * 1000 // 1 GHz = 1000 MHz
        }//// Longitud
        ,
            'Metro': {
                'Pulgada': (X) => X * 39.3701, // 1 metro = 39.3701 pulgadas
                'Metro': (X) => X, // Conversión a sí mismo
                'Kilometro': (X) => X / 1000, // 1 metro = 1/1000 km
                'Centimetro': (X) => X * 100, // 1 metro = 100 cm
                'Milimetro': (X) => X * 1000, // 1 metro = 1000 mm
                'Milla': (X) => X / 1609.34, // 1 metro = 1/1609.34 millas
                'Yarda': (X) => X * 1.09361, // 1 metro = 1.09361 yardas
                'Pie': (X) => X * 3.28084 // 1 metro = 3.28084 pies
                
            },
            'Kilometro': {
                'Kilometro': (X) => X, // Conversión a sí mismo
                'Metro': (X) => X * 1000, // 1 km = 1000 metros
                'Centimetro': (X) => X * 100000, // 1 km = 100,000 cm
                'Milimetro': (X) => X * 1e6, // 1 km = 1,000,000 mm
                'Milla': (X) => X / 1.60934, // 1 km = 1/1.60934 millas
                'Yarda': (X) => X * 1093.61, // 1 km = 1093.61 yardas
                'Pie': (X) => X * 3280.84, // 1 km = 3280.84 pies
                'Pulgada': (X) => X * 39370.1 // 1 km = 39370.1 pulgadas
            },
            'Centimetro': {
                'Centimetro': (X) => X, // Conversión a sí mismo
                'Metro': (X) => X / 100, // 1 cm = 1/100 metros
                'Kilometro': (X) => X / 100000, // 1 cm = 1/100,000 km
                'Milimetro': (X) => X * 10, // 1 cm = 10 mm
                'Milla': (X) => X / 160934, // 1 cm = 1/160,934 millas
                'Yarda': (X) => X / 91.44, // 1 cm = 1/91.44 yardas
                'Pie': (X) => X / 30.48, // 1 cm = 1/30.48 pies
                'Pulgada': (X) => X / 2.54 // 1 cm = 1/2.54 pulgadas
            },
            'Milimetro': {
                'Milimetro': (X) => X, // Conversión a sí mismo
                'Metro': (X) => X / 1000, // 1 mm = 1/1000 metros
                'Kilometro': (X) => X / 1e6, // 1 mm = 1/1,000,000 km
                'Centimetro': (X) => X / 10, // 1 mm = 1/10 cm
                'Milla': (X) => X / 1.609e6, // 1 mm = 1/1,609,344 millas
                'Yarda': (X) => X / 914.4, // 1 mm = 1/914.4 yardas
                'Pie': (X) => X / 304.8, // 1 mm = 1/304.8 pies
                'Pulgada': (X) => X / 25.4 // 1 mm = 1/25.4 pulgadas
            },
            'Milla': {
                'Milla': (X) => X, // Conversión a sí mismo
                'Metro': (X) => X * 1609.34, // 1 milla = 1609.34 metros
                'Kilometro': (X) => X * 1.60934, // 1 milla = 1.60934 km
                'Centimetro': (X) => X * 160934, // 1 milla = 160,934 cm
                'Milimetro': (X) => X * 1.609e6, // 1 milla = 1,609,344 mm
                'Yarda': (X) => X * 1760, // 1 milla = 1760 yardas
                'Pie': (X) => X * 5280, // 1 milla = 5280 pies
                'Pulgada': (X) => X * 63360 // 1 milla = 63,360 pulgadas
            },
            'Yarda': {
                'Yarda': (X) => X, // Conversión a sí mismo
                'Metro': (X) => X / 1.09361, // 1 yarda = 1/1.09361 metros
                'Kilometro': (X) => X / 1093.61, // 1 yarda = 1/1093.61 km
                'Centimetro': (X) => X * 91.44, // 1 yarda = 91.44 cm
                'Milimetro': (X) => X * 914.4, // 1 yarda = 914.4 mm
                'Milla': (X) => X / 1760, // 1 yarda = 1/1760 millas
                'Pie': (X) => X * 3, // 1 yarda = 3 pies
                'Pulgada': (X) => X * 36 // 1 yarda = 36 pulgadas
            },
            'Pie': {
                'Pie': (X) => X, // Conversión a sí mismo
                'Metro': (X) => X / 3.28084, // 1 pie = 1/3.28084 metros
                'Kilometro': (X) => X / 3280.84, // 1 pie = 1/3280.84 km
                'Centimetro': (X) => X * 30.48, // 1 pie = 30.48 cm
                'Milimetro': (X) => X * 304.8, // 1 pie = 304.8 mm
                'Milla': (X) => X / 5280, // 1 pie = 1/5280 millas
                'Yarda': (X) => X / 3, // 1 pie = 1/3 yardas
                'Pulgada': (X) => X * 12 // 1 pie = 12 pulgadas
            },
            'Pulgada': {
                'Pulgada': (X) => X, // Conversión a sí mismo
                'Metro': (X) => X / 39.3701, // 1 pulgada = 1/39.3701 metros
                'Kilometro': (X) => X / 39370.1, // 1 pulgada = 1/39,370.1 km
                'Centimetro': (X) => X * 2.54, // 1 pulgada = 2.54 cm
                'Milimetro': (X) => X * 25.4, // 1 pulgada = 25.4 mm
                'Milla': (X) => X / 63360, // 1 pulgada = 1/63,360 millas
                'Yarda': (X) => X / 36, // 1 pulgada = 1/36 yardas
                'Pie': (X) => X / 12 // 1 pulgada = 1/12 pies
            }/// Tiempo
            ,
                'Micro Segundo': {
                    'Micro Segundo': (X) => X, // Conversión a sí mismo
                    'Mili Segundo': (X) => X / 1000, // 1 Micro Segundo = 1/1000 Mili Segundos
                    'Segundo': (X) => X / 1e6, // 1 Micro Segundo = 1/1,000,000 segundos
                    'Minuto': (X) => X / 6e7, // 1 Micro Segundo = 1/60,000,000 minutos
                    'Hora': (X) => X / 3.6e9, // 1 Micro Segundo = 1/3,600,000,000 horas
                    'Dia': (X) => X / 8.64e10, // 1 Micro Segundo = 1/86,400,000,000 Dias
                    'Semana': (X) => X / 6.048e11, // 1 Micro Segundo = 1/604,800,000,000 semanas
                    'Mes': (X) => X / 2.628e12, // 1 Micro Segundo = 1/2,628,000,000,000 meses
                    'Año': (X) => X / 3.154e13 // 1 Micro Segundo = 1/31,540,000,000,000 años
                },
                'Mili Segundo': {
                    'Mili Segundo': (X) => X, // Conversión a sí mismo
                    'Micro Segundo': (X) => X * 1000, // 1 Mili Segundo = 1000 Micro Segundos
                    'Segundo': (X) => X / 1000, // 1 Mili Segundo = 1/1000 segundos
                    'Minuto': (X) => X / 60000, // 1 Mili Segundo = 1/60,000 minutos
                    'Hora': (X) => X / 3.6e6, // 1 Mili Segundo = 1/3,600,000 horas
                    'Dia': (X) => X / 8.64e7, // 1 Mili Segundo = 1/86,400,000 Dias
                    'Semana': (X) => X / 6.048e8, // 1 Mili Segundo = 1/604,800,000 semanas
                    'Mes': (X) => X / 2.628e9, // 1 Mili Segundo = 1/2,628,000,000 meses
                    'Año': (X) => X / 3.154e10 // 1 Mili Segundo = 1/31,540,000,000 años
                },
                'Segundo': {
                    'Segundo': (X) => X, // Conversión a sí mismo
                    'Micro Segundo': (X) => X * 1e6, // 1 segundo = 1,000,000 Micro Segundos
                    'Mili Segundo': (X) => X * 1000, // 1 segundo = 1000 Mili Segundos
                    'Minuto': (X) => X / 60, // 1 segundo = 1/60 minutos
                    'Hora': (X) => X / 3600, // 1 segundo = 1/3600 horas
                    'Dia': (X) => X / 86400, // 1 segundo = 1/86,400 Dias
                    'Semana': (X) => X / 604800, // 1 segundo = 1/604,800 semanas
                    'Mes': (X) => X / 2.628e6, // 1 segundo = 1/2,628,000 meses
                    'Año': (X) => X / 3.154e7 // 1 segundo = 1/31,540,000 años
                },
                'Minuto': {
                    'Minuto': (X) => X, // Conversión a sí mismo
                    'Micro Segundo': (X) => X * 6e7, // 1 minuto = 60,000,000 Micro Segundos
                    'Mili Segundo': (X) => X * 60000, // 1 minuto = 60,000 Mili Segundos
                    'Segundo': (X) => X * 60, // 1 minuto = 60 segundos
                    'Hora': (X) => X / 60, // 1 minuto = 1/60 horas
                    'Dia': (X) => X / 1440, // 1 minuto = 1/1440 Dias
                    'Semana': (X) => X / 10080, // 1 minuto = 1/10,080 semanas
                    'Mes': (X) => X / 43800, // 1 minuto = 1/43,800 meses
                    'Año': (X) => X / 525600 // 1 minuto = 1/525,600 años
                },
                'Hora': {
                    'Hora': (X) => X, // Conversión a sí mismo
                    'Micro Segundo': (X) => X * 3.6e9, // 1 hora = 3,600,000,000 Micro Segundos
                    'Mili Segundo': (X) => X * 3.6e6, // 1 hora = 3,600,000 Mili Segundos
                    'Segundo': (X) => X * 3600, // 1 hora = 3600 segundos
                    'Minuto': (X) => X * 60, // 1 hora = 60 minutos
                    'Dia': (X) => X / 24, // 1 hora = 1/24 Dias
                    'Semana': (X) => X / 168, // 1 hora = 1/168 semanas
                    'Mes': (X) => X / 730, // 1 hora = 1/730 meses
                    'Año': (X) => X / 8760 // 1 hora = 1/8760 años
                },
                'Dia': {
                    'Dia': (X) => X, // Conversión a sí mismo
                    'Micro Segundo': (X) => X * 8.64e10, // 1 Dia = 86,400,000,000 Micro Segundos
                    'Mili Segundo': (X) => X * 8.64e7, // 1 Dia = 86,400,000 Mili Segundos
                    'Segundo': (X) => X * 86400, // 1 Dia = 86,400 segundos
                    'Minuto': (X) => X * 1440, // 1 Dia = 1440 minutos
                    'Hora': (X) => X * 24, // 1 Dia = 24 horas
                    'Semana': (X) => X / 7, // 1 Dia = 1/7 semanas
                    'Mes': (X) => X / 30.417, // 1 Dia = 1/30.417 meses
                    'Año': (X) => X / 365 // 1 Dia = 1/365 años
                },
                'Semana': {
                    'Semana': (X) => X, // Conversión a sí mismo
                    'Micro Segundo': (X) => X * 6.048e11, // 1 semana = 604,800,000,000 Micro Segundos
                    'Mili Segundo': (X) => X * 6.048e8, // 1 semana = 604,800,000 Mili Segundos
                    'Segundo': (X) => X * 604800, // 1 semana = 604,800 segundos
                    'Minuto': (X) => X * 10080, // 1 semana = 10,080 minutos
                    'Hora': (X) => X * 168, // 1 semana = 168 horas
                    'Dia': (X) => X * 7, // 1 semana = 7 Dias
                    'Mes': (X) => X / 4.345, // 1 semana = 1/4.345 meses
                    'Año': (X) => X / 52.143 // 1 semana = 1/52.143 años
                },
                'Mes': {
                    'Mes': (X) => X, // Conversión a sí mismo
                    'Micro Segundo': (X) => X * 2.628e12, // 1 mes = 2,628,000,000,000 Micro Segundos
                    'Mili Segundo': (X) => X * 2.628e9, // 1 mes = 2,628,000,000 Mili Segundos
                    'Segundo': (X) => X * 2.628e6, // 1 mes = 2,628,000 segundos
                    'Minuto': (X) => X * 43800 // 1 mes

        }};


        const cambiarUnidad = (array) => {
          setOptions(array);
        };




const auth = getAuth();


onAuthStateChanged(auth, (user) => {
  if (user) {

    console.log("Usuario autenticado:", user.uid);

  } else {
   
    console.log("No hay un usuario autenticado");
  }
});

  const handleConvertir = () => {
    if (conversiones[unidad1] && conversiones[unidad1][unidad2]) {
      const result = conversiones[unidad1][unidad2](parseFloat(valor));
      setResultado(result.toFixed(4));
    } else {
      setResultado('Conversión no disponible');
    }
  };
  useEffect(() => {
    handleConvertir();
  }, [valor, unidad1, unidad2]); 


  const handleCategoriaChange = (categoria) => {
    setCategoria(categoria);
    var Opciones;
    switch (categoria) {
      case 'temperatura':  Opciones=tmp; break;
      case 'frecuencia' : Opciones=frec; break;
      case 'longitud': Opciones=lon; break;
      case 'tiempo' : Opciones=timp; break;
      case 'energia': Opciones=ener; break;
    }
    setUnidad1('');
    setUnidad2('');
    setResultado(null);
      cambiarUnidad(Opciones);
    
  };

  


    const guardarConversion = async () => {
      if (!user) {
       
        setError('Debes iniciar sesión para guardar la conversión');
      
     } else {
      if (!unidad1 || !unidad2 || !valor) {
        setError('Completa todos los espacios');
        return;
      }
      try {
        const docRef = await addDoc(collection(db, 'conversiones'), {
          id_usuario: user.uid,
          primer_unidad: unidad1,
          primer_valor: valor,
          segundo_unidad: unidad2,
          segundo_valor: resultado,
          tipo: categoria
        });
        console.log("Conversión guardada con ID: ", docRef.id);
        setConfirmacion('Conversión guardada con éxito');
      } catch (e) {
        console.error("Error al guardar la conversión: ", e);
      }
      }
    };






useEffect(() => {
  setValor('');
  setUnidad1('');
  setUnidad2('');
  setResultado('');
}, []); 

///////////////////////////TABLAS DE CONVERSIONES///////////////////////////

const TablaConversiones = ({ conversiones, array }) => {
  const tablas = [];

  for (let categoria in conversiones) {
    const conversionesPorCategoria = conversiones[categoria];

    const filas = [];
    
    for (let unidad in conversionesPorCategoria) {
      if (array.includes(unidad)) {
        const conversion = conversionesPorCategoria[unidad];
        filas.push(
          
          <tr key={unidad}>
            <td>{unidad}</td>
            <td>{`${conversion}`}</td>
          </tr>
        );
      }
    }
    if (filas.length > 0) {
      tablas.push(
        
        <div   key={categoria}>
          
          <table>
            <thead>
              <tr>
                <th className="encabezado">Unidad</th>
                <th className="encabezado">Conversión</th>
              </tr>
            </thead>
            <tbody>
              {filas}
            </tbody>
          </table>
        </div>
      );
    }
  }


  return  <div class="div4" id="tablas">{tablas}</div>;
};




  useEffect(() => {
    if (confirmacion) {
      const timer = setTimeout(() => {
        setConfirmacion(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [confirmacion]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <main className="parent">
      <div className="div1 botones">
        <button className={`btnSelect ${categoria === 'temperatura' ? 'btnSelected' : ''}`} onClick={() => handleCategoriaChange('temperatura')}>Temperatura</button>
        <button className={`btnSelect ${categoria === 'frecuencia' ? 'btnSelected' : ''}`} onClick={() => handleCategoriaChange('frecuencia')}>Frecuencia</button>
        <button className={`btnSelect ${categoria === 'longitud' ? 'btnSelected' : ''}`} onClick={() => handleCategoriaChange('longitud')}>Longitud</button>
        <button className={`btnSelect ${categoria === 'tiempo' ? 'btnSelected' : ''}`} onClick={() => handleCategoriaChange('tiempo')}>Tiempo</button>
        <button className={`btnSelect ${categoria === 'energia' ? 'btnSelected' : ''}`} onClick={() => handleCategoriaChange('energia')}>Energía</button>
      </div>
      
      <div className="div2">
    <h1>Conversor de Unidades</h1>
    <p>
      Bienvenido a nuestro conversor de unidades, selecciona una categoría
      para comenzar a convertir tus unidades. Si deseas saber más sobre nosotros.
    </p>
    <hr className="hrs" />
</div>
      <div className="div3">
        
        <div className="conversor">
          <div className="select">
          <input 
            type="number" 
            value={valor} 
            onChange={(e) => setValor(e.target.value)} 
          />
          <select 
            value={unidad1} 
            onChange={(e) => setUnidad1(e.target.value)}
          >
            <option value="">Seleccione aquí</option>
            {options.map((option, index) => (
              <option key={`select1-${index}`} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
          
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="28px" fill="#000000">
            <path d="M160-280v-120h640v120H160Zm0-280v-120h640v120H160Z" />
          </svg>
          
          <div className="select">
          <input type="number" value={resultado} readOnly />
          <select 
            value={unidad2} 
            onChange={(e) => setUnidad2(e.target.value)}
          >
            <option value="">Seleccione aquí</option>
            {options.map((opcion, index) => (
              <option key={`select2-${index}`} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
          </div>
        </div> 
                  
        <div className='div-btn'>
          <div>          {error && <p className="error">{error}</p>}
          {confirmacion && <p className="confirmacion">{confirmacion}</p>}
          </div>
          
         <button className='form-button' onClick={guardarConversion}>Guardar Datos</button>
        
        <Link to="/historial"><button className='form-button'>Ver conversiones guardadas</button></Link>
        </div>
        
        <hr className="hrs" />
      </div>
      
        {categoria && (
          <TablaConversiones conversiones={conversiones} array={options} />
        )}
     
    </main>
  );
};

export default Conversor;
