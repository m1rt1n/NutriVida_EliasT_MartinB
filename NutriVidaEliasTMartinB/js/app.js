console.log("JavaScript NutriVida conectado correctamente");

// ==========================================
// 1. SECCIÓN HERO / BIENVENIDA
// ==========================================
const botonBienvenida = document.getElementById("boton-bienvenida");
const infoExtra = document.getElementById("info-extra-bienvenida");

if (botonBienvenida && infoExtra) {
  botonBienvenida.addEventListener("click", function () {
    infoExtra.classList.toggle("d-none");
    if (infoExtra.classList.contains("d-none")) {
      botonBienvenida.textContent = "Conocer Especialistas";
    } else {
      botonBienvenida.textContent = "Ocultar Información";
    }
  });
}

// ==========================================
// 2. GESTIÓN DEL CARRITO Y LOCALSTORAGE
// ==========================================
const btnCarritoNav = document.getElementById("btn-carrito");
const seccionCarrito = document.getElementById("seccion-carrito");
const btnCerrarCarrito = document.getElementById("btn-cerrar-carrito");
const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const contadorProductos = document.getElementById("contador-productos");
const botonesAgregar = document.querySelectorAll(".boton-agregar");

// Cargar desde LocalStorage o array vacío
let carrito = JSON.parse(localStorage.getItem("carritoNutriVida")) || [];

function actualizarCarritoHTML() {
  listaCarrito.innerHTML = "";
  let totalPagar = 0;

  carrito.forEach(function (item, index) {
    totalPagar += item.precio;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <div>
        <strong>${item.nombre}</strong>
        <span class="text-muted d-block small">$${item.precio.toLocaleString("es-CL")} CLP</span>
      </div>
      <button class="btn btn-outline-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    listaCarrito.appendChild(li);
  });

  totalCarrito.textContent = "$" + totalPagar.toLocaleString("es-CL") + " CLP";
  totalCarrito.value = totalPagar;
  contadorProductos.textContent = carrito.length;

  localStorage.setItem("carritoNutriVida", JSON.stringify(carrito));
}

// Eliminar ítem individual por índice
window.eliminarProducto = function (posicion) {
  carrito.splice(posicion, 1);
  actualizarCarritoHTML();
};

// Abrir / cerrar carrito con retardo para posicionar arriba
if (btnCarritoNav && seccionCarrito) {
  btnCarritoNav.addEventListener("click", function () {
    seccionCarrito.classList.toggle("d-none");
    if (!seccionCarrito.classList.contains("d-none")) {
      setTimeout(() => {
        window.scrollTo({ top: seccionCarrito.offsetTop - 80, behavior: "smooth" });
      }, 50);
    }
  });
}

if (btnCerrarCarrito && seccionCarrito) {
  btnCerrarCarrito.addEventListener("click", function () {
    seccionCarrito.classList.add("d-none");
  });
}

// Vaciar carrito
if (btnVaciarCarrito) {
  btnVaciarCarrito.addEventListener("click", function () {
    carrito = [];
    actualizarCarritoHTML();
  });
}

// Agregar productos con data-attributes
botonesAgregar.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const nombre = boton.getAttribute("data-nombre");
    const precio = parseInt(boton.getAttribute("data-precio"), 10);

    carrito.push({ nombre: nombre, precio: precio });
    actualizarCarritoHTML();
    seccionCarrito.classList.remove("d-none");
    setTimeout(() => {
      window.scrollTo({ top: seccionCarrito.offsetTop - 80, behavior: "smooth" });
    }, 50);
  });
});

actualizarCarritoHTML();

// ==========================================
// 3. SECCIÓN Y VALIDACIÓN DE LOGIN
// ==========================================
const btnVerLogin = document.getElementById("btn-ver-login");
const seccionLogin = document.getElementById("seccion-login");
const btnCerrarLogin = document.getElementById("btn-cerrar-login");
const formLogin = document.getElementById("form-login");
const loginCorreo = document.getElementById("login-correo");
const loginClave = document.getElementById("login-clave");
const errorLoginCorreo = document.getElementById("error-login-correo");
const errorLoginClave = document.getElementById("error-login-clave");

// Toggle visibilidad del login con scroll suave
if (btnVerLogin && seccionLogin) {
  btnVerLogin.addEventListener("click", function () {
    seccionLogin.classList.toggle("d-none");
    if (seccionRegistro) seccionRegistro.classList.add("d-none");
    if (!seccionLogin.classList.contains("d-none")) {
      setTimeout(() => {
        window.scrollTo({ top: seccionLogin.offsetTop - 80, behavior: "smooth" });
      }, 50);
    }
  });
}

if (btnCerrarLogin && seccionLogin) {
  btnCerrarLogin.addEventListener("click", function () {
    seccionLogin.classList.add("d-none");
  });
}

// Reglas de negocio para correos institucionales / gmail
function validarDominioCorreo(correo) {
  const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
  return dominiosPermitidos.some(dominio => correo.toLowerCase().endsWith(dominio));
}

if (formLogin) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    let esValido = true;

    // Validación de correo
    const valorCorreo = loginCorreo.value.trim();
    if (!valorCorreo) {
      errorLoginCorreo.textContent = "El correo es obligatorio.";
      esValido = false;
    } else if (!validarDominioCorreo(valorCorreo)) {
      errorLoginCorreo.textContent = "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
      esValido = false;
    } else {
      errorLoginCorreo.textContent = "";
    }

    // Validación de contraseña (4 a 10 caracteres según pauta)
    const valorClave = loginClave.value;
    if (!valorClave) {
      errorLoginClave.textContent = "La contraseña es obligatoria.";
      esValido = false;
    } else if (valorClave.length < 4 || valorClave.length > 10) {
      errorLoginClave.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
      esValido = false;
    } else {
      errorLoginClave.textContent = "";
    }

    if (esValido) {
      alert("Inicio de sesión exitoso. ¡Bienvenido a NutriVida!");
      formLogin.reset();
      seccionLogin.classList.add("d-none");
    }
  });
}

// ==========================================
// 4. REGISTRO Y SELECTS DINÁMICOS
// ==========================================
const btnVerRegistro = document.getElementById("btn-ver-registro");
const seccionRegistro = document.getElementById("seccion-registro");
const btnCerrarRegistro = document.getElementById("btn-cerrar-registro");

const formRegistro = document.getElementById("form-registro");
const regRut = document.getElementById("reg-rut");
const regNombre = document.getElementById("reg-nombre");
const regApellidos = document.getElementById("reg-apellidos");
const regCorreo = document.getElementById("reg-correo");
const regRegion = document.getElementById("reg-region");
const regComuna = document.getElementById("reg-comuna");
const regDireccion = document.getElementById("reg-direccion");

// Comunas por región requeridas
const comunasPorRegion = {
  araucania: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol"],
  metropolitana: ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto"],
  biobio: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Los Ángeles"]
};

// Toggle del panel de registro con desplazamiento hacia arriba
if (btnVerRegistro && seccionRegistro) {
  btnVerRegistro.addEventListener("click", function () {
    seccionRegistro.classList.toggle("d-none");
    if (seccionLogin) seccionLogin.classList.add("d-none");
    if (!seccionRegistro.classList.contains("d-none")) {
      setTimeout(() => {
        window.scrollTo({ top: seccionRegistro.offsetTop - 80, behavior: "smooth" });
      }, 50);
    }
  });
}

if (btnCerrarRegistro && seccionRegistro) {
  btnCerrarRegistro.addEventListener("click", function () {
    seccionRegistro.classList.add("d-none");
  });
}

// Cargar comunas dinámicamente al cambiar de región
if (regRegion && regComuna) {
  regRegion.addEventListener("change", function () {
    const regionSeleccionada = regRegion.value;
    regComuna.innerHTML = '<option value="">Selecciona una comuna</option>';

    if (regionSeleccionada && comunasPorRegion[regionSeleccionada]) {
      regComuna.disabled = false;
      comunasPorRegion[regionSeleccionada].forEach(function (comuna) {
        const option = document.createElement("option");
        option.value = comuna.toLowerCase();
        option.textContent = comuna;
        regComuna.appendChild(option);
      });
    } else {
      regComuna.disabled = true;
      regComuna.innerHTML = '<option value="">Primero selecciona una región</option>';
    }
  });
}

// Algoritmo de validación de RUT chileno (módulo 11)
function validarRutChileno(rutCompleto) {
  rutCompleto = rutCompleto.toUpperCase().replace(/\./g, "").replace(/-/g, "").trim();
  if (rutCompleto.length < 7 || rutCompleto.length > 9) return false;

  const cuerpo = rutCompleto.slice(0, -1);
  const dv = rutCompleto.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvEsperadoNum = 11 - (suma % 11);
  let dvEsperado = "";
  if (dvEsperadoNum === 11) dvEsperado = "0";
  else if (dvEsperadoNum === 10) dvEsperado = "K";
  else dvEsperado = dvEsperadoNum.toString();

  return dv === dvEsperado;
}

// Validación del formulario de registro
if (formRegistro) {
  formRegistro.addEventListener("submit", function (e) {
    e.preventDefault();
    let esValido = true;

    // RUT
    const valorRut = regRut.value.trim();
    const errorRut = document.getElementById("error-reg-rut");
    if (!valorRut) {
      errorRut.textContent = "El RUT es obligatorio.";
      esValido = false;
    } else if (!validarRutChileno(valorRut)) {
      errorRut.textContent = "RUT inválido. Debe tener entre 7 y 9 dígitos sin puntos ni guion (ej: 19011022K).";
      esValido = false;
    } else {
      errorRut.textContent = "";
    }

    // Nombre
    const valorNombre = regNombre.value.trim();
    const errorNombre = document.getElementById("error-reg-nombre");
    if (!valorNombre) {
      errorNombre.textContent = "El nombre es obligatorio.";
      esValido = false;
    } else {
      errorNombre.textContent = "";
    }

    // Apellidos
    const valorApellidos = regApellidos.value.trim();
    const errorApellidos = document.getElementById("error-reg-apellidos");
    if (!valorApellidos) {
      errorApellidos.textContent = "Los apellidos son obligatorios.";
      esValido = false;
    } else {
      errorApellidos.textContent = "";
    }

    // Correo
    const valorCorreo = regCorreo.value.trim();
    const errorCorreo = document.getElementById("error-reg-correo");
    if (!valorCorreo) {
      errorCorreo.textContent = "El correo es obligatorio.";
      esValido = false;
    } else if (!validarDominioCorreo(valorCorreo)) {
      errorCorreo.textContent = "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
      esValido = false;
    } else {
      errorCorreo.textContent = "";
    }

    // Región y Comuna
    const errorRegion = document.getElementById("error-reg-region");
    const errorComuna = document.getElementById("error-reg-comuna");
    if (!regRegion.value) {
      errorRegion.textContent = "Selecciona una región.";
      esValido = false;
    } else {
      errorRegion.textContent = "";
    }

    if (!regComuna.value) {
      errorComuna.textContent = "Selecciona una comuna.";
      esValido = false;
    } else {
      errorComuna.textContent = "";
    }

    // Dirección
    const errorDireccion = document.getElementById("error-reg-direccion");
    if (!regDireccion.value.trim()) {
      errorDireccion.textContent = "La dirección es obligatoria.";
      esValido = false;
    } else {
      errorDireccion.textContent = "";
    }

    if (esValido) {
      alert("¡Paciente registrado exitosamente en NutriVida!");
      formRegistro.reset();
      regComuna.disabled = true;
      regComuna.innerHTML = '<option value="">Primero selecciona una región</option>';
      seccionRegistro.classList.add("d-none");
    }
  });
}

// ==========================================
// 5. VALIDACIÓN DE CONTACTO
// ==========================================
const formContacto = document.getElementById("form-contacto");
const contactoNombre = document.getElementById("contacto-nombre");
const contactoCorreo = document.getElementById("contacto-correo");
const contactoMensaje = document.getElementById("contacto-mensaje");
const errorNombre = document.getElementById("error-contacto-nombre");
const errorCorreo = document.getElementById("error-contacto-correo");
const errorMensaje = document.getElementById("error-contacto-mensaje");
const contadorCaracteres = document.getElementById("contador-caracteres");
const mensajeExito = document.getElementById("mensaje-exito-contacto");

// Contador dinámico de caracteres
if (contactoMensaje && contadorCaracteres) {
  contactoMensaje.addEventListener("input", function () {
    const longitud = contactoMensaje.value.length;
    contadorCaracteres.textContent = `${longitud} / 500`;
  });
}

if (formContacto) {
  formContacto.addEventListener("submit", function (e) {
    e.preventDefault();
    let esValido = true;

    // Nombre
    const valorNombre = contactoNombre.value.trim();
    if (!valorNombre) {
      errorNombre.textContent = "El nombre es obligatorio.";
      esValido = false;
    } else if (valorNombre.length > 100) {
      errorNombre.textContent = "El nombre no puede superar los 100 caracteres.";
      esValido = false;
    } else {
      errorNombre.textContent = "";
    }

    // Correo
    const valorCorreo = contactoCorreo.value.trim();
    if (!valorCorreo) {
      errorCorreo.textContent = "El correo es obligatorio.";
      esValido = false;
    } else if (!validarDominioCorreo(valorCorreo)) {
      errorCorreo.textContent = "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
      esValido = false;
    } else {
      errorCorreo.textContent = "";
    }

    // Mensaje
    const valorMensaje = contactoMensaje.value.trim();
    if (!valorMensaje) {
      errorMensaje.textContent = "El mensaje o consulta es obligatorio.";
      esValido = false;
    } else if (valorMensaje.length > 500) {
      errorMensaje.textContent = "El mensaje no puede superar los 500 caracteres.";
      esValido = false;
    } else {
      errorMensaje.textContent = "";
    }

    if (esValido) {
      mensajeExito.classList.remove("d-none");
      formContacto.reset();
      contadorCaracteres.textContent = "0 / 500";

      setTimeout(function () {
        mensajeExito.classList.add("d-none");
      }, 4000);
    }
  });
}