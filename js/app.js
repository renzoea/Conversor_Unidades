let temperatura = document.getElementById("temperatura");
let energia = document.getElementById("energia");
let longitud = document.getElementById("longitud");
let frecuencia = document.getElementById("frecuencia");
let tiempo = document.getElementById("tiempo");
let select1 = document.getElementById("select1");
let select2 = document.getElementById("select2");
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
        select2.appendChild(dat)
    }
})

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
        select2.appendChild(dat)
    }
})

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
        select2.appendChild(dat)
    }
})

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
        select2.appendChild(dat)
    }
})

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
        select2.appendChild(dat)
    }
    
})