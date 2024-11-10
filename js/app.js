let temperatura = document.getElementById("temperatura");
let energia = document.getElementById("energia");
let longitud = document.getElementById("longitud");
let frecuencia = document.getElementById("frecuencia");
let tiempo = document.getElementById("tiempo");
let botonera= document.getElementById("botonera");
let lista = document.getElementById("lista");
let cerrar = document.getElementById("cerrar");
let div1 = document.getElementById("div1");
let logo= document.getElementById("logo");
let botones = [temperatura,energia,longitud,frecuencia,tiempo];
let select1 = document.getElementById("select1");
let select2 = document.getElementById("select2");
let inp1 = document.getElementById("inp1");
let inp2 = document.getElementById("inp2");

let tmp = ["Celcius","Kelvin","Fahrenheit",];
let ener = ["kilo Whats","Joule","Kilo Joule","Caloria-gramo","Kilo Caloria","Volt Hora","Kilo Volt Hora"]
let frec = ["Herz","Kiloherz","Megaherz","Gigaherz"]
let lon = ["Metro","Kilometro","Centimetro","Milimetro","Milla","Yarda","Pie","Pulgada"]
let timp = ["Micro segundo","Mili Segundo","Segundo", "Minuto", "Hora", "Dia", "Semana","Mes","Año"];
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

        }};


function cambiarUnidad(array) {
    select1.innerHTML = '<option value="">Seleccione aqui</option>';
    select2.innerHTML = '<option value="">Seleccione aqui</option>';
    for(let x=0; x<array.length; x++){
        let dat = document.createElement('option');
        dat.className = 'option';
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
//Rellenar tablas
function llenarTabla(conversiones,array){
    let contenedor = document.getElementById('tablas');
    contenedor.innerHTML = '';
    for (let categoria in conversiones) {
        let tabla = document.createElement('table');
                
        let encabezado = tabla.createTHead();
        let filaEncabezado = encabezado.insertRow();

        // Agregar encabezados

        let celdaEncabezado1 = filaEncabezado.insertCell();
        celdaEncabezado1.innerText = 'Unidad';
        celdaEncabezado1.classList.add('encabezado');
        let celdaEncabezado2 = filaEncabezado.insertCell();
        celdaEncabezado2.classList.add('encabezado');
        celdaEncabezado2.innerText = 'Conversión';

        // Agregar las conversiones
        for (let unidad in conversiones[categoria]) {
            for (let i = 0; i < array.length; i++) {
            if (unidad==array[i]) {
                    let fila = tabla.insertRow();
                    let celdaUnidad = fila.insertCell();
                    celdaUnidad.innerText = unidad;
                    let celdaConversion = fila.insertCell();
                    celdaConversion.innerText = conversiones[categoria][unidad].toString();
                }
            }

            // Añadir la tabla al contenedor
            if(tabla.rows.length>1){
            contenedor.appendChild(tabla);
            // contenedor.appendChild(document.createElement('br'));
            }
        }
    }

 }





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

botonera.addEventListener("click", function(){

        div1.style.display = 'flex';
        botonera.style.visibility = 'hidden';
        // botonera.style.display= 'none';
        logo.style.width = '100%';
        lista.style.display = 'flex';
    }
)

cerrar.addEventListener("click", function(){
    div1.style.display = 'none';
    botonera.style.visibility = 'visible';
    logo.style.width = '';
    lista.style.display = 'none';
})

temperatura.addEventListener("click", function(){
  
    cambiarUnidad(tmp);  
    // llenarTabla(tmp);
    colorUnidad(temperatura);
    llenarTabla(conversiones,tmp);tablas.style.margin = '';
  

    }
    );
energia.addEventListener("click", function(){
    cambiarUnidad(ener);
    llenarTabla(conversiones,ener);
    colorUnidad(energia);tablas.style.margin = '';

    }
    );
longitud.addEventListener("click", function(){
    cambiarUnidad(lon);
    llenarTabla(conversiones,lon);
    colorUnidad(longitud);tablas.style.margin = '';
}
    );
frecuencia.addEventListener("click", function(){
    cambiarUnidad(frec);
    llenarTabla(conversiones,frec);
    colorUnidad(frecuencia); tablas.style.gridArea = '';

    tablas.style.margin = '0px';
}
    );
tiempo.addEventListener("click", function(){
    cambiarUnidad(timp);
    llenarTabla(conversiones,timp);
    colorUnidad(tiempo); tablas.style.margin = '';
}
    );





function conversion(unidad1,unidad2,valor,conversiones) {

    if (conversiones[unidad1] && conversiones[unidad1][unidad2]) {
        let result = conversiones[unidad1][unidad2](valor);
        console.log(conversiones[unidad1][unidad2](valor))

        
        inp2.value = result.toFixed(6);
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
