// Array de turnos (cargado desde localStorage)
let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

// Constructor
class Turno {
  constructor(id, nombre, fecha, hora, servicio) {
    this.id = id;
    this.nombre = nombre;
    this.fecha = fecha;
    this.hora = hora;
    this.servicio = servicio;
  }
}

// Referencias
const form = document.getElementById("form-turno");
const lista = document.getElementById("lista-turnos");

// Eventos
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const servicio = document.getElementById("servicio").value;

  if (nombre && fecha && hora && servicio) {
    const nuevoTurno = new Turno(Date.now(), nombre, fecha, hora, servicio);
    turnos.push(nuevoTurno);
    localStorage.setItem("turnos", JSON.stringify(turnos));
    form.reset();
    renderizarTurnos(); // 👈 Esto muestra el turno en pantalla
  }
});

// Renderizar turnos
function renderizarTurnos() {
  lista.innerHTML = "";

  if (turnos.length === 0) {
    lista.innerHTML = "<p>No hay turnos agendados.</p>";
    return;
  }

  turnos.forEach((turno) => {
    const div = document.createElement("div");
    div.classList.add("tarjeta-turno");
    div.innerHTML = `
      <div>
        <p><strong>Nombre:</strong> ${turno.nombre}</p>
        <p><strong>Fecha:</strong> ${turno.fecha}</p>
        <p><strong>Hora:</strong> ${turno.hora}</p>
        <p><strong>Servicio:</strong> ${turno.servicio}</p>
      </div>
      <button onclick="eliminarTurno(${turno.id})">Cancelar</button>
    `;
    lista.appendChild(div);
  });
}

// Eliminar turno
function eliminarTurno(id) {
  turnos = turnos.filter((t) => t.id !== id);
  localStorage.setItem("turnos", JSON.stringify(turnos));
  renderizarTurnos();
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  renderizarTurnos();
});