console.log("JavaScript NutriVida conectado correctamente");

// 1. Elementos de la bienvenida
const botonBienvenida = document.getElementById("boton-bienvenida");
const infoExtra = document.getElementById("info-extra-bienvenida");

// 2. Evento clic para mostrar / ocultar información adicional
botonBienvenida.addEventListener("click", function() {
  infoExtra.classList.toggle("d-none");

  if (infoExtra.classList.contains("d-none")) {
    botonBienvenida.textContent = "Conocer Especialistas";
  } else {
    botonBienvenida.textContent = "Ocultar Información";
  }
});