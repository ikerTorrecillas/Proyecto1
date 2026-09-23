function saluda() {
  alert("Hola, món!");
}

const boto = document.getElementById("btnSaluda");
boto.addEventListener("click", saluda);

// elemento por id

const titol = document.querySelector("#titolPrincipal");
titol.textContent = "📮 El Cartero Invisible – Setmana 2";
titol.setAttribute("data-role", "banner");

const totesLesCartes = document.querySelector("#contenidorCartes");
totesLesCartes.innerHTML = "<p>Cartes pendents: 0</p>";

const info = document.querySelector(".info");
info.style.color = "#2c3e50";