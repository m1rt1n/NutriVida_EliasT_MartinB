console.log("Plataforma Web NutriVida inicializada correctamente");

// ==========================================
// 1. DATOS OFICIALES DEL EXCEL (18 Servicios y 4 Nutricionistas)
// ==========================================
const catalogoBaseExcel = [
  { codigo: "CN001", tipo: "Consulta", nombre: "Primera consulta nutricional", duracion: "50 min", modalidad: "Presencial", precio: 35000, stock: 20, desc: "Evaluación inicial: anamnesis, antropometría completa y diseño del primer plan alimenticio." },
  { codigo: "CN002", tipo: "Consulta", nombre: "Control nutricional (seguimiento)", duracion: "30 min", modalidad: "Presencial", precio: 25000, stock: 30, desc: "Seguimiento mensual: medición de indicadores y ajuste del plan vigente." },
  { codigo: "CN003", tipo: "Consulta", nombre: "Control nutricional quincenal", duracion: "30 min", modalidad: "Presencial", precio: 22000, stock: 25, desc: "Seguimiento intensivo cada 15 días. Recomendado en los primeros 2 meses." },
  { codigo: "CN004", tipo: "Consulta", nombre: "Teleconsulta nutricional", duracion: "30 min", modalidad: "Online (video)", precio: 20000, stock: 40, desc: "Consulta de seguimiento vía videollamada. Requiere contar con consulta presencial previa." },
  { codigo: "CN005", tipo: "Consulta", nombre: "Consulta de urgencia / reagendada", duracion: "30 min", modalidad: "Presencial", precio: 28000, stock: 10, desc: "Para pacientes que requieren atención fuera de su control habitual." },
  { codigo: "PL001", tipo: "Plan especializado", nombre: "Plan pérdida de peso (1 mes)", duracion: "Mensual", modalidad: "Presencial", precio: 65000, stock: 15, desc: "Incluye primera consulta + 1 control quincenal + plan alimenticio personalizado + seguimiento por WhatsApp." },
  { codigo: "PL002", tipo: "Plan especializado", nombre: "Plan pérdida de peso (3 meses)", duracion: "Trimestral", modalidad: "Presencial", precio: 170000, stock: 10, desc: "Incluye primera consulta + 5 controles + 3 planes mensuales + seguimiento continuo." },
  { codigo: "PL003", tipo: "Plan especializado", nombre: "Plan nutrición deportiva (1 mes)", duracion: "Mensual", modalidad: "Presencial", precio: 70000, stock: 15, desc: "Para deportistas y personas con actividad física frecuente. Cálculo de requerimientos energéticos y proteicos." },
  { codigo: "PL004", tipo: "Plan especializado", nombre: "Plan control diabetes / hipertensión", duracion: "Mensual", modalidad: "Presencial", precio: 75000, stock: 15, desc: "Plan adaptado para patologías metabólicas. Coordinación con médico tratante si aplica." },
  { codigo: "PL005", tipo: "Plan especializado", nombre: "Plan alimentación vegetariana/vegana", duracion: "Mensual", modalidad: "Presencial", precio: 68000, stock: 15, desc: "Diseñado para garantizar aporte adecuado de proteínas, hierro, vitamina B12 y calcio sin productos animales." },
  { codigo: "PL006", tipo: "Plan especializado", nombre: "Plan alimentación infantil (2-12 años)", duracion: "Mensual", modalidad: "Presencial", precio: 65000, stock: 12, desc: "Evaluación nutricional pediátrica y diseño de plan adaptado a la etapa de desarrollo del niño." },
  { codigo: "EV001", tipo: "Evaluación", nombre: "Antropometría completa", duracion: "20 min", modalidad: "Presencial", precio: 18000, stock: 25, desc: "Peso, talla, IMC, circunferencia de cintura, cadera, brazo y % de grasa corporal con bioimpedanciometría." },
  { codigo: "EV002", tipo: "Evaluación", nombre: "Bioimpedanciometría", duracion: "15 min", modalidad: "Presencial", precio: 12000, stock: 30, desc: "Medición de composición corporal: masa grasa, masa muscular, agua corporal y edad metabólica." },
  { codigo: "EV003", tipo: "Evaluación", nombre: "Encuesta de hábitos alimentarios", duracion: "20 min", modalidad: "Presencial", precio: 10000, stock: 30, desc: "Análisis del patrón alimentario actual. Identificación de déficit y excesos nutricionales." },
  { codigo: "EV004", tipo: "Evaluación", nombre: "Análisis de exámenes de laboratorio", duracion: "20 min", modalidad: "Presencial", precio: 15000, stock: 25, desc: "Interpretación de hemograma, perfil bioquímico y lipídico en contexto nutricional." },
  { codigo: "TG001", tipo: "Taller grupal", nombre: "Taller de alimentación saludable", duracion: "90 min", modalidad: "Presencial (grupo)", precio: 15000, stock: 10, desc: "Máx. 10 personas. Conceptos básicos de alimentación equilibrada y lectura de etiquetas." },
  { codigo: "TG002", tipo: "Taller grupal", nombre: "Taller de cocina nutritiva", duracion: "120 min", modalidad: "Presencial (grupo)", precio: 20000, stock: 8, desc: "Preparación de recetas saludables. Incluye degustación. Máx. 8 personas." },
  { codigo: "TG003", tipo: "Taller grupal", nombre: "Taller nutrición para deportistas", duracion: "90 min", modalidad: "Presencial (grupo)", precio: 18000, stock: 12, desc: "Hidratación, nutrición pre y post entrenamiento, suplementación básica. Máx. 12 personas." }
];

const nutricionistasExcel = [
  { codigo: "NUT001", nombre: "Nut. Carolina Fuentes M.", especialidad: "Obesidad y síndrome metabólico", dias: "Lunes, Miércoles, Viernes", horario: "09:00 – 17:00 hrs" },
  { codigo: "NUT002", nombre: "Nut. Rodrigo Sepúlveda A.", especialidad: "Nutrición deportiva y rendimiento", dias: "Martes, Jueves, Sábado", horario: "09:00 – 14:00 hrs" },
  { codigo: "NUT003", nombre: "Nut. Daniela Morales C.", especialidad: "Alimentación vegetariana, vegana y trastornos alimentarios", dias: "Lunes a Viernes", horario: "08:00 – 13:00 hrs" },
  { codigo: "NUT004", nombre: "Nut. Felipe Araya R.", especialidad: "Nutrición pediátrica y familiar", dias: "Martes a Viernes", horario: "14:00 – 19:00 hrs" }
];

// Cargar catálogo desde localStorage o inicializar con el Excel
let catalogoServicios = JSON.parse(localStorage.getItem("catalogoNutriVida")) || [...catalogoBaseExcel];
let categoriaActiva = "Todos";

// ==========================================
// 2. RENDERIZADO DINÁMICO DE CATÁLOGO Y FILTROS
// ==========================================
const contenedorServicios = document.getElementById("contenedor-servicios");
const buscadorServicios = document.getElementById("buscador-servicios");
const botonesCategoria = document.querySelectorAll("#tabs-categorias button");

function obtenerColorBadge(tipo) {
  if (tipo === "Consulta") return "bg-primary";
  if (tipo === "Plan especializado") return "bg-warning text-dark";
  if (tipo === "Evaluación") return "bg-info text-dark";
  return "bg-secondary";
}

function renderizarCatalogo() {
  if (!contenedorServicios) return;
  const textoBusqueda = (buscadorServicios ? buscadorServicios.value : "").toLowerCase().trim();

  const filtrados = catalogoServicios.filter(item => {
    const coincideCategoria = categoriaActiva === "Todos" || item.tipo === categoriaActiva;
    const coincideTexto = item.nombre.toLowerCase().includes(textoBusqueda) ||
                          item.codigo.toLowerCase().includes(textoBusqueda) ||
                          item.modalidad.toLowerCase().includes(textoBusqueda) ||
                          item.desc.toLowerCase().includes(textoBusqueda);
    return coincideCategoria && coincideTexto;
  });

  contenedorServicios.innerHTML = "";

  if (filtrados.length === 0) {
    contenedorServicios.innerHTML = `
      <div class="col-12 text-center py-4">
        <p class="text-muted mb-0">No se encontraron prestaciones que coincidan con tu búsqueda.</p>
      </div>`;
    return;
  }

  filtrados.forEach(item => {
    const col = document.createElement("article");
    col.className = "col";
    col.innerHTML = `
      <div class="card card-servicio h-100 shadow-sm bg-white">
        <header class="card-body pb-0 bg-transparent">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge ${obtenerColorBadge(item.tipo)}">${item.tipo}</span>
            <span class="badge bg-light text-dark border"><i class="bi bi-laptop me-1"></i>${item.modalidad}</span>
          </div>
          <h3 class="card-title fw-bold h5 text-dark mb-1">${item.nombre}</h3>
          <p class="text-muted small mb-0">Código: <strong>${item.codigo}</strong> | Duración: ${item.duracion}</p>
        </header>
        <div class="card-body pt-2">
          <p class="card-text small text-secondary">${item.desc}</p>
        </div>
        <footer class="card-footer bg-white border-0 pt-0 pb-3 d-flex justify-content-between align-items-center">
          <div>
            <small class="text-muted d-block">Valor Arancel</small>
            <data class="h5 text-success fw-bold m-0" value="${item.precio}">$${item.precio.toLocaleString("es-CL")}</data>
          </div>
          <button class="btn btn-outline-success btn-sm fw-bold px-3" onclick="agregarAlCarrito('${item.codigo}')">
            <i class="bi bi-plus-circle me-1"></i>Reservar
          </button>
        </footer>
      </div>
    `;
    contenedorServicios.appendChild(col);
  });
}

botonesCategoria.forEach(boton => {
  boton.addEventListener("click", function () {
    botonesCategoria.forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    categoriaActiva = this.getAttribute("data-categoria");
    renderizarCatalogo();
  });
});

if (buscadorServicios) {
  buscadorServicios.addEventListener("input", renderizarCatalogo);
}

document.querySelectorAll("[data-filtro-rapido]").forEach(atajo => {
  atajo.addEventListener("click", function () {
    const cat = this.getAttribute("data-filtro-rapido");
    categoriaActiva = cat;
    botonesCategoria.forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-categoria") === cat);
    });
    renderizarCatalogo();
  });
});

// ==========================================
// 3. DIRECTORIO DE ESPECIALISTAS Y SCROLL
// ==========================================
const contenedorNutricionistas = document.getElementById("contenedor-nutricionistas");
const filtroEspecialidad = document.getElementById("filtro-especialidad");

function renderizarNutricionistas() {
  if (!contenedorNutricionistas) return;
  const filtro = filtroEspecialidad ? filtroEspecialidad.value.toLowerCase() : "todos";
  contenedorNutricionistas.innerHTML = "";

  const lista = nutricionistasExcel.filter(n =>
    filtro === "todos" || n.especialidad.toLowerCase().includes(filtro)
  );

  lista.forEach(nut => {
    const col = document.createElement("article");
    col.className = "col";
    col.innerHTML = `
      <div class="p-3 border rounded-3 h-100 bg-light d-flex flex-column justify-content-between">
        <div>
          <div class="d-flex justify-content-between align-items-start">
            <h3 class="h5 fw-bold text-success m-0"><i class="bi bi-person-badge me-2"></i>${nut.nombre}</h3>
            <span class="badge bg-secondary">${nut.codigo}</span>
          </div>
          <p class="mb-1 mt-2 small"><strong>Especialidad principal:</strong> ${nut.especialidad}.</p>
          <p class="small text-muted mb-2"><i class="bi bi-calendar-week me-1"></i><strong>Días:</strong> ${nut.dias} (${nut.horario}).</p>
        </div>
        <div class="mt-2 pt-2 border-top d-flex justify-content-end">
          <a href="#servicios" class="btn btn-sm btn-success fw-semibold" onclick="preseleccionarNutricionista('${nut.nombre} (${nut.codigo})')">
            Seleccionar y ver prestaciones
          </a>
        </div>
      </div>
    `;
    contenedorNutricionistas.appendChild(col);
  });
}

window.preseleccionarNutricionista = function (nombreNut) {
  const selectReserva = document.getElementById("select-nutricionista-reserva");
  if (selectReserva) selectReserva.value = nombreNut;
};

if (filtroEspecialidad) {
  filtroEspecialidad.addEventListener("change", renderizarNutricionistas);
}

const botonBienvenida = document.getElementById("boton-bienvenida");
const seccionNosotros = document.getElementById("nosotros");
if (botonBienvenida && seccionNosotros) {
  botonBienvenida.addEventListener("click", function () {
    const posicionIdeal = seccionNosotros.offsetTop - 85;
    window.scrollTo({ top: posicionIdeal, behavior: "smooth" });
  });
}

// ==========================================
// 4. CARRITO DE COMPRAS CON LOCALSTORAGE (ERS RF1)
// ==========================================
let carrito = JSON.parse(localStorage.getItem("carritoNutriVida")) || [];
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const contadorProductos = document.getElementById("contador-productos");
const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");
const btnConfirmarReserva = document.getElementById("btn-confirmar-reserva");

function actualizarCarritoHTML() {
  if (!listaCarrito) return;
  listaCarrito.innerHTML = "";
  let totalPagar = 0;

  if (carrito.length === 0) {
    listaCarrito.innerHTML = `<li class="list-group-item text-center text-muted py-4 small">Tu carrito de reservas está vacío.</li>`;
  } else {
    carrito.forEach((item, index) => {
      totalPagar += item.precio;
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center small";
      li.innerHTML = `
        <div>
          <span class="badge bg-success me-1">${item.codigo}</span>
          <strong>${item.nombre}</strong>
          <span class="text-muted d-block">$${item.precio.toLocaleString("es-CL")} CLP (${item.modalidad})</span>
        </div>
        <button class="btn btn-outline-danger btn-sm ms-2" onclick="eliminarProducto(${index})" aria-label="Eliminar">
          <i class="bi bi-trash"></i>
        </button>
      `;
      listaCarrito.appendChild(li);
    });
  }

  totalCarrito.textContent = "$" + totalPagar.toLocaleString("es-CL") + " CLP";
  totalCarrito.value = totalPagar;
  contadorProductos.textContent = carrito.length;
  localStorage.setItem("carritoNutriVida", JSON.stringify(carrito));
}

window.agregarAlCarrito = function (codigoServicio) {
  const servicio = catalogoServicios.find(s => s.codigo === codigoServicio);
  if (!servicio) return;
  carrito.push(servicio);
  actualizarCarritoHTML();

  const offcanvasEl = document.getElementById("offcanvasCarrito");
  if (offcanvasEl && window.bootstrap) {
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
    offcanvas.show();
  }
};

window.eliminarProducto = function (posicion) {
  carrito.splice(posicion, 1);
  actualizarCarritoHTML();
};

if (btnVaciarCarrito) {
  btnVaciarCarrito.addEventListener("click", function () {
    carrito = [];
    actualizarCarritoHTML();
  });
}

if (btnConfirmarReserva) {
  btnConfirmarReserva.addEventListener("click", function () {
    if (carrito.length === 0) {
      alert("Debes agregar al menos una prestación o plan antes de confirmar tu solicitud.");
      return;
    }
    const profesional = document.getElementById("select-nutricionista-reserva").value;
    alert(`¡Solicitud registrada con éxito!\n\nProfesional asignado: ${profesional}\nPrestaciones: ${carrito.length}\nTotal: ${totalCarrito.textContent}\n\nRecibirás un recordatorio automático para evitar inasistencias.`);
    carrito = [];
    actualizarCarritoHTML();
  });
}

// ==========================================
// 5. FUNCIONES DE VALIDACIÓN EN VIVO Y RBAC (ERS RF2, RF3, RF4)
// ==========================================
function validarDominioCorreo(correo) {
  const dominiosPermitidos = ["@duoc.cl", "@duocuc.cl", "@profesor.duoc.cl", "@gmail.com"];
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) &&
         dominiosPermitidos.some(dominio => correo.toLowerCase().endsWith(dominio));
}

// Algoritmo Módulo 11 RUT Chileno
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
  let dvEsperado = dvEsperadoNum === 11 ? "0" : dvEsperadoNum === 10 ? "K" : dvEsperadoNum.toString();
  return dv === dvEsperado;
}

// Helper universal para pintar bordes verdes/rojos y mostrar mensajes en vivo
function marcarEstadoInput(inputEl, errorEl, mensajeError) {
  if (!inputEl || !errorEl) return false;
  if (mensajeError) {
    errorEl.textContent = mensajeError;
    inputEl.classList.add("is-invalid");
    inputEl.classList.remove("is-valid");
    return false;
  } else {
    errorEl.textContent = "";
    inputEl.classList.remove("is-invalid");
    inputEl.classList.add("is-valid");
    return true;
  }
}

function limpiarClasesValidacion(formulario) {
  if (!formulario) return;
  formulario.querySelectorAll(".is-valid, .is-invalid").forEach(el => {
    el.classList.remove("is-valid", "is-invalid");
  });
}

// Gestión de Sesión y RBAC
const btnVerAdmin = document.getElementById("btn-ver-admin");
const seccionAdmin = document.getElementById("seccion-admin");
const btnCerrarAdmin = document.getElementById("btn-cerrar-admin");
const badgeSesion = document.getElementById("badge-sesion-activa");
const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
const btnVerLogin = document.getElementById("btn-ver-login");
const btnVerRegistro = document.getElementById("btn-ver-registro");

function aplicarEstadoSesion() {
  const sesion = JSON.parse(localStorage.getItem("sesionNutriVida"));
  if (sesion) {
    badgeSesion.textContent = `Sesión: ${sesion.rol} (${sesion.correo})`;
    badgeSesion.classList.remove("d-none");
    btnCerrarSesion.classList.remove("d-none");
    btnVerLogin.classList.add("d-none");
    btnVerRegistro.classList.add("d-none");

    if (sesion.rol === "Administrador") {
      btnVerAdmin.classList.remove("d-none");
    } else {
      btnVerAdmin.classList.add("d-none");
      seccionAdmin.classList.add("d-none");
    }
  } else {
    badgeSesion.classList.add("d-none");
    btnCerrarSesion.classList.add("d-none");
    btnVerAdmin.classList.add("d-none");
    seccionAdmin.classList.add("d-none");
    btnVerLogin.classList.remove("d-none");
    btnVerRegistro.classList.remove("d-none");
  }
}

if (btnCerrarSesion) {
  btnCerrarSesion.addEventListener("click", function () {
    localStorage.removeItem("sesionNutriVida");
    aplicarEstadoSesion();
  });
}

// --- VALIDACIÓN EN VIVO: LOGIN ---
const loginCorreoInput = document.getElementById("login-correo");
const loginClaveInput = document.getElementById("login-clave");
const errLoginCorreo = document.getElementById("error-login-correo");
const errLoginClave = document.getElementById("error-login-clave");

function validarLoginCorreoEnVivo() {
  const val = loginCorreoInput.value.trim();
  if (!val) return marcarEstadoInput(loginCorreoInput, errLoginCorreo, "El correo electrónico es obligatorio.");
  if (!validarDominioCorreo(val)) return marcarEstadoInput(loginCorreoInput, errLoginCorreo, "Formato incompleto o dominio no autorizado (@duoc.cl, @duocuc.cl, @profesor.duoc.cl o @gmail.com).");
  return marcarEstadoInput(loginCorreoInput, errLoginCorreo, "");
}

function validarLoginClaveEnVivo() {
  const val = loginClaveInput.value;
  if (!val) return marcarEstadoInput(loginClaveInput, errLoginClave, "La contraseña es obligatoria.");
  if (val.length < 4 || val.length > 10) return marcarEstadoInput(loginClaveInput, errLoginClave, `Llevas ${val.length} caracteres. Debe tener entre 4 y 10.`);
  return marcarEstadoInput(loginClaveInput, errLoginClave, "");
}

if (loginCorreoInput) loginCorreoInput.addEventListener("input", validarLoginCorreoEnVivo);
if (loginClaveInput) loginClaveInput.addEventListener("input", validarLoginClaveEnVivo);

const formLogin = document.getElementById("form-login");
if (formLogin) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    const v1 = validarLoginCorreoEnVivo();
    const v2 = validarLoginClaveEnVivo();

    if (v1 && v2) {
      const correo = loginCorreoInput.value.trim();
      const rol = document.getElementById("login-rol").value;
      localStorage.setItem("sesionNutriVida", JSON.stringify({ correo, rol }));
      aplicarEstadoSesion();
      formLogin.reset();
      limpiarClasesValidacion(formLogin);
      const modalEl = document.getElementById("modalLogin");
      if (modalEl && window.bootstrap) bootstrap.Modal.getInstance(modalEl).hide();
      if (rol === "Administrador") {
        seccionAdmin.classList.remove("d-none");
        window.scrollTo({ top: seccionAdmin.offsetTop - 90, behavior: "smooth" });
      }
    }
  });
}

// ==========================================
// 6. PANEL DE ADMINISTRACIÓN (MANTENEDOR + VALIDACIÓN EN VIVO)
// ==========================================
const tablaAdmin = document.getElementById("tabla-servicios-admin");
const totalItemsAdmin = document.getElementById("total-items-admin");
const formAdmin = document.getElementById("form-admin");
const btnRestaurarCatalogo = document.getElementById("btn-restaurar-catalogo");

function renderizarTablaAdmin() {
  if (!tablaAdmin) return;
  tablaAdmin.innerHTML = "";
  totalItemsAdmin.textContent = catalogoServicios.length;

  catalogoServicios.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="fw-bold">${item.codigo}</td>
      <td>${item.tipo}</td>
      <td>${item.nombre}</td>
      <td>${item.modalidad}</td>
      <td>$${item.precio.toLocaleString("es-CL")}</td>
      <td>
        <button class="btn btn-outline-danger btn-sm py-0 px-2" onclick="eliminarServicioCatalogo(${index})">Eliminar</button>
      </td>
    `;
    tablaAdmin.appendChild(tr);
  });
}

window.eliminarServicioCatalogo = function (index) {
  catalogoServicios.splice(index, 1);
  localStorage.setItem("catalogoNutriVida", JSON.stringify(catalogoServicios));
  renderizarCatalogo();
  renderizarTablaAdmin();
};

if (btnVerAdmin && seccionAdmin) {
  btnVerAdmin.addEventListener("click", function () {
    seccionAdmin.classList.toggle("d-none");
    if (!seccionAdmin.classList.contains("d-none")) {
      window.scrollTo({ top: seccionAdmin.offsetTop - 90, behavior: "smooth" });
    }
  });
}

if (btnCerrarAdmin && seccionAdmin) {
  btnCerrarAdmin.addEventListener("click", () => seccionAdmin.classList.add("d-none"));
}

if (btnRestaurarCatalogo) {
  btnRestaurarCatalogo.addEventListener("click", function () {
    catalogoServicios = [...catalogoBaseExcel];
    localStorage.setItem("catalogoNutriVida", JSON.stringify(catalogoServicios));
    renderizarCatalogo();
    renderizarTablaAdmin();
  });
}

// Inputs Admin en vivo
const adminCodigo = document.getElementById("admin-codigo");
const adminPrecio = document.getElementById("admin-precio");
const adminNombre = document.getElementById("admin-nombre");
const adminCategoria = document.getElementById("admin-categoria");
const adminStock = document.getElementById("admin-stock");
const adminDesc = document.getElementById("admin-desc");

if (adminCodigo) adminCodigo.addEventListener("input", () => marcarEstadoInput(adminCodigo, document.getElementById("error-admin-codigo"), adminCodigo.value.trim() ? "" : "Código obligatorio."));
if (adminPrecio) adminPrecio.addEventListener("input", () => marcarEstadoInput(adminPrecio, document.getElementById("error-admin-precio"), adminPrecio.value !== "" && Number(adminPrecio.value) >= 0 ? "" : "Precio inválido."));
if (adminNombre) adminNombre.addEventListener("input", () => marcarEstadoInput(adminNombre, document.getElementById("error-admin-nombre"), adminNombre.value.trim() ? "" : "Nombre obligatorio."));
if (adminCategoria) adminCategoria.addEventListener("change", () => marcarEstadoInput(adminCategoria, document.getElementById("error-admin-categoria"), adminCategoria.value ? "" : "Selecciona un tipo."));
if (adminStock) adminStock.addEventListener("input", () => marcarEstadoInput(adminStock, document.getElementById("error-admin-stock"), adminStock.value !== "" && Number(adminStock.value) >= 1 ? "" : "Mínimo 1 cupo."));
if (adminDesc) adminDesc.addEventListener("input", () => marcarEstadoInput(adminDesc, document.getElementById("error-admin-desc"), adminDesc.value.trim() ? "" : "Descripción obligatoria."));

if (formAdmin) {
  formAdmin.addEventListener("submit", function (e) {
    e.preventDefault();
    const vCod = marcarEstadoInput(adminCodigo, document.getElementById("error-admin-codigo"), adminCodigo.value.trim() ? "" : "Código obligatorio.");
    const vPre = marcarEstadoInput(adminPrecio, document.getElementById("error-admin-precio"), adminPrecio.value !== "" && Number(adminPrecio.value) >= 0 ? "" : "Precio inválido.");
    const vNom = marcarEstadoInput(adminNombre, document.getElementById("error-admin-nombre"), adminNombre.value.trim() ? "" : "Nombre obligatorio.");
    const vCat = marcarEstadoInput(adminCategoria, document.getElementById("error-admin-categoria"), adminCategoria.value ? "" : "Selecciona un tipo.");
    const vSto = marcarEstadoInput(adminStock, document.getElementById("error-admin-stock"), adminStock.value !== "" && Number(adminStock.value) >= 1 ? "" : "Mínimo 1 cupo.");
    const vDes = marcarEstadoInput(adminDesc, document.getElementById("error-admin-desc"), adminDesc.value.trim() ? "" : "Descripción obligatoria.");

    if (vCod && vPre && vNom && vCat && vSto && vDes) {
      catalogoServicios.push({
        codigo: adminCodigo.value.trim().toUpperCase(),
        tipo: adminCategoria.value,
        nombre: adminNombre.value.trim(),
        duracion: document.getElementById("admin-duracion").value.trim() || "30 min",
        modalidad: document.getElementById("admin-modalidad").value,
        precio: parseInt(adminPrecio.value, 10),
        stock: parseInt(adminStock.value, 10),
        desc: adminDesc.value.trim()
      });
      localStorage.setItem("catalogoNutriVida", JSON.stringify(catalogoServicios));
      renderizarCatalogo();
      renderizarTablaAdmin();
      formAdmin.reset();
      limpiarClasesValidacion(formAdmin);
    }
  });
}

// ==========================================
// 7. REGISTRO DE USUARIOS CON VALIDACIÓN EN VIVO
// ==========================================
const comunasPorRegion = {
  araucania: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol"],
  metropolitana: ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto"],
  biobio: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Los Ángeles"],
  valparaiso: ["Valparaíso", "Viña del Mar", "Villa Alemana", "Quilpué", "Concón"]
};

const regRut = document.getElementById("reg-rut");
const regRol = document.getElementById("reg-rol");
const regNombre = document.getElementById("reg-nombre");
const regApellidos = document.getElementById("reg-apellidos");
const regCorreo = document.getElementById("reg-correo");
const regRegion = document.getElementById("reg-region");
const regComuna = document.getElementById("reg-comuna");
const regDireccion = document.getElementById("reg-direccion");

function validarRegRutEnVivo() {
  const val = regRut.value.trim();
  if (!val) return marcarEstadoInput(regRut, document.getElementById("error-reg-rut"), "El RUT es obligatorio.");
  if (!validarRutChileno(val)) return marcarEstadoInput(regRut, document.getElementById("error-reg-rut"), "RUT inválido según dígito verificador (ej: 19011022K).");
  return marcarEstadoInput(regRut, document.getElementById("error-reg-rut"), "");
}

function validarRegRolEnVivo() {
  return marcarEstadoInput(regRol, document.getElementById("error-reg-rol"), regRol.value ? "" : "Selecciona un perfil.");
}

function validarRegNombreEnVivo() {
  return marcarEstadoInput(regNombre, document.getElementById("error-reg-nombre"), regNombre.value.trim().length >= 2 ? "" : "Ingresa tu nombre.");
}

function validarRegApellidosEnVivo() {
  return marcarEstadoInput(regApellidos, document.getElementById("error-reg-apellidos"), regApellidos.value.trim().length >= 2 ? "" : "Ingresa tus apellidos.");
}

function validarRegCorreoEnVivo() {
  const val = regCorreo.value.trim();
  if (!val) return marcarEstadoInput(regCorreo, document.getElementById("error-reg-correo"), "El correo es obligatorio.");
  if (!validarDominioCorreo(val)) return marcarEstadoInput(regCorreo, document.getElementById("error-reg-correo"), "Debe terminar en @duoc.cl, @duocuc.cl, @profesor.duoc.cl o @gmail.com.");
  return marcarEstadoInput(regCorreo, document.getElementById("error-reg-correo"), "");
}

function validarRegRegionEnVivo() {
  return marcarEstadoInput(regRegion, document.getElementById("error-reg-region"), regRegion.value ? "" : "Selecciona una región.");
}

function validarRegComunaEnVivo() {
  return marcarEstadoInput(regComuna, document.getElementById("error-reg-comuna"), regComuna.value ? "" : "Selecciona una comuna.");
}

function validarRegDireccionEnVivo() {
  return marcarEstadoInput(regDireccion, document.getElementById("error-reg-direccion"), regDireccion.value.trim().length >= 5 ? "" : "Ingresa una dirección válida.");
}

if (regRut) regRut.addEventListener("input", validarRegRutEnVivo);
if (regRol) regRol.addEventListener("change", validarRegRolEnVivo);
if (regNombre) regNombre.addEventListener("input", validarRegNombreEnVivo);
if (regApellidos) regApellidos.addEventListener("input", validarRegApellidosEnVivo);
if (regCorreo) regCorreo.addEventListener("input", validarRegCorreoEnVivo);
if (regComuna) regComuna.addEventListener("change", validarRegComunaEnVivo);
if (regDireccion) regDireccion.addEventListener("input", validarRegDireccionEnVivo);

if (regRegion && regComuna) {
  regRegion.addEventListener("change", function () {
    validarRegRegionEnVivo();
    const region = regRegion.value;
    regComuna.innerHTML = '<option value="">Selecciona una comuna</option>';
    regComuna.classList.remove("is-valid", "is-invalid");
    document.getElementById("error-reg-comuna").textContent = "";

    if (region && comunasPorRegion[region]) {
      regComuna.disabled = false;
      comunasPorRegion[region].forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.toLowerCase();
        opt.textContent = c;
        regComuna.appendChild(opt);
      });
    } else {
      regComuna.disabled = true;
    }
  });
}

const formRegistro = document.getElementById("form-registro");
if (formRegistro) {
  formRegistro.addEventListener("submit", function (e) {
    e.preventDefault();
    const v1 = validarRegRutEnVivo();
    const v2 = validarRegRolEnVivo();
    const v3 = validarRegNombreEnVivo();
    const v4 = validarRegApellidosEnVivo();
    const v5 = validarRegCorreoEnVivo();
    const v6 = validarRegRegionEnVivo();
    const v7 = validarRegComunaEnVivo();
    const v8 = validarRegDireccionEnVivo();

    if (v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8) {
      alert(`¡Usuario ${regNombre.value.trim()} ${regApellidos.value.trim()} registrado exitosamente en NutriVida!`);
      formRegistro.reset();
      limpiarClasesValidacion(formRegistro);
      regComuna.disabled = true;
      const modalEl = document.getElementById("modalRegistro");
      if (modalEl && window.bootstrap) bootstrap.Modal.getInstance(modalEl).hide();
    }
  });
}

// ==========================================
// 8. FORMULARIO DE CONTACTO CON VALIDACIÓN EN VIVO
// ==========================================
const contactoNombre = document.getElementById("contacto-nombre");
const contactoCorreo = document.getElementById("contacto-correo");
const contactoMensaje = document.getElementById("contacto-mensaje");
const contadorCaracteres = document.getElementById("contador-caracteres");

function validarContactoNombreEnVivo() {
  return marcarEstadoInput(contactoNombre, document.getElementById("error-contacto-nombre"), contactoNombre.value.trim().length >= 3 ? "" : "Ingresa tu nombre completo.");
}

function validarContactoCorreoEnVivo() {
  const val = contactoCorreo.value.trim();
  if (!val) return marcarEstadoInput(contactoCorreo, document.getElementById("error-contacto-correo"), "El correo es obligatorio.");
  if (!validarDominioCorreo(val)) return marcarEstadoInput(contactoCorreo, document.getElementById("error-contacto-correo"), "Usa un correo @duoc.cl, @duocuc.cl, @profesor.duoc.cl o @gmail.com.");
  return marcarEstadoInput(contactoCorreo, document.getElementById("error-contacto-correo"), "");
}

function validarContactoMensajeEnVivo() {
  if (contadorCaracteres) {
    contadorCaracteres.textContent = `${contactoMensaje.value.length} / 500`;
  }
  return marcarEstadoInput(contactoMensaje, document.getElementById("error-contacto-mensaje"), contactoMensaje.value.trim().length >= 10 ? "" : "Escribe tu consulta (mínimo 10 caracteres).");
}

if (contactoNombre) contactoNombre.addEventListener("input", validarContactoNombreEnVivo);
if (contactoCorreo) contactoCorreo.addEventListener("input", validarContactoCorreoEnVivo);
if (contactoMensaje) contactoMensaje.addEventListener("input", validarContactoMensajeEnVivo);

const formContacto = document.getElementById("form-contacto");
if (formContacto) {
  formContacto.addEventListener("submit", function (e) {
    e.preventDefault();
    const v1 = validarContactoNombreEnVivo();
    const v2 = validarContactoCorreoEnVivo();
    const v3 = validarContactoMensajeEnVivo();

    if (v1 && v2 && v3) {
      const exito = document.getElementById("mensaje-exito-contacto");
      exito.classList.remove("d-none");
      formContacto.reset();
      limpiarClasesValidacion(formContacto);
      if (contadorCaracteres) contadorCaracteres.textContent = "0 / 500";
      setTimeout(() => exito.classList.add("d-none"), 4000);
    }
  });
}

// Inicialización general al cargar
renderizarCatalogo();
renderizarNutricionistas();
renderizarTablaAdmin();
actualizarCarritoHTML();
aplicarEstadoSesion();