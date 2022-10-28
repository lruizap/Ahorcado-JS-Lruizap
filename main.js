const divGame = document.getElementById("Game");

let ArrayDash = [];
let ArrayWord = [];
let cant_error = 0;
let cant_success = 0;

StartGame();

function StartGame() {
  divGame.innerHTML = ``;
  ArrayDash = [];
  ArrayWord = [];
  cant_error = 0;
  cant_success = 0;

  divGame.innerHTML = `<label for="Juego" id="labelJuego">
      <p>Dinos la palabra para el jugador</p>
      <input type="password" placeholder="Introduzca su palabra" id="Word" required onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122))" />
      <button onclick="ValidateAhorcado()" id="Start">¡Comienza el Juego!</button>
    </label>`;
}

function ValidateAhorcado() {
  const word = document.getElementById("Word").value;
  if (word === "") {
    alert("El campo esta vacío");
    return;
  }
  Ahorcado(word);
}

function Ahorcado(word) {
  word = word.trim().toLowerCase();
  PrintAhorcado();
  PrintDash(word);
  AddEvent();
}

function PrintAhorcado() {
  divGame.innerHTML = `<div id="DashGame">
        <div id="Game">
            <p id="Dash"></p>
            <div id="keyboard-cont">
                <div class="first-row">
                    <button class="keyboard-button">q</button>
                    <button class="keyboard-button">w</button>
                    <button class="keyboard-button">e</button>
                    <button class="keyboard-button">r</button>
                    <button class="keyboard-button">t</button>
                    <button class="keyboard-button">y</button>
                    <button class="keyboard-button">u</button>
                    <button class="keyboard-button">i</button>
                    <button class="keyboard-button">o</button>
                    <button class="keyboard-button">p</button>
                </div>
                <div class="second-row">
                    <button class="keyboard-button">a</button>
                    <button class="keyboard-button">s</button>
                    <button class="keyboard-button">d</button>
                    <button class="keyboard-button">f</button>
                    <button class="keyboard-button">g</button>
                    <button class="keyboard-button">h</button>
                    <button class="keyboard-button">j</button>
                    <button class="keyboard-button">k</button>
                    <button class="keyboard-button">l</button>
                </div>
                <div class="third-row">
                    <button class="keyboard-button">z</button>
                    <button class="keyboard-button">x</button>
                    <button class="keyboard-button">c</button>
                    <button class="keyboard-button">v</button>
                    <button class="keyboard-button">b</button>
                    <button class="keyboard-button">n</button>
                    <button class="keyboard-button">m</button>
                </div>
            </div>
        </div>
        <div id="img">
            <img src="./img/Ahorcado/ahorcado01.png" alt="" width="580" height="573" id="imgGame">
        </div>
    </div>`;
}

function PrintDash(word) {
  for (let i = 0; i < word.length; i++) {
    document.getElementById("Dash").textContent += `_`;
    ArrayWord.push(word[i]);
  }

  ArrayDash = Array.from(
    document.getElementById("Dash").textContent.trim().split("")
  );
}

function AddEvent() {
  const btn_letters = document.querySelectorAll("#keyboard-cont div button");
  for (let i = 0; i < btn_letters.length; i++) {
    btn_letters[i].addEventListener("click", click_letters);
  }
}

function click_letters(event) {
  const button = event.target;
  button.disabled = true;

  const letters = button.innerHTML;

  let succes = false;

  for (let i = 0; i < ArrayWord.length; i++) {
    if (letters == ArrayWord[i]) {
      succes = true;
      cant_success++;
      ReplaceDash(letters);
    }
  }

  LettersColor(succes, button);
  ErrorImage(succes);
}

function ReplaceDash(letters) {
  for (i = 0; i < ArrayWord.length; i++) {
    if (ArrayWord[i] == letters) {
      ArrayDash[i] = letters.toString().toUpperCase();
    }
  }
  document.getElementById("Dash").textContent = ArrayDash.toString().replaceAll(
    ",",
    ""
  );
}

function LettersColor(succes, button) {
  if (succes == true) {
    button.style.background = "green";
  } else {
    button.style.background = "red";
  }
}

function ErrorImage(succes) {
  const image = document.getElementById("imgGame");

  if (succes == false) {
    cant_error++;
    const errorImage = `./img/Ahorcado/ahorcado0${cant_error + 1}.png`;
    image.src = errorImage;
  }

  if (cant_error == 6) {
    GameOver();
  } else if (cant_success == ArrayWord.length) {
    image.src = `./img/Ahorcado/Ganaste.png`;
    GameOver();
  }
}

function GameOver() {
  for (let i = 0; i < ArrayWord.length; i++) {
    ReplaceDash(ArrayWord[i]);
  }

  const btn_letters = document.querySelectorAll("#keyboard-cont div button");
  for (let i = 0; i < btn_letters.length; i++) {
    btn_letters[i].disabled = true;
  }

  ReturnStart();
}

function ReturnStart() {
  const Game = document.getElementById("Game");
  Game.innerHTML += `<p>Se ha acabado el Juego\n¿Quiéres volver a Jugar?</p>
  <button onclick="StartGame()" id="YES">¡Comienza el Juego!</button>
  <button onclick="window.close()" id="NO">¡Nos vemos pronto!</button>`;
}
