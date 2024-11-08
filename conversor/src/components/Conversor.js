import React from 'react'

const Conversor = () => {
  return (
    <main class="parent">
    <div class="div1 botones">
      <button class="btnSelect" id="temperatura">Temperatura</button>
      <button class="btnSelect" id="frecuencia">Frecuencia</button>
      <button class="btnSelect" id="longitud">Longitud</button>
      <button class="btnSelect" id="tiempo">Tiempo</button>
      <button class="btnSelect" id="energia">Energia</button>
    </div>
    <div class="div2"></div>

    <div class="div3"><hr class="hrs"/>
      <div class="conversor">
      <div class="select">
        <input type="number" id="inp1" />
        <select name="Selecion" id="select1">
          <option value="">Seleccione una unidad</option>
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
        </select>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        width="28px"
        fill="#000000"
      >
        <path d="M160-280v-120h640v120H160Zm0-280v-120h640v120H160Z" />
      </svg>
      <div class="select">
        <input type="number" id="inp2" />
        <select name="Selecion1" id="select2">
          <option value="">Seleccione una unidad</option>
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
        </select>
      </div></div><hr class="hrs"/>
    </div>
    
    <div class="div4"></div>
  </main>
  )
}

export default Conversor

