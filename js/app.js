let temperatura = document.getElementById("temperatura");
let energia = document.getElementById("energia");
let longitud = document.getElementById("longitud");
let frecuencia = document.getElementById("frecuencia");
let tiempo = document.getElementById("tiempo");
let select1 = document.getElementById("select1");
let select2 = document.getElementById("select2");
let inp1 = document.getElementById("inp1");
let inp2 = document.getElementById("inp2");
let tmp = ["celcius","Kelvin","Fahrenheit",];
let ener = ["kilo Whats","Joule","Kilo Joule","Caloria-gramo","Kilo Caloria","Volt Hora","Kilo Volt Hora"]
let frec = ["Herz","Kiloherz","Megaherz","Gigaherz"]
let lon = ["Metro","Kilometro","Cetrimetro","Milimitro","Milla","Yarda","Pie","Pulgada"]
let timp = ["Micro segundo","Mili Segundo","Segundo", "Minuto", "Hora", "Dia", "Semana","Mes","Año"]


temperatura.addEventListener("click", function(){
    select1.innerHTML = '<option value="">Seleccione una unidad</option>';
    select2.innerHTML = '<option value="">Seleccione una unidad</option>'
    for(let x=0; x<tmp.length; x++){
        let dat = document.createElement('option');
        dat.value = tmp[x];
        dat.textContent = tmp[x];
        select1.appendChild(dat)
    }for(let x=0; x<tmp.length; x++){
        let dat = document.createElement('option');
        dat.value = tmp[x];
        dat.textContent = tmp[x];
        select2.appendChild(dat);
    }
    // if ((select1.value='celcius') && (select2.value='Kelvin')) {
    //     inp1.onkeypress = function(){
    //         let num=0;
    //         num=inp1 + 273.15;
    //         inp2.value= isNaN(num);
    //         inp2.innerHTML=num;
    //     }
    // }
});
inp1.addEventListener('input', function() {
    if (select1.value === 'celcius' && select2.value === 'Kelvin' ) {
        const celsius = parseFloat(inp1.value);
        if (!isNaN(celsius)) {
            const kelvin = celsius + 273.15;
            inp2.value = kelvin.toFixed(2); 
        } else {
            inp2.value = ''; 
        }
    }else if (select1.value === 'celcius' && select2.value === 'Fahrenheit' ) {
        const celsius = parseFloat(inp1.value);
        if (!isNaN(celsius)) {
            const kelvin = (celsius / 1.8)+32;
            inp2.value = kelvin.toFixed(2); 
        } else {
            inp2.value = ''; 
        }
    }else if(select1.value == 'celcius' && select2.value == 'celcius'){
        const celsius = parseFloat(inp1.value);
        if (!isNaN(celsius)) {
            const kelvin = celsius;
            inp2.value = kelvin.toFixed(2); 
            console.log(kelvin);    
        } else {
            inp2.value = ''; 
        }
    }else if (select1.value === 'Kelvin' && select2.value === 'celcius' ) {
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
        }}else if (select1.value === 'Fahrenheit' && select2.value === 'celcius' ) {
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

energia.addEventListener("click", function(){
    select1.innerHTML = '<option value="">Seleccione una unidad</option>';
    select2.innerHTML = '<option value="">Seleccione una unidad</option>'
    for(let x=0; x<ener.length; x++){
        let dat = document.createElement('option');
        dat.value = ener[x];
        dat.textContent = ener[x];
        select1.appendChild(dat)
    }for(let x=0; x<ener.length; x++){
        let dat = document.createElement('option');
        dat.value = ener[x];
        dat.textContent = ener[x];
        select2.appendChild(dat);
    }
});

frecuencia.addEventListener("click", function(){
    select1.innerHTML = '<option value="">Seleccione una unidad</option>';
    select2.innerHTML = '<option value="">Seleccione una unidad</option>'
    for(let x=0; x<frec.length; x++){
        let dat = document.createElement('option');
        dat.value = frec[x];
        dat.textContent = frec[x];
        select1.appendChild(dat)
    }for(let x=0; x<tmp.length; x++){
        let dat = document.createElement('option');
        dat.value = tmp[x];
        dat.textContent = tmp[x];
        select2.appendChild(dat);
    }
});

tiempo.addEventListener("click", function(){
    select1.innerHTML = '<option value="">Seleccione una unidad</option>';
    select2.innerHTML = '<option value="">Seleccione una unidad</option>'
    for(let x=0; x<timp.length; x++){
        let dat = document.createElement('option');
        dat.value = timp[x];
        dat.textContent = timp[x];
        select1.appendChild(dat)
    }for(let x=0; x<timp.length; x++){
        let dat = document.createElement('option');
        dat.value = timp[x];
        dat.textContent = timp[x];
        select2.appendChild(dat);
    }
});

longitud.addEventListener("click", function(){
    select1.innerHTML = '<option value="">Seleccione una unidad</option>';
    select2.innerHTML = '<option value="">Seleccione una unidad</option>'
    for(let x=0; x<lon.length; x++){
        let dat = document.createElement('option');
        dat.value = lon[x];
        dat.textContent = lon[x];
        select1.appendChild(dat)
    }for(let x=0; x<lon.length; x++){
        let dat = document.createElement('option');
        dat.value = lon[x];
        dat.textContent = lon[x];
        select2.appendChild(dat);
    }
    
});