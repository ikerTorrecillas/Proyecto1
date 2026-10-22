let nom = "Pepe";
let edat = 30;

// contador de id's dinámico para añadir los id's sin problemas de duplicados
// let contadorId = cartesSimulades.length + 1

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
    btnAfegir.addEventListener("click", async () => {
      await fetch('http://127.0.0.1:8000/cartas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          remitent: "Carter Anònim",
          destinatari: "alguien posiblemente",
          contingut: "Aquesta carta s'acaba de crear dinàmicament!"
        })
      });
      // llamamos a la función renderizar cartas
      carregarCartes();
    });
  }

  // obtenemos la referencia al formulario
  const form = document.querySelector("#formCarta");
  // comprobamos si existe
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // detiene el envío
      crearCarta();         // ejecuta la validación y añade la carta
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

  // Buscamos el botón y la tabla en el HTML usando sus IDs
  const btnMostrarTaula = document.querySelector("#btnMostrarTaula");
  const taulaCartes = document.querySelector("#taulaCartes");

  // Nos aseguramos de que ambos elementos existan en la página antes de continuar para evitar errores en consola
  if (btnMostrarTaula && taulaCartes) {

    // Escuchamos el clic del usuario sobre el botón
    btnMostrarTaula.addEventListener("click", () => {

      // Si la tabla está escondida (display: none), la mostramos usando su estilo de tabla
      if (taulaCartes.style.display === "none") {
        taulaCartes.style.display = "table";
        btnMostrarTaula.textContent = "Ocultar taula"; // Actualizamos el texto del botón para ofrecer la acción contraria
      }
      // Si la tabla ya se está viendo, la volvemos a ocultar
      else {
        taulaCartes.style.display = "none";
        btnMostrarTaula.textContent = "Mostrar taula"; // Volvemos a cambiar el texto del botón
      }
    });
  }

  // Buscamos el cuerpo de la tabla para la delegación de eventos
  const cosTaula = document.querySelector("#cosTaula");

  // Si la tabla existe, le añadimos un escuchador de clics
  if (cosTaula) {
    cosTaula.addEventListener("click", (event) => {
      // Comprobamos si el elemento clicado tiene la clase del botón de eliminar
      if (event.target.classList.contains("btn-eliminar")) {
        const id = event.target.dataset.id; // Obtenemos el ID guardado en data-id
        eliminarCarta(id);                  // Llamamos a la función para borrarla del backend
      }
    });
  }

  // la ventana modal es una pestaña emergente
  // Seleccionamos los elementos clave del modal desde el DOM
  const modalEditar = document.querySelector("#modalEditar");
  const formEditarCarta = document.querySelector("#formEditarCarta");
  const btnCerrarModal = document.querySelector("#btnCerrarModal");

  // 1. Escuchamos los clics en todo el documento para capturar el botón "Editar/Actualizar"
  document.addEventListener("click", async (event) => {
    // Verificamos si el elemento pulsado tiene la clase del botón de editar
    if (event.target.classList.contains("btn-actualizar")) {
      const id = event.target.dataset.id; // Leemos el ID guardado en el atributo data-id
      try {
        const response = await fetch(`http://127.0.0.1:8000/cartas/${id}`)

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }

        // Buscamos los datos actuales de la carta en nuestro array local
        const cartaAEditar = await response.json();

        // Rellenamos los inputs del modal con los datos actuales de la carta
        document.querySelector("#editId").value = cartaAEditar.id;
        document.querySelector("#editRemitent").value = cartaAEditar.remitent;
        document.querySelector("#editDestinatari").value = cartaAEditar.destinatari;
        document.querySelector("#editContingut").value = cartaAEditar.contingut;

        // Hacemos visible el formulario emergente cambiando su display a flex
        modalEditar.style.display = "flex";

      } catch (error) {
        console.error("Error al obtener la carta para editar:", error);
        alert("No se ha podido cargar la información de la carta.");
      }
    }
  });

  // 2. Controlamos el envío del formulario del modal cuando el usuario guarda cambios
  if (formEditarCarta) {
    formEditarCarta.addEventListener("submit", async (event) => {
      event.preventDefault(); // Evitamos que la página se recargue

      // Recogemos el ID y las nuevas entradas introducidas por el usuario
      const id = document.querySelector("#editId").value;
      const datosActualizados = {
        remitent: document.querySelector("#editRemitent").value,
        destinatari: document.querySelector("#editDestinatari").value,
        contingut: document.querySelector("#editContingut").value
      };

      // Ejecutamos la función asíncrona para enviar la petición PUT al servidor
      await actualizarCarta(id, datosActualizados);

      // Ocultamos de nuevo la ventana modal al finalizar la actualización
      modalEditar.style.display = "none";
      carregarCartes(); // Recargamos para ver los cambios actualizados
    });
  }

  // 3. Evento para ocultar el modal al hacer clic sobre la 'X'

  if (btnCerrarModal) {
    btnCerrarModal.addEventListener("click", () => {
      modalEditar.style.display = "none";
    });
  }
}

async function carregarCartes() {
  try {
    const response = await fetch('http://127.0.0.1:8000/cartas');
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const cartes = await response.json();
    renderitzarCartes(cartes);   // passa les cartes rebudes
  } catch (error) {
    console.error('Error carregant cartes:', error);
    alert("No s'han pogut carregar les cartes. Comprova que el servidor està en marxa.");
  }
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

    const destinatariSpan = document.createElement("p");
    destinatariSpan.textContent = `Per a: ${carta.destinatari}`

    const paragraf = document.createElement("p");
    paragraf.textContent = carta.contingut;

    const idSpan = document.createElement("span");
    idSpan.textContent = ` #${carta.id}`;
    idSpan.setAttribute("data-id", carta.id);

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.dataset.id = carta.id;

    const btnActualizar = document.createElement("button");
    btnActualizar.textContent = "Actualizar";
    btnActualizar.className = "btn-actualizar";
    btnActualizar.dataset.id = carta.id;

    // 3. Muntem l'estructura
    divCarta.appendChild(titol);
    divCarta.appendChild(destinatariSpan);
    divCarta.appendChild(paragraf);
    divCarta.appendChild(idSpan);
    divCarta.appendChild(btnEliminar);
    divCarta.appendChild(btnActualizar);

    // 4. Pengem la carta al taulell
    contenidor.appendChild(divCarta);
  });

  const cosTaula = document.querySelector("#cosTaula");
  // Comprobamos si el cuerpo de la tabla (<tbody>) existe en el DOM antes de hacer nada
  if (cosTaula) {
    // Limpiamos la tabla vaciando su contenido anterior para no duplicar filas
    cosTaula.innerHTML = "";
    // Recorremos la lista de cartas una por una
    cartes.forEach(carta => {
      // Creamos un nuevo elemento de fila de tabla (<tr>) en memoria
      const tr = document.createElement("tr");

      // Rellenamos la fila con la estructura HTML de cada celda usando plantilla de texto (template literals)
      tr.innerHTML = `
        <td>#${carta.id}</td>
        <td>${carta.remitent}</td>
        <td>${carta.destinatari}</td>
        <td class="contingut-cell" title="${carta.contingut}">${carta.contingut}</td>
        <td>
          <button class="btn-eliminar" data-id="${carta.id}">Eliminar</button>
        </td>
        <td>
          <button class="btn-actualizar" data-id="${carta.id}">Actualizar</button>
        </td>
      `;
      // Enganchamos la fila recién creada dentro del cuerpo de la tabla
      cosTaula.appendChild(tr);

    });
  };
}

async function crearCarta() {
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
    //enviamos la carta al servidor
    await fetch('http://127.0.0.1:8000/cartas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ remitent, destinatari, contingut })
    });

    // Limpiar los campos del formulario tras añadir la carta
    remitentInput.value = "";
    destinatariInput.value = "";
    contingutInput.value = "";

    const personatgeInput = document.querySelector("#personatge");
    if (personatgeInput) personatgeInput.value = "";
    // Volvemos a pedir las cartas al servidor para ver la nueva incluida
    carregarCartes();
  } else {
    alert("Ningún campo puede estar vacío");
    return;
  }
}

async function actualizarCarta(id, datosActualizados) {
  const response = await fetch(`http://127.0.0.1:8000/cartas/${id}`, {
    method: 'PUT',                                        // 1. el mètode
    headers: { 'Content-Type': 'application/json' },      // 2. les capçaleres
    body: JSON.stringify(datosActualizados)                           // 3. el cos (serialitzat!)
  });
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  return await response.json();
}

async function eliminarCarta(id) {
  await fetch(`http://127.0.0.1:8000/cartas/${id}`, {
    method: 'DELETE'
  });
  carregarCartes();
}

// Escuchador para inicializar cuando el DOM esté listo
if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", () => {
    inicializar();
    carregarCartes();
  });
}

export { renderitzarCartes, carregarCartes, actualizarCarta, eliminarCarta };