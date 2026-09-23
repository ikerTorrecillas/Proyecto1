# Proyecto finalizado semana1

# 📮 El Cartero Invisible
---

## 🏛️ Concepto y Metáfora del Proyecto

El proyecto está construido bajo la metáfora de una **Oficina de Correos**:
- **La Fachada y el Edificio (HTML5 & CSS3 - M09):** La estructura semántica visible y el diseño visual de los sobres, mostradores y cartelera.
- **El Sistema Nervioso / Personal de Ventanilla (JavaScript & DOM - M06):** Encargado de atender las interacciones del cliente en tiempo real, modificar la información del mostrador y reaccionar a los eventos sin necesidad de recargar la página.
- **El Cartero (FastAPI & Uvicorn - M07):** El servidor que recibe las cartas/peticiones HTTP, procesa las direcciones (*Path Params*) e instrucciones (*Query Params*), y devuelve la correspondencia en formato JSON.

---

## 📁 Estructura del Proyecto

```text
cartero-invisible/
├── backend/                  # Servidor API REST en Python
│   ├── .venv/                # Entorno virtual de Python
│   ├── main.py               # Aplicación principal FastAPI y definición de endpoints
│   ├── requirements.txt      # Dependencias del backend (FastAPI, Uvicorn, pytest, etc.)
│   └── tests/
│       └── test_main.py      # Tests unitarios e integración del backend (pytest + httpx)
├── frontend/                 # Cliente Web (HTML, CSS, JS)
│   ├── index.html            # Estructura HTML semántica de la aplicación
│   ├── style.css             # Estilos CSS, pseudo-clases y Box Model
│   ├── script.js             # Lógica del cliente, eventos y manipulación del DOM
│   ├── package.json          # Configuración del entorno de testing frontend
│   └── saludar.test.js       # Test unitario del frontend (Jest + jsdom)
└── README.md                 # Documentación del proyecto

🟦 Módulo 06: JavaScript & Manipulación del DOM
Semana 1 — Creación del Sistema Nervioso Inicial:

Configuración del script script.js con el atributo defer en el HTML para garantizar la carga completa del DOM antes de la ejecución.

Gestión de eventos DOM mediante addEventListener("click", ...) sobre el botón #btnSaluda.

Aplicación de buenas prácticas en declaraciones con const y let, evitando el uso de var.

Dominio de tipos primitivos, objetos y funciones flecha (arrow functions).

Configuración del entorno de testing con Jest, jsdom y @testing-library/dom.

Semana 2 — Manipulación Dinámica del DOM ("El taulell viu"):

Selección de elementos mediante querySelector y querySelectorAll.

Actualización segura de texto con textContent para evitar vulnerabilidades XSS.

Inserción de estructuras HTML internas con innerHTML en #contenidorCartes.

Gestión de atributos HTML dinámicos mediante setAttribute("data-role", "banner").

Modificación de estilos en línea vía JS (style.color) y gestión de clases dinámicas mediante classList (add, remove, toggle).

🟩 Módulo 07: Backend con FastAPI
Semana 1 — Apertura de la Oficina de Correos:

Creación y activación de un entorno virtual aislado de Python (.venv).

Instalación y gestión de dependencias con pip y requirements.txt (fastapi, uvicorn, pytest, httpx, pytest-asyncio).

Creación de la app FastAPI() e implementación del primer endpoint raíz GET / devolviendo la respuesta JSON {"missatge": "Hola, món!"}.

Despliegue en desarrollo utilizando Uvicorn con recarga automática (--reload).

Exploración y verificación de la API a través de la documentación automática Swagger (/docs).

Implementación de pruebas de endpoint asíncronas con pytest y httpx.AsyncClient.

Semana 2 — Lectura de Direcciones y Parámetros:

Path Parameters (GET /cartas/{id}): Implementación de rutas dinámicas para la búsqueda de cartas individuales por ID con tipado estricto id: int.

Validaciones automáticas de FastAPI (devolución del código HTTP 422 en caso de recibir tipos erróneos).

Query Parameters (GET /cartas): Implementación de soporte para filtrado y paginación mediante limit y offset (con valores por defecto limit=10, offset=0) aplicando slicing sobre listas de datos.

Control de respuesta HTTP con manejo de errores (ej. 404 Not Found cuando una carta no existe).

Utilicé ID's propios y extras para realizar más pruebas sobre los endpoints.
cartes = [
        {"id": 1, "remitente": "Mi amego", "contenido": "Hola, que tal"},
        {"id": 2, "remitente": "Iker", "contenido": "Te escribo del pasado"},
        {"id": 3, "remitente": "Victor", "contenido": "Distracciones"},
        {"id": 4, "remitente": "Melqui", "contenido": "Si"},
        {"id": 5, "remitente": "Eric", "contenido": "Albion online"}
    ]

🟪 Módulo 09: HTML Semántico & CSS Box Model
Semana 1 — La Fachada y Estructura Semántica:

Creación del maquetado base HTML5 utilizando etiquetas semánticas (<header>, <main>, <section>, <footer>).

Definición de estilos CSS básicos en style.css para tipografía, márgenes y colores base.

Aplicación de pseudo-clases CSS (:hover, :first-child) para interactividad visual en la interfaz.

Semana 2 — Formato de Cartas y Modelo de Caja:

Dominio del CSS Box Model (content, padding, border, margin) para dar estructura a las tarjetas/sobres de las cartas.

Uso correcto de unidades de medida relativas (rem, em, %) y absolutas (px).

Control del comportamiento del tamaño de los elementos mediante box-sizing: border-box.