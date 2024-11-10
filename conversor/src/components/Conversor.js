import React, { useState } from 'react';

const Conversor = () => {
  const [unidad1, setUnidad1] = useState('');
  const [unidad2, setUnidad2] = useState('');
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState('');
  const [categoria, setCategoria] = useState('');

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
                'Microsegundo': {
                    'Microsegundo': (X) => X, // Conversión a sí mismo
                    'Milisegundo': (X) => X / 1000, // 1 microsegundo = 1/1000 milisegundos
                    'Segundo': (X) => X / 1e6, // 1 microsegundo = 1/1,000,000 segundos
                    'Minuto': (X) => X / 6e7, // 1 microsegundo = 1/60,000,000 minutos
                    'Hora': (X) => X / 3.6e9, // 1 microsegundo = 1/3,600,000,000 horas
                    'Día': (X) => X / 8.64e10, // 1 microsegundo = 1/86,400,000,000 días
                    'Semana': (X) => X / 6.048e11, // 1 microsegundo = 1/604,800,000,000 semanas
                    'Mes': (X) => X / 2.628e12, // 1 microsegundo = 1/2,628,000,000,000 meses
                    'Año': (X) => X / 3.154e13 // 1 microsegundo = 1/31,540,000,000,000 años
                },
                'Milisegundo': {
                    'Milisegundo': (X) => X, // Conversión a sí mismo
                    'Microsegundo': (X) => X * 1000, // 1 milisegundo = 1000 microsegundos
                    'Segundo': (X) => X / 1000, // 1 milisegundo = 1/1000 segundos
                    'Minuto': (X) => X / 60000, // 1 milisegundo = 1/60,000 minutos
                    'Hora': (X) => X / 3.6e6, // 1 milisegundo = 1/3,600,000 horas
                    'Día': (X) => X / 8.64e7, // 1 milisegundo = 1/86,400,000 días
                    'Semana': (X) => X / 6.048e8, // 1 milisegundo = 1/604,800,000 semanas
                    'Mes': (X) => X / 2.628e9, // 1 milisegundo = 1/2,628,000,000 meses
                    'Año': (X) => X / 3.154e10 // 1 milisegundo = 1/31,540,000,000 años
                },
                'Segundo': {
                    'Segundo': (X) => X, // Conversión a sí mismo
                    'Microsegundo': (X) => X * 1e6, // 1 segundo = 1,000,000 microsegundos
                    'Milisegundo': (X) => X * 1000, // 1 segundo = 1000 milisegundos
                    'Minuto': (X) => X / 60, // 1 segundo = 1/60 minutos
                    'Hora': (X) => X / 3600, // 1 segundo = 1/3600 horas
                    'Día': (X) => X / 86400, // 1 segundo = 1/86,400 días
                    'Semana': (X) => X / 604800, // 1 segundo = 1/604,800 semanas
                    'Mes': (X) => X / 2.628e6, // 1 segundo = 1/2,628,000 meses
                    'Año': (X) => X / 3.154e7 // 1 segundo = 1/31,540,000 años
                },
                'Minuto': {
                    'Minuto': (X) => X, // Conversión a sí mismo
                    'Microsegundo': (X) => X * 6e7, // 1 minuto = 60,000,000 microsegundos
                    'Milisegundo': (X) => X * 60000, // 1 minuto = 60,000 milisegundos
                    'Segundo': (X) => X * 60, // 1 minuto = 60 segundos
                    'Hora': (X) => X / 60, // 1 minuto = 1/60 horas
                    'Día': (X) => X / 1440, // 1 minuto = 1/1440 días
                    'Semana': (X) => X / 10080, // 1 minuto = 1/10,080 semanas
                    'Mes': (X) => X / 43800, // 1 minuto = 1/43,800 meses
                    'Año': (X) => X / 525600 // 1 minuto = 1/525,600 años
                },
                'Hora': {
                    'Hora': (X) => X, // Conversión a sí mismo
                    'Microsegundo': (X) => X * 3.6e9, // 1 hora = 3,600,000,000 microsegundos
                    'Milisegundo': (X) => X * 3.6e6, // 1 hora = 3,600,000 milisegundos
                    'Segundo': (X) => X * 3600, // 1 hora = 3600 segundos
                    'Minuto': (X) => X * 60, // 1 hora = 60 minutos
                    'Día': (X) => X / 24, // 1 hora = 1/24 días
                    'Semana': (X) => X / 168, // 1 hora = 1/168 semanas
                    'Mes': (X) => X / 730, // 1 hora = 1/730 meses
                    'Año': (X) => X / 8760 // 1 hora = 1/8760 años
                },
                'Día': {
                    'Día': (X) => X, // Conversión a sí mismo
                    'Microsegundo': (X) => X * 8.64e10, // 1 día = 86,400,000,000 microsegundos
                    'Milisegundo': (X) => X * 8.64e7, // 1 día = 86,400,000 milisegundos
                    'Segundo': (X) => X * 86400, // 1 día = 86,400 segundos
                    'Minuto': (X) => X * 1440, // 1 día = 1440 minutos
                    'Hora': (X) => X * 24, // 1 día = 24 horas
                    'Semana': (X) => X / 7, // 1 día = 1/7 semanas
                    'Mes': (X) => X / 30.417, // 1 día = 1/30.417 meses
                    'Año': (X) => X / 365 // 1 día = 1/365 años
                },
                'Semana': {
                    'Semana': (X) => X, // Conversión a sí mismo
                    'Microsegundo': (X) => X * 6.048e11, // 1 semana = 604,800,000,000 microsegundos
                    'Milisegundo': (X) => X * 6.048e8, // 1 semana = 604,800,000 milisegundos
                    'Segundo': (X) => X * 604800, // 1 semana = 604,800 segundos
                    'Minuto': (X) => X * 10080, // 1 semana = 10,080 minutos
                    'Hora': (X) => X * 168, // 1 semana = 168 horas
                    'Día': (X) => X * 7, // 1 semana = 7 días
                    'Mes': (X) => X / 4.345, // 1 semana = 1/4.345 meses
                    'Año': (X) => X / 52.143 // 1 semana = 1/52.143 años
                },
                'Mes': {
                    'Mes': (X) => X, // Conversión a sí mismo
                    'Microsegundo': (X) => X * 2.628e12, // 1 mes = 2,628,000,000,000 microsegundos
                    'Milisegundo': (X) => X * 2.628e9, // 1 mes = 2,628,000,000 milisegundos
                    'Segundo': (X) => X * 2.628e6, // 1 mes = 2,628,000 segundos
                    'Minuto': (X) => X * 43800 // 1 mes

        }}

  const handleConvertir = () => {
    if (conversiones[unidad1] && conversiones[unidad1][unidad2]) {
      const result = conversiones[unidad1][unidad2](parseFloat(valor));
      setResultado(result.toFixed(2));
    } else {
      setResultado('Conversión no disponible');
    }
  };

  const handleCategoriaChange = (categoria) => {
    setCategoria(categoria);
    switch (categoria) {
      case 'temperatura': setUnidad1('Celcius'); setUnidad2('Kelvin'); break;
      // Añadir más categorías según sea necesario...
      default: setUnidad1(''); setUnidad2('');
    }
  };

  return (
    <div className="parent">
      <div className="div1 botones">
        <button className="btnSelect" onClick={() => handleCategoriaChange('temperatura')}>Temperatura</button>
        <button className="btnSelect" onClick={() => handleCategoriaChange('frecuencia')}>Frecuencia</button>
        <button className="btnSelect" onClick={() => handleCategoriaChange('longitud')}>Longitud</button>
        <button className="btnSelect" onClick={() => handleCategoriaChange('tiempo')}>Tiempo</button>
        <button className="btnSelect" onClick={() => handleCategoriaChange('energia')}>Energía</button>
      </div>
      
      <div className="div2">
        <h1>Conversor de Unidades</h1>
        <p>
          Bienvenido a nuestro conversor de unidades, selecciona una categoria
          para comenzar a convertir tus unidades. Si deseas saber más sobre nosotros, revisa la sección <a href="acercade.html">Acerca de</a> para más información.
        </p>
      </div>

      <div className="div3">
        <hr className="hrs" />
        <div className="conversor">
          <div className="select">
            <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
            <select value={unidad1} onChange={(e) => setUnidad1(e.target.value)}>
              <option value="">Seleccione aquí</option>
              {/* Opciones según la categoría seleccionada */}
              {categoria === 'temperatura' && <>
                <option value="Celcius">Celsius</option>
                <option value="Kelvin">Kelvin</option>
                <option value="Fahrenheit">Fahrenheit</option>
              </>}
            </select>
          </div>
          
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="28px" fill="#000000">
            <path d="M160-280v-120h640v120H160Zm0-280v-120h640v120H160Z" />
          </svg>
          
          <div className="select">
            <input type="number" value={resultado} readOnly />
            <select value={unidad2} onChange={(e) => setUnidad2(e.target.value)}>
              <option value="">Seleccione aquí</option>
              {categoria === 'temperatura' && <>
                <option value="Celcius">Celsius</option>
                <option value="Kelvin">Kelvin</option>
                <option value="Fahrenheit">Fahrenheit</option>
              </>}
            </select>
          </div>
        </div>
        <button onClick={handleConvertir}>Convertir</button>
        <hr className="hrs" />
      </div>
      
      <div className="div4" id="tablas">
        {/* Aquí se pueden mostrar tablas de conversiones si se implementa */}
      </div>
    </div>
  );
};

export default Conversor;
