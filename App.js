import './App.css';
import img from './img/M.png';

let players = [
  ["11111111X", "XXXX", "XXXX", "699874123", "XXXX@aol.com", "25/05/2000", "XX1111111111111111111111", "P"],
  ["11111111X", "XXXX", "XXXX", "655111456", "XXXX@yahoo.jp", "27/06/1990", "XX1111111111111111111111", "P"],
  ["11111111X", "XXXX", "XXXX", "678982654", "XXXX@gmail.com", "28/03/1985", "XX1111111111111111111111", "B"],
  ["11111111X", "XXXX", "XXXX", "658214753", "XXXX@outlook.com", "12/07/1996", "XX1111111111111111111111", "B"]
];

//Función para verificar la edad.
function isValidPlayer(pAnys){

  // Logica para añadir el jugador
  let dataNai = document.getElementById("DatNa").value;
  let aDate = dataNai.split("/");

  //JavaScript counts months desde 0 a 11 (1 a 12)
  let bornDate = new Date(aDate[2], aDate[1]-1, aDate[0]);

  let currentDate = new Date();
  let age = diffAnys(currentDate, bornDate);

  return (age>=pAnys);

}
//Funcion para pintar los jugadores dinamicamente
function createListPlayers(pJugadores, pContenedor, pTipo){

  for(let i=0; i < pJugadores.length; i++){
    let jugador = pJugadores[i];

    if(pTipo===jugador[7]){
      pContenedor.innerHTML+="<div class='refjug'>" +
      "<img class='imgu' src=" + img + "> <div class='infi'>" +
      "<p>" + jugador[1] + "<span> " + jugador[2] +"</span> </p>" +
      "<p>" + jugador[4] +"</p> </div> </div> <br>";
    }
  }
}

//Función para comporbar los datos del formulario.
function checkform(){
  // Recuperar los campos del formulario.
  let camp_nom = document.getElementById("nom");
  let camp_llinatge = document.getElementById("llinatge");
  let camp_nif = document.getElementById("NIF");
  let camp_DataNaixament = document.getElementById("DatNa");
  let camp_telefon = document.getElementById("telefon");
  let camp_email = document.getElementById("email");
  let camp_quota = document.getElementById("quota");
  let camp_typ = document.getElementById("typeplayer");
  //Para recuperar los valores de los campos necesarios.
  let txtData = camp_DataNaixament.value;
  let txtTel = camp_telefon.value;
  let txtEmail = camp_email.value;

  //Para comprobar los campos.
  if( !validaData(txtData) || txtData===""){
    alert("Fecha erroneo");
    return false;
  }
  if( !validaTelefon(txtTel) || txtTel===""){
    alert("Telefono erroneo");
    return false;
  }
  if( !validaEmail(txtEmail) || txtEmail===""){
    alert("EMAIL erroneo");
    return false;
  }

  //Función de verificación obligada
  if(!isValidPlayer(16) && camp_typ.value === "Begginer"){
    alert("El jugador que estas inscribiendo, es menor de 16 años.");
    return false;
  }
  if(!isValidPlayer(18) && camp_typ.value === "Professional"){
    alert("El jugador que estas inscribiendo, es menor de 18 años.");
    return false;
  }

  //Función para que no se repita el mismo jugador en la lista del torneo. Usando el campo DNI/NIF/
  for(let i = 0; i < players.length; i++){
    if (camp_nif.value === players[i][0]){
      alert("El jugador que estas inscribiendo, ya esta en la lista del torneo. Vuelvelo a intentar.");
      return false;
    }
  }

  //Para comprobar los campos obligatorios.
  if(camp_nom.value !== "" && camp_llinatge.value !== "" && camp_nif.value !== ""  && camp_quota.value !== ""){

    //Principiantes.
    if(camp_typ.value === "Begginer"){
        players.push([camp_nif.value, camp_nom.value, camp_llinatge.value, camp_telefon.value, camp_email.value, camp_DataNaixament.value, camp_quota.value, "Begginer"]);
        let containerPlayers = document.getElementById("gridB");

        createListPlayers(players, containerPlayers, "Begginer");
    //Profesionales
    } else {
      players.push([camp_nif.value, camp_nom.value, camp_llinatge.value, camp_telefon.value, camp_email.value, camp_DataNaixament.value, camp_quota.value, "Professional"]);
      let containerPlayersPro = document.getElementById("gridP");

      createListPlayers(players, containerPlayersPro, "Professional");
    }
  }
  else{
    alert("Faltan datos obligatorios para rellenar. Vuelve a revisar");
  }
}

function diffAnys(date1, date2, format="A"){
  if (date1===undefined || date2===undefined) return -1;
  var diff = Math.floor(date1.getTime() - date2.getTime());
  var day = 1000 * 60 * 60 * 24;

  var days = Math.floor(diff/day);
  var months = Math.floor(days/31);
  var years = Math.floor(months/12);

  switch(format) {
    case "A":
      return years;
    case "M":
      return months;
    default:
      return days;
  }

}

function validaEmail(email){
  const regex=/^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+.)+[A-Z]{2,4}$/i;
  return regex.test(email);
}

function validaTelefon(telefon){
  const regex=/^[0-9]{2,3}-? ?[0-9]{6,7}$/;
  return regex.test(telefon);
}


function validaData(date, format="dd/mm/aaaa"){
  let regex=/^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/;
  if (format==="dd-mm-aaaa")
    //eslint-disable-next-line
    regex=/^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/;
  return regex.test(date);
}

window.onload=function(){
  console.log("Cargado correctamente");
  //alert("Cargado correctamente");

  //div contenedor de los jugadores
  let containerPlayers= document.getElementById("gridB");

  //La llamada a la funcion
  createListPlayers(players, containerPlayers, "B");

  let containerPlayersPro= document.getElementById("gridP");
  createListPlayers(players, containerPlayersPro, "P");


}

function App() {
  return (
    <div className="App">
      <div className="grid">
        <div className="gridT1">
          <h2>Registre de jugadors</h2>
        </div>
        <div className="gridForm">
          <p>Dades personals</p>
          <form className="" action="frm_players.html" method="post">
            <div className="raw1">
              <label>nom </label>
              <input type="text" id="nom" name="nom" values="nom" />
              <label>llinatge </label>
              <input type="text" id="llinatge" name="llinatge" values="llinatge" />
              <label>DNI </label>
              <input type="text" id="NIF" name="NIF" values="NIF" />
              <label>Data naixement </label>
              <input type="text" id="DatNa" name="DatNa" values="DatNa" />
            </div>

            <div className="raw2">
              <label>telefon </label>
              <input type="text" id="telefon" name="telefon" values="telefon" />
              <label>email </label>
              <input type="text" id="email" name="email" values="email" />
              <label>Quota </label>
              <input type="text" id="quota" name="quota" values="quota" />
              <label>tipus de jugador </label>
              <select name="typeplayer" id="typeplayer" values="typeplayer">
                <option id="Begginer" value="Begginer">Begginer</option>
                <option id="Professional" value="Professional">Professional</option>
              </select>
            </div>
            <button type="button" id="boton" className="button" name="button" onClick={checkform}>participar</button>
          </form>
        </div>

        <div className="gridT2">
          <h2>Llista de jugadors</h2>
        </div>
        
        
        <div id="prin" className="gridL">
          <h3>Principals</h3>
        </div>

        <div className="gridB" id="gridB">
        </div>

        <div id="pro" className="gridR">
          <h3>Professionals</h3>
        </div>

        <div className="gridP" id="gridP">
        </div>

        <p className="gridTF">Diseñado por Joanutsu - 2019 (Ver. React - 2021)</p>
      </div>
    </div>
  );
}

export default App;
