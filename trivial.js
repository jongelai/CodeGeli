var trivial = [
  {
    question: "¿Cuántos países conforman la Unión Europea?",
    r1: "10",
    r2: "20",
    r3: "27",
    r4: "30",
    ok: "27",
  },
  {
    question: "¿Quién escribió la obra 'Cien años de soledad'?",
    r1: "Jorge Luis Borges",
    r2: "Gabriel García Márquez",
    r3: "Mario Vargas Llosa",
    r4: "Julio Cortázar",
    ok: "Gabriel García Márquez",
  },
  {
    question: "¿En qué año se descubrió América?",
    r1: "1492",
    r2: "1498",
    r3: "1500",
    r4: "1550",
    ok: "1492",
  },
  {
    question: "¿Quién fue el primer presidente de Estados Unidos?",
    r1: "George Washington",
    r2: "Thomas Jefferson",
    r3: "John Adams",
    r4: "Abraham Lincoln",
    ok: "George Washington",
  },
  {
    question: "¿Cuál es la capital de Australia?",
    r1: "Sydney",
    r2: "Melbourne",
    r3: "Brisbane",
    r4: "Canberra",
    ok: "Canberra",
  },
  {
    question: "¿Cuántos planetas hay en el sistema solar?",
    r1: "5",
    r2: "6",
    r3: "8",
    r4: "9",
    ok: "8",
  },
  {
    question: "¿Cuál es la capital de España?",
    r1: "Madrid",
    r2: "Sevilla",
    r3: "Barcelona",
    r4: "Toledo",
    ok: "Madrid",
  },
  {
    question: "¿Cuál es la moneda oficial de Francia?",
    r1: "Franco",
    r2: "Libra",
    r3: "Euro",
    r4: "Dolar",
    ok: "Euro",
  },
  {
    question: "¿Cuál es la moneda oficial de Japón?",
    r1: "Won",
    r2: "Yen",
    r3: "Dólar",
    r4: "Euro",
    ok: "Yen",
  },
  {
    question: "¿En qué año terminó la Segunda Guerra Mundial?",
    r1: "1940",
    r2: "1945",
    r3: "1950",
    r4: "1955",
    ok: "1945",
  },
  {
    question: "¿Cuántos colores tiene el arco iris?",
    r1: "6",
    r2: "7",
    r3: "12",
    r4: "5",
    ok: "7",
  },
  {
    question: "¿Cuál es la montaña mas alta del mundo?",
    r1: "Sinaí",
    r2: "K1",
    r3: "Teide",
    r4: "Everest",
    ok: "Everest",
  },
  {
    question: "¿Cuántos países tiene América?",
    r1: "12 países",
    r2: "24 países",
    r3: "35 países",
    r4: "42 países",
    ok: "35 países",
  },
  {
    question: "¿Quién escribió la obra 'Don Quijote de la Mancha'?",
    r1: "William Shakespeare",
    r2: "Miguel de Cervantes",
    r3: "Jorge Luis Borges",
    r4: "Gabriel García Márquez",
    ok: "Miguel de Cervantes",
  },
  {
    question: "¿Cuál es el río más largo del mundo?",
    r1: "Nilo",
    r2: "Amazonas",
    r3: "Yangtsé",
    r4: "Misisipi",
    ok: "Nilo",
  },
  {
    question: "¿Quién descubrió América?",
    r1: "Cristobal Colón",
    r2: "Amerigo Vespucci",
    r3: "Vasco Núñez de Balboa",
    r4: "Ferdinand Magellan",
    ok: "Cristobal Colón",
  },
  {
    question: "¿Quién pintó la Mona Lisa?",
    r1: "Leonardo da Vinci",
    r2: "Michelangelo",
    r3: "Rafael",
    r4: "Sandro Botticelli",
    ok: "Leonardo da Vinci",
  },
  {
    question: "¿Cuál es la capital de Francia?",
    r1: "París",
    r2: "Londres",
    r3: "Berlín",
    r4: "Roma",
    ok: "París",
  },
  {
    question: "¿Quién escribió la obra 'La Ilíada'?",
    r1: "Homero",
    r2: "Ovidio",
    r3: "Virgilio",
    r4: "Dante",
    ok: "Homero",
  },
  {
    question: "¿Cuál es la torre más alta del mundo?",
    r1: "Burj Khalifa",
    r2: "Shanghai Tower",
    r3: "Makkah Royal Clock Tower",
    r4: "Taipei 101",
    ok: "Burj Khalifa",
  },
];

var n = document.getElementById("n");
var correcto = document.getElementById("correcto");
var pregunta = document.getElementById("pregunta");
var finPreguntas = document.getElementById("finPreguntas");
var resp1 = document.getElementById("resp1");
var resp2 = document.getElementById("resp2");
var resp3 = document.getElementById("resp3");
var resp4 = document.getElementById("resp4");
var siguiente = document.getElementById("siguiente")
siguiente.style.display = 'none';
var comprovar = document.getElementById("comprovar")
comprovar.style.display = 'inline';
var pAl = 0;
var num = 1;
var acierto = 0;
var checkCont = 0;
preguntar();

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function cleanCheck() {
  chk1.checked = false;
  chk2.checked = false;
  chk3.checked = false;
  chk4.checked = false;
  finPreguntas.textContent = "";
  correcto.textContent = "";
}

function preguntar() {
  cleanCheck()
  comprovar.style.display = 'inline';
  n.textContent = num + "/ ";
  pregunta.textContent = trivial[pAl].question;
  resp1.textContent = trivial[pAl].r1;
  resp2.textContent = trivial[pAl].r2;
  resp3.textContent = trivial[pAl].r3;
  resp4.textContent = trivial[pAl].r4;

  if (pAl < trivial.length - 1) {
    pAl++;
    num++;
  }
  else {
    correcto.textContent = "No hay más preguntas";
    finPreguntas.textContent = `Has acertado: ${acierto} preguntas`;
  } siguiente.style.display = 'none';
}


function verificar() {
  var arrayOk = trivial[pAl - 1].ok;
  var respuestas = [resp1, resp2, resp3, resp4];
  var checkboxes = [chk1, chk2, chk3, chk4];
  finPreguntas.textContent = "";

  checkboxes.forEach((element) => {
    if (element.checked) {
      checkCont++
    }
  });
  if (checkCont > 1) finPreguntas.textContent = "solo puedes marcar uno";
  contCheck = 0;
  if ((checkCont = 1)) {
    for (var i = 0; i < respuestas.length; i++) {
      if (checkboxes[i].checked) {
        if (respuestas[i].textContent === arrayOk) {
          correcto.textContent = "  Correcto !!!";
          checkCont = 0;
          acierto++; 
          break;
        } else {
          correcto.textContent = "  Error,la respuesta correcta era:  "  + arrayOk
          checkCont = 0;
          break;
        }
      }
    }
  }
  comprovar.style.display = "none"
  siguiente.style.display = 'inline';
}
