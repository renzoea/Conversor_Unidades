let temperatura = document.getElementById("temperatura");
let energia = document.getElementById("energia");
let longitud = document.getElementById("longitud");
let frecuencia = document.getElementById("frecuencia");
let tiempo = document.getElementById("tiempo");
let select1 = document.getElementById("select1");
let select2 = document.getElementById("select2");
let inp1 = document.getElementById("inp1");
let inp2 = document.getElementById("inp2");
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


temperatura.addEventListener("click", function(){
    cambiarUnidad(tmp);}
    );
energia.addEventListener("click", function(){
    cambiarUnidad(ener);}
    );
longitud.addEventListener("click", function(){
    cambiarUnidad(lon);}
    );
frecuencia.addEventListener("click", function(){
    cambiarUnidad(frec);}
    );
tiempo.addEventListener("click", function(){
    cambiarUnidad(timp);}
    );




  // if ((select1.value='celcius') && (select2.value='Kelvin')) {
    //     inp1.onkeypress = function(){
    //         let num=0;
    //         num=inp1 + 273.15;
    //         inp2.value= isNaN(num);
    //         inp2.innerHTML=num;
    //     }
    // }

inp1.addEventListener('input', function() {
    if (select1.value === 'Celcius' && select2.value === 'Kelvin' ) {
        const celsius = parseFloat(inp1.value);
        if (!isNaN(celsius)) {
            const kelvin = celsius + 273.15;
            inp2.value = kelvin.toFixed(2); 
        } else {
            inp2.value = ''; 
        }
    }else if (select1.value === 'Celcius' && select2.value === 'Fahrenheit' ) {
        const celsius = parseFloat(inp1.value);
        if (!isNaN(celsius)) {
            const kelvin = (celsius / 1.8)+32;
            inp2.value = kelvin.toFixed(2); 
        } else {
            inp2.value = ''; 
        }
    }else if(select1.value == 'Celcius' && select2.value == 'Celcius'){
        const celsius = parseFloat(inp1.value);
        if (!isNaN(celsius)) {
            const kelvin = celsius;
            inp2.value = kelvin.toFixed(2); 
            console.log(kelvin);    
        } else {
            inp2.value = ''; 
        }
    }else if (select1.value === 'Kelvin' && select2.value === 'Celcius' ) {
        const celsius = parseFloat(inp1.value);
        if (!isNaN(celsius)) {
            const kelvin = celsius - 273.15;
            inp2.value = kelvin.toFixed(2); 
        } else {
            inp2.value = ''; 
        }
    }else if (select1.value === 'Kelvin' && select2.value === 'Fahrenheit' ) {
        const celsius = parseFloat(inp1.value);
        if (!isNaN(celsius)) {
            const kelvin = (((celsius + 273.15)*1.8)+32);
            inp2.value = kelvin.toFixed(2); 
        } else {
            inp2.value = ''; 
        }
    }else if (select1.value === 'Kelvin' && select2.value === 'Kelvin' ) {
        const celsius = parseFloat(inp1.value);
        if (!isNaN(celsius)) {
            const kelvin = celsius;
            inp2.value = kelvin.toFixed(2); 
        } else {
            inp2.value = ''; 
        }}else if (select1.value === 'Fahrenheit' && select2.value === 'Celcius' ) {
            const celsius = parseFloat(inp1.value);
            if (!isNaN(celsius)) {
                const kelvin = ((celsius -32)*0.56);
                inp2.value = kelvin.toFixed(2); 
            } else {
                inp2.value = ''; 
            }
        }else if (select1.value === 'Fahrenheit' && select2.value === 'Kelvin' ) {
            const celsius = parseFloat(inp1.value);
            if (!isNaN(celsius)) {
                const kelvin = ((celsius -32)*0.56)+273.15;
                inp2.value = kelvin.toFixed(2); 
            } else {
                inp2.value = ''; 
            }
        }
    });
    // else if (select1.value === 'Fahrenheit' && select2.value === 'Fahrenheit' ) {

