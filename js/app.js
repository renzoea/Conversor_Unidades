let temperatura = document.getElementById("temperatura");
let energia = document.getElementById("energia");
let longitud = document.getElementById("longitud");
let frecuencia = document.getElementById("frecuencia");
let tiempo = document.getElementById("tiempo");
let slect1 = document.getElementById("select1");
let slect2 = document.getElementById("select2");
let tmp = ["celcius","Kelvin","Fahrenheit",];
let ener = ["kilo Whats","Joule","Kilo Joule","Caloria-gramo","Kilo Caloria","Volt Hora","Kilo Volt Hora"]
let frec = ["Herz","Kiloherz","Megaherz","Gigaherz"]
let lon = ["Metro","Kilometro","Cetrimetro","Milimitro","Milla","Yarda","Pie","Pulgada"]
let timp = ["Micro segundo","Mili Segundo","Segundo", "Minuto", "Hora", "Dia", "Semana","Mes","Año"]

temperatura.addEventListener("click", (event)=>{
    for (let x = 0; x < tmp.length; x++) {
        const dato = tmp[x];
        document.getElementById(slect1).innerHTML = tmp[x]
    }
})