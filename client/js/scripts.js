let nom = "Pepe";
let edat = 30;

// array global de nuestras cartas
let cartesSimulades = [
  { id: 1, remitent: "Maria", contingut: "Hola, com estàs? T'escric des del passat." },
  { id: 2, remitent: "Joan", contingut: "Avui he vist un carter misteriós." },
  { id: 3, remitent: "Laia", contingut: "Recorda que el temps és relatiu." }
];
// contador de id's dinámico para añadir los id's sin problemas de duplicados
let contadorId = cartesSimulades.length + 1

// función saludar que envia un mensaje de alerta
function saluda() {
  alert("Hola, mister");
}

//function inicializar para poner en marcha nuestras constantes
function inicializar() {
  //buscamaos el botón saludar en el HTML y lo guardamos en una constante
  const boto = document.getElementById("btnSaluda");
  //envolvemos los elementos con condiciones para proteger el código, si el botón existe le asigna un EventListener
  if (boto) boto.addEventListener("click", saluda);

  //buscamos el elemento titol mediante su selector CSS
  const titol = document.querySelector("#titolPrincipal");
  //comprobamos que el titulo existe
  if (titol) {
    // sobreescribimos el texto dentro del H1 por el que queramos añadir
    titol.textContent = "📮 El Cartero Invisible – Setmana 2";
    // Le añadimos o actualizamos su atributo HTML
    titol.setAttribute("data-role", "banner");
  }

  // buscamos la clase info
  const info = document.querySelector(".info");
  // comprobamos que existe y le aplicamos un estilo de color
  if (info) info.style.color = "#2c3e50";

  // Botón para añadir carta de prueba, lo buscamos por su id btnAfegir
  const btnAfegir = document.querySelector("#btnAfegir");
  // comprobamos que exista
  if (btnAfegir) {
    // Añadimos una función de flecha que al hacer click nos añada una carta dinámica al array
    btnAfegir.addEventListener("click", () => {
      cartesSimulades.push({
        // creamos el id utilizando nuestro contador
        id: contadorId++,
        remitent: "Carter " + (cartesSimulades.length + 1),
        contingut: "Aquesta carta s'acaba de crear dinàmicament!"
      });
      // llamamos a la función renderizar cartas
      renderitzarCartes(cartesSimulades);
    });
  }

  // obtenemos la referencia al formulario
  const form = document.querySelector("#formCarta");
  // comprobamos si existe
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // detiene el envío y recarga de la página
      validarCarta();         // ejecuta la validación y añade la carta
    });
  }

  // obtenenemos la referencia al contenedor e implementamos delegación de eventos
  const contenidor = document.querySelector("#contenidorCartes");
  if (contenidor) {
    contenidor.addEventListener("click", (event) => {
      // Si el elemento clicado es un botón de eliminar
      if (event.target.classList.contains("btn-eliminar")) {
        const id = event.target.dataset.id; // Obtenemos el dataset.id del botón
        eliminarCarta(id); // llamamos a la función eliminar carta y le pasamos la constante
      }
    });
  }

  // Renderizado inicial
  renderitzarCartes(cartesSimulades);
}

function renderitzarCartes(cartes) {
  // seleccionamos nuestro contenedor de cartas por ID
  const contenidor = document.querySelector("#contenidorCartes");
  // si el contenidor no existe detiene la ejecución
  if (!contenidor) return;

  contenidor.innerHTML = ""; // 1. Buidem el taulell

  cartes.forEach(carta => {
    // 2. Fabriquem la carta
    const divCarta = document.createElement("div");
    divCarta.className = "carta";

    const titol = document.createElement("h3");
    titol.textContent = `De: ${carta.remitent}`;

    const paragraf = document.createElement("p");
    paragraf.textContent = carta.contingut;

    const idSpan = document.createElement("span");
    idSpan.textContent = ` #${carta.id}`;
    idSpan.setAttribute("data-id", carta.id);

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.dataset.id = carta.id;

    // 3. Muntem l'estructura
    divCarta.appendChild(titol);
    divCarta.appendChild(paragraf);
    divCarta.appendChild(idSpan);
    divCarta.appendChild(btnEliminar);

    // 4. Pengem la carta al taulell
    contenidor.appendChild(divCarta);
  });
}

function validarCarta() {
  // Buscamos los cuadros de texto del HTML por su ID
  const remitentInput = document.querySelector("#remitent");
  const destinatariInput = document.querySelector("#destinatari");
  const contingutInput = document.querySelector("#contingut");

  // Leemos el texto escrito (.value) y le quitamos espacios sobrantes al inicio/final (.trim()
  const remitent = remitentInput.value.trim();
  const destinatari = destinatariInput.value.trim();
  const contingut = contingutInput.value.trim();
  // condición si los campos no están vacíos añadimos el contenido en una nueva carta al array cartesSimulades
  if (remitent !== "" && destinatari !== "" && contingut !== "") {
    cartesSimulades.push({
      id: contadorId++,
      remitent: remitent,
      destinatari: destinatari,
      contingut: contingut
    });

    renderitzarCartes(cartesSimulades);

    // Limpiar los campos del formulario tras añadir la carta
    remitentInput.value = "";
    destinatariInput.value = "";
    contingutInput.value = "";
    const personatgeInput = document.querySelector("#personatge");
    if (personatgeInput) personatgeInput.value = "";
  } else {
    alert("Ningún campo puede estar vacío");
    return;
  }
}

function eliminarCarta(id) { 
  const idNumero = Number(id); // creamos una constante y le pasamos el ID como número
  cartesSimulades = cartesSimulades.filter(carta => carta.id !== idNumero); // actualizamos nuestro array filtrando las cartas para eliminar las que no queremos
  renderitzarCartes(cartesSimulades); // llamamos a la función renderizar para actualizar la página
}

// Escuchador para inicializar cuando el DOM esté listo
if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", inicializar);
}

export { renderitzarCartes };