let temperatura = document.getElementById("temperatura");
let energia = document.getElementById("energia");
let longitud = document.getElementById("longitud");
let frecuencia = document.getElementById("frecuencia");
let tiempo = document.getElementById("tiempo");
let botones = [temperatura,energia,longitud,frecuencia,tiempo];
let select1 = document.getElementById("select1");
let select2 = document.getElementById("select2");
let inp1 = document.getElementById("inp1");
let inp2 = document.getElementById("inp2");
const conversiones = {
    'Celcius': {
        'Kelvin': (val) => val + 273.15,
        'Fahrenheit': (val) => (val * 9/5) + 32,
        'Celcius': (val) => val
    },
    'Kelvin': {
        'Celcius': (val) => val - 273.15,
        'Fahrenheit': (val) => (val - 273.15) * 9/5 + 32,
        'Kelvin': (val) => val
    },
    'Fahrenheit': {
        'Celcius': (val) => (val - 32) * 5/9,
        'Kelvin': (val) => (val - 32) * 5/9 + 273.15,
        'Fahrenheit': (val) => val
    }
    ///// Energia
    ,
    'kilo Whats': {
        'Joule': (val) => val * 3600000, // 1 kW = 3600000 Joules
        'Kilo Joule': (val) => val * 3600, // 1 kW = 3600 kJ
        'Caloria-gramo': (val) => val * 860421, // 1 kW = 860421 Cal/g
        'Kilo Caloria': (val) => val * 860.421, // 1 kW = 860.421 kcal
        'Volt Hora': (val) => val * 1000, // 1 kW = 1000 Vh
        'Kilo Volt Hora': (val) => val, // 1 kW = 1 kWh
        'kilo Whats': (val) => val // Conversión a sí mismo
    },
    'Joule': {
        'kilo Whats': (val) => val / 3600000, // 1 Joule = 1/3600000 kW
        'Kilo Joule': (val) => val / 1000, // 1 Joule = 0.001 kJ
        'Caloria-gramo': (val) => val / 4.184, // 1 Joule = 1/4.184 Cal/g
        'Kilo Caloria': (val) => val / 4184, // 1 Joule = 1/4184 kcal
        'Volt Hora': (val) => val / 3600, // 1 Joule = 1/3600 Vh
        'Kilo Volt Hora': (val) => val / 3600000, // 1 Joule = 1/3600000 kWh
        'Joule': (val) => val // Conversión a sí mismo
    },
    'Kilo Joule': {
        'kilo Whats': (val) => val / 3600, // 1 kJ = 1/3600 kW
        'Joule': (val) => val * 1000, // 1 kJ = 1000 Joules
        'Caloria-gramo': (val) => val * 239.006, // 1 kJ = 239.006 Cal/g
        'Kilo Caloria': (val) => val / 4.184, // 1 kJ = 1/4.184 kcal
        'Volt Hora': (val) => val / 3.6, // 1 kJ = 1/3.6 Vh
        'Kilo Volt Hora': (val) => val / 3600, // 1 kJ = 1/3600 kWh
        'Kilo Joule': (val) => val // Conversión a sí mismo
    },
    'Caloria-gramo': {
        'kilo Whats': (val) => val / 860421, // 1 Cal/g = 1/860421 kW
        'Joule': (val) => val * 4.184, // 1 Cal/g = 4.184 Joules
        'Kilo Joule': (val) => val / 239.006, // 1 Cal/g = 1/239.006 kJ
        'Kilo Caloria': (val) => val / 1000, // 1 Cal/g = 0.001 kcal
        'Volt Hora': (val) => val / 860.421, // 1 Cal/g = 1/860.421 Vh
        'Kilo Volt Hora': (val) => val / 860421, // 1 Cal/g = 1/860421 kWh
        'Caloria-gramo': (val) => val // Conversión a sí mismo
    },
    'Kilo Caloria': {
        'kilo Whats': (val) => val / 860.421, // 1 kcal = 1/860.421 kW
        'Joule': (val) => val * 4184, // 1 kcal = 4184 Joules
        'Kilo Joule': (val) => val * 4.184, // 1 kcal = 4.184 kJ
        'Caloria-gramo': (val) => val * 1000, // 1 kcal = 1000 Cal/g
        'Volt Hora': (val) => val / 0.860421, // 1 kcal = 1/0.860421 Vh
        'Kilo Volt Hora': (val) => val / 860.421, // 1 kcal = 1/860.421 kWh
        'Kilo Caloria': (val) => val // Conversión a sí mismo
    },
    'Volt Hora': {
        'kilo Whats': (val) => val / 1000, // 1 Vh = 1/1000 kW
        'Joule': (val) => val * 3600, // 1 Vh = 3600 Joules
        'Kilo Joule': (val) => val * 3.6, // 1 Vh = 3.6 kJ
        'Caloria-gramo': (val) => val * 860.421, // 1 Vh = 860.421 Cal/g
        'Kilo Caloria': (val) => val * 0.860421, // 1 Vh = 0.860421 kcal
        'Kilo Volt Hora': (val) => val / 1000, // 1 Vh = 1/1000 kWh
        'Volt Hora': (val) => val // Conversión a sí mismo
    },
    'Kilo Volt Hora': {
        'kilo Whats': (val) => val, // 1 kWh = 1 kW
        'Joule': (val) => val * 3600000, // 1 kWh = 3600000 Joules
        'Kilo Joule': (val) => val * 3600, // 1 kWh = 3600 kJ
        'Caloria-gramo': (val) => val * 860421, // 1 kWh = 860421 Cal/g
        'Kilo Caloria': (val) => val * 860.421, // 1 kWh = 860.421 kcal
        'Volt Hora': (val) => val * 1000, // 1 kWh = 1000 Vh
        'Kilo Volt Hora': (val) => val // Conversión a sí mismo
    }/////frecuencia
    ,
        'Herz': {
            'Kiloherz': (val) => val / 1000, // 1 Hz = 1/1000 kHz
            'Megaherz': (val) => val / 1e6, // 1 Hz = 1/1,000,000 MHz
            'Gigaherz': (val) => val / 1e9, // 1 Hz = 1/1,000,000,000 GHz
            'Herz': (val) => val // Conversión a sí mismo
        },
        'Kiloherz': {
            'Herz': (val) => val * 1000, // 1 kHz = 1000 Hz
            'Megaherz': (val) => val / 1000, // 1 kHz = 1/1000 MHz
            'Gigaherz': (val) => val / 1e6, // 1 kHz = 1/1,000,000 GHz
            'Kiloherz': (val) => val // Conversión a sí mismo
        },
        'Megaherz': {
            'Herz': (val) => val * 1e6, // 1 MHz = 1,000,000 Hz
            'Kiloherz': (val) => val * 1000, // 1 MHz = 1000 kHz
            'Gigaherz': (val) => val / 1000, // 1 MHz = 1/1000 GHz
            'Megaherz': (val) => val // Conversión a sí mismo
        },
        'Gigaherz': {
            'Herz': (val) => val * 1e9, // 1 GHz = 1,000,000,000 Hz
            'Kiloherz': (val) => val * 1e6, // 1 GHz = 1,000,000 kHz
            'Megaherz': (val) => val * 1000, // 1 GHz = 1000 MHz
            'Gigaherz': (val) => val // Conversión a sí mismo
        }//// Longitud
        ,
            'Metro': {
                'Kilometro': (val) => val / 1000, // 1 metro = 1/1000 km
                'Centimetro': (val) => val * 100, // 1 metro = 100 cm
                'Milimetro': (val) => val * 1000, // 1 metro = 1000 mm
                'Milla': (val) => val / 1609.34, // 1 metro = 1/1609.34 millas
                'Yarda': (val) => val * 1.09361, // 1 metro = 1.09361 yardas
                'Pie': (val) => val * 3.28084, // 1 metro = 3.28084 pies
                'Pulgada': (val) => val * 39.3701, // 1 metro = 39.3701 pulgadas
                'Metro': (val) => val // Conversión a sí mismo
            },
            'Kilometro': {
                'Metro': (val) => val * 1000, // 1 km = 1000 metros
                'Centimetro': (val) => val * 100000, // 1 km = 100,000 cm
                'Milimetro': (val) => val * 1e6, // 1 km = 1,000,000 mm
                'Milla': (val) => val / 1.60934, // 1 km = 1/1.60934 millas
                'Yarda': (val) => val * 1093.61, // 1 km = 1093.61 yardas
                'Pie': (val) => val * 3280.84, // 1 km = 3280.84 pies
                'Pulgada': (val) => val * 39370.1, // 1 km = 39370.1 pulgadas
                'Kilometro': (val) => val // Conversión a sí mismo
            },
            'Centimetro': {
                'Metro': (val) => val / 100, // 1 cm = 1/100 metros
                'Kilometro': (val) => val / 100000, // 1 cm = 1/100,000 km
                'Milimetro': (val) => val * 10, // 1 cm = 10 mm
                'Milla': (val) => val / 160934, // 1 cm = 1/160,934 millas
                'Yarda': (val) => val / 91.44, // 1 cm = 1/91.44 yardas
                'Pie': (val) => val / 30.48, // 1 cm = 1/30.48 pies
                'Pulgada': (val) => val / 2.54, // 1 cm = 1/2.54 pulgadas
                'Centimetro': (val) => val // Conversión a sí mismo
            },
            'Milimetro': {
                'Metro': (val) => val / 1000, // 1 mm = 1/1000 metros
                'Kilometro': (val) => val / 1e6, // 1 mm = 1/1,000,000 km
                'Centimetro': (val) => val / 10, // 1 mm = 1/10 cm
                'Milla': (val) => val / 1.609e6, // 1 mm = 1/1,609,344 millas
                'Yarda': (val) => val / 914.4, // 1 mm = 1/914.4 yardas
                'Pie': (val) => val / 304.8, // 1 mm = 1/304.8 pies
                'Pulgada': (val) => val / 25.4, // 1 mm = 1/25.4 pulgadas
                'Milimetro': (val) => val // Conversión a sí mismo
            },
            'Milla': {
                'Metro': (val) => val * 1609.34, // 1 milla = 1609.34 metros
                'Kilometro': (val) => val * 1.60934, // 1 milla = 1.60934 km
                'Centimetro': (val) => val * 160934, // 1 milla = 160,934 cm
                'Milimetro': (val) => val * 1.609e6, // 1 milla = 1,609,344 mm
                'Yarda': (val) => val * 1760, // 1 milla = 1760 yardas
                'Pie': (val) => val * 5280, // 1 milla = 5280 pies
                'Pulgada': (val) => val * 63360, // 1 milla = 63,360 pulgadas
                'Milla': (val) => val // Conversión a sí mismo
            },
            'Yarda': {
                'Metro': (val) => val / 1.09361, // 1 yarda = 1/1.09361 metros
                'Kilometro': (val) => val / 1093.61, // 1 yarda = 1/1093.61 km
                'Centimetro': (val) => val * 91.44, // 1 yarda = 91.44 cm
                'Milimetro': (val) => val * 914.4, // 1 yarda = 914.4 mm
                'Milla': (val) => val / 1760, // 1 yarda = 1/1760 millas
                'Pie': (val) => val * 3, // 1 yarda = 3 pies
                'Pulgada': (val) => val * 36, // 1 yarda = 36 pulgadas
                'Yarda': (val) => val // Conversión a sí mismo
            },
            'Pie': {
                'Metro': (val) => val / 3.28084, // 1 pie = 1/3.28084 metros
                'Kilometro': (val) => val / 3280.84, // 1 pie = 1/3280.84 km
                'Centimetro': (val) => val * 30.48, // 1 pie = 30.48 cm
                'Milimetro': (val) => val * 304.8, // 1 pie = 304.8 mm
                'Milla': (val) => val / 5280, // 1 pie = 1/5280 millas
                'Yarda': (val) => val / 3, // 1 pie = 1/3 yardas
                'Pulgada': (val) => val * 12, // 1 pie = 12 pulgadas
                'Pie': (val) => val // Conversión a sí mismo
            },
            'Pulgada': {
                'Metro': (val) => val / 39.3701, // 1 pulgada = 1/39.3701 metros
                'Kilometro': (val) => val / 39370.1, // 1 pulgada = 1/39,370.1 km
                'Centimetro': (val) => val * 2.54, // 1 pulgada = 2.54 cm
                'Milimetro': (val) => val * 25.4, // 1 pulgada = 25.4 mm
                'Milla': (val) => val / 63360, // 1 pulgada = 1/63,360 millas
                'Yarda': (val) => val / 36, // 1 pulgada = 1/36 yardas
                'Pie': (val) => val / 12, // 1 pulgada = 1/12 pies
                'Pulgada': (val) => val // Conversión a sí mismo
            }/// Tiempo
            ,
                'Microsegundo': {
                    'Milisegundo': (val) => val / 1000, // 1 microsegundo = 1/1000 milisegundos
                    'Segundo': (val) => val / 1e6, // 1 microsegundo = 1/1,000,000 segundos
                    'Minuto': (val) => val / 6e7, // 1 microsegundo = 1/60,000,000 minutos
                    'Hora': (val) => val / 3.6e9, // 1 microsegundo = 1/3,600,000,000 horas
                    'Día': (val) => val / 8.64e10, // 1 microsegundo = 1/86,400,000,000 días
                    'Semana': (val) => val / 6.048e11, // 1 microsegundo = 1/604,800,000,000 semanas
                    'Mes': (val) => val / 2.628e12, // 1 microsegundo = 1/2,628,000,000,000 meses
                    'Año': (val) => val / 3.154e13, // 1 microsegundo = 1/31,540,000,000,000 años
                    'Microsegundo': (val) => val // Conversión a sí mismo
                },
                'Milisegundo': {
                    'Microsegundo': (val) => val * 1000, // 1 milisegundo = 1000 microsegundos
                    'Segundo': (val) => val / 1000, // 1 milisegundo = 1/1000 segundos
                    'Minuto': (val) => val / 60000, // 1 milisegundo = 1/60,000 minutos
                    'Hora': (val) => val / 3.6e6, // 1 milisegundo = 1/3,600,000 horas
                    'Día': (val) => val / 8.64e7, // 1 milisegundo = 1/86,400,000 días
                    'Semana': (val) => val / 6.048e8, // 1 milisegundo = 1/604,800,000 semanas
                    'Mes': (val) => val / 2.628e9, // 1 milisegundo = 1/2,628,000,000 meses
                    'Año': (val) => val / 3.154e10, // 1 milisegundo = 1/31,540,000,000 años
                    'Milisegundo': (val) => val // Conversión a sí mismo
                },
                'Segundo': {
                    'Microsegundo': (val) => val * 1e6, // 1 segundo = 1,000,000 microsegundos
                    'Milisegundo': (val) => val * 1000, // 1 segundo = 1000 milisegundos
                    'Minuto': (val) => val / 60, // 1 segundo = 1/60 minutos
                    'Hora': (val) => val / 3600, // 1 segundo = 1/3600 horas
                    'Día': (val) => val / 86400, // 1 segundo = 1/86,400 días
                    'Semana': (val) => val / 604800, // 1 segundo = 1/604,800 semanas
                    'Mes': (val) => val / 2.628e6, // 1 segundo = 1/2,628,000 meses
                    'Año': (val) => val / 3.154e7, // 1 segundo = 1/31,540,000 años
                    'Segundo': (val) => val // Conversión a sí mismo
                },
                'Minuto': {
                    'Microsegundo': (val) => val * 6e7, // 1 minuto = 60,000,000 microsegundos
                    'Milisegundo': (val) => val * 60000, // 1 minuto = 60,000 milisegundos
                    'Segundo': (val) => val * 60, // 1 minuto = 60 segundos
                    'Hora': (val) => val / 60, // 1 minuto = 1/60 horas
                    'Día': (val) => val / 1440, // 1 minuto = 1/1440 días
                    'Semana': (val) => val / 10080, // 1 minuto = 1/10,080 semanas
                    'Mes': (val) => val / 43800, // 1 minuto = 1/43,800 meses
                    'Año': (val) => val / 525600, // 1 minuto = 1/525,600 años
                    'Minuto': (val) => val // Conversión a sí mismo
                },
                'Hora': {
                    'Microsegundo': (val) => val * 3.6e9, // 1 hora = 3,600,000,000 microsegundos
                    'Milisegundo': (val) => val * 3.6e6, // 1 hora = 3,600,000 milisegundos
                    'Segundo': (val) => val * 3600, // 1 hora = 3600 segundos
                    'Minuto': (val) => val * 60, // 1 hora = 60 minutos
                    'Día': (val) => val / 24, // 1 hora = 1/24 días
                    'Semana': (val) => val / 168, // 1 hora = 1/168 semanas
                    'Mes': (val) => val / 730, // 1 hora = 1/730 meses
                    'Año': (val) => val / 8760, // 1 hora = 1/8760 años
                    'Hora': (val) => val // Conversión a sí mismo
                },
                'Día': {
                    'Microsegundo': (val) => val * 8.64e10, // 1 día = 86,400,000,000 microsegundos
                    'Milisegundo': (val) => val * 8.64e7, // 1 día = 86,400,000 milisegundos
                    'Segundo': (val) => val * 86400, // 1 día = 86,400 segundos
                    'Minuto': (val) => val * 1440, // 1 día = 1440 minutos
                    'Hora': (val) => val * 24, // 1 día = 24 horas
                    'Semana': (val) => val / 7, // 1 día = 1/7 semanas
                    'Mes': (val) => val / 30.417, // 1 día = 1/30.417 meses
                    'Año': (val) => val / 365, // 1 día = 1/365 años
                    'Día': (val) => val // Conversión a sí mismo
                },
                'Semana': {
                    'Microsegundo': (val) => val * 6.048e11, // 1 semana = 604,800,000,000 microsegundos
                    'Milisegundo': (val) => val * 6.048e8, // 1 semana = 604,800,000 milisegundos
                    'Segundo': (val) => val * 604800, // 1 semana = 604,800 segundos
                    'Minuto': (val) => val * 10080, // 1 semana = 10,080 minutos
                    'Hora': (val) => val * 168, // 1 semana = 168 horas
                    'Día': (val) => val * 7, // 1 semana = 7 días
                    'Mes': (val) => val / 4.345, // 1 semana = 1/4.345 meses
                    'Año': (val) => val / 52.143, // 1 semana = 1/52.143 años
                    'Semana': (val) => val // Conversión a sí mismo
                },
                'Mes': {
                    'Microsegundo': (val) => val * 2.628e12, // 1 mes = 2,628,000,000,000 microsegundos
                    'Milisegundo': (val) => val * 2.628e9, // 1 mes = 2,628,000,000 milisegundos
                    'Segundo': (val) => val * 2.628e6, // 1 mes = 2,628,000 segundos
                    'Minuto': (val) => val * 43800, // 1 mes
            
        }}
let tmp = ["Celcius","Kelvin","Fahrenheit",];
let ener = ["kilo Whats","Joule","Kilo Joule","Caloria-gramo","Kilo Caloria","Volt Hora","Kilo Volt Hora"]
let frec = ["Herz","Kiloherz","Megaherz","Gigaherz"]
let lon = ["Metro","Kilometro","Cetrimetro","Milimitro","Milla","Yarda","Pie","Pulgada"]
let timp = ["Micro segundo","Mili Segundo","Segundo", "Minuto", "Hora", "Dia", "Semana","Mes","Año"]



function cambiarUnidad(array) {
    select1.innerHTML = '<option value="">Seleccione una unidad</option>';
    select2.innerHTML = '<option value="">Seleccione una unidad</option>'
    for(let x=0; x<array.length; x++){
        let dat = document.createElement('option');
        dat.value = array[x];
        dat.textContent = array[x];
        select1.appendChild(dat)
    }for(let x=0; x<array.length; x++){
        let dat = document.createElement('option');
        dat.value = array[x];
        dat.textContent = array[x];
        select2.appendChild(dat);
    }
}
// //Rellenar tablas 
// function llenarTabla(){
//     let tbody = document.getElementById('tabla').querySelector('tbody');
//     tbody.innerHTML = '';
//     encabezado.textContent = 'Unidades'; // Encabezado genérico

//     array.forEach(unit => {
//         let fila = document.createElement('tr');
//         let celda = document.createElement('td');
//         celda.textContent = unit;
//         fila.appendChild(celda);
//         tbody.appendChild(fila);
//     });
// } 


function colorUnidad(htmlelement){
    for(let x = 0; x < botones.length; x++){
        if(htmlelement == botones[x]){
           htmlelement.style.backgroundColor = 'rgb(235, 152, 49)';
           htmlelement.style.color = 'black';
           htmlelement.style.fontWeight = 'bold';
        }
        else{
            // Elimina los estilos en línea para restaurar el hover CSS
            botones[x].style.backgroundColor = '';
            botones[x].style.color = '';
            botones[x].style.fontWeight = '';
        }
    }
}



temperatura.addEventListener("click", function(){
    cambiarUnidad(tmp);
    // llenarTabla(tmp);
    colorUnidad(temperatura);
    }
    );
energia.addEventListener("click", function(){
    cambiarUnidad(ener);
    // llenarTabla(ener);
    colorUnidad(energia);
    }
    );
longitud.addEventListener("click", function(){
    cambiarUnidad(lon);
    // llenarTabla(lon);
    colorUnidad(longitud);    
}
    );
frecuencia.addEventListener("click", function(){
    cambiarUnidad(frec);
    // llenarTabla(frec);
    colorUnidad(frecuencia);    
}
    );
tiempo.addEventListener("click", function(){
    cambiarUnidad(timp);
    // llenarTabla(timp);
    colorUnidad(tiempo);    
}
    );


        
   

function conversion(unidad1,unidad2,valor,conversiones) {
  
    if (conversiones[unidad1] && conversiones[unidad1][unidad2]) {
        const result = conversiones[unidad1][unidad2](valor);
        console.log(conversiones[unidad1][unidad2](valor))
        inp2.value = result.toFixed(2); 
    } else {
        console.log("no funciona")
        inp2.value = ''; // Limpia la entrada si no es un número válido o no hay conversión disponible
    }



   
} 

inp1.addEventListener('input', function() {
  conversion(select1.value,select2.value,parseFloat(inp1.value),conversiones);
});

select1.addEventListener('change', function() {
    conversion(select1.value,select2.value,parseFloat(inp1.value),conversiones);
    });

select2.addEventListener('change', function() {
    conversion(select1.value,select2.value,parseFloat(inp1.value),conversiones);
    });

    // else if (select1.value === 'Fahrenheit' && select2.value === 'Fahrenheit' ) {
    //Rellenar tablas 
//     function llenarTabla(){
//         let tbody = document.getElementById('tabla').querySelector('tbody');
//         let encabezado = document.getElementById('tablaEncabezado');
//         tbody.innerHTML='';
//         let dato;
//         switch (categoria) {
//             case 'tmp':
//                 dato = tmp;
//                 encabezado.textContent = 'Unidades de Temperatura';
//                 break;
//             case 'ener':
//                 dato = ener;
//                 encabezado.textContent = 'Unidades de Energía';
//                 break;
//             case 'frec':
//                 dato = frec;
//                 encabezado.textContent = 'Unidades de Frecuencia';
//                 break;
//             case 'lon':
//                 dato = lon;
//                 encabezado.textContent = 'Unidades de Longitud';
//                 break;
//             case 'timp':
//                 dato = timp;
//                 encabezado.textContent = 'Unidades de Tiempo';
//                 break;
//             default:
//                 return; // Salir si no hay categoría válida
//         }
//         datos.forEach(dato => {
//             let fila = document.createElement('tr');
//             let celda = document.createElement('td');
//             celda.textContent = dato;
//             fila.appendChild(celda);
//             tbody.appendChild(fila);
//         });
// } 

