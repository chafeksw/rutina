const calendar = document.getElementById('calendar');
const currentMonthEl = document.getElementById('currentMonth');
const routineContent = document.getElementById('routineContent');
let currentDate = new Date();

const routines = {
  "lunes": "Freestyle: 360 swing, tornado 360, ginger.",
  "martes": "Combos: Tuck planche, lean presses, flexiones de pino.",
  "miércoles": "Descanso",
  "jueves": "Plancha: Press olímpico, Tuck planche hold.",
  "viernes": "Front Lever: SAT, Touch.",
  "sábado": "Descanso",
  "domingo": "Plancha: Press olímpico, Tuck planche hold."
};


const getMonthDays = (year, month) => new Date(year, month + 1, 0).getDate();

const updateCalendar = () => {
  calendar.innerHTML = '';
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getMonthDays(year, month);

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  currentMonthEl.textContent = `${monthNames[month]} ${year}`;

  // Rellenar los días previos
  for (let i = 0; i < firstDay; i++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    calendar.appendChild(dayElement);
  }

  // Crear los días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.textContent = day;
    dayElement.classList.add('day');

    const dayOfWeek = new Date(year, month, day).toLocaleDateString('es-ES', { weekday: 'long' });
    if (routines[dayOfWeek]) {
      dayElement.classList.add(routines[dayOfWeek] === "Descanso" ? 'rest' : 'training');
      dayElement.addEventListener('click', () => {
        routineContent.textContent = `Rutina para ${dayOfWeek}: ${routines[dayOfWeek]}`;
      });
    }

    calendar.appendChild(dayElement);
  }
};

document.getElementById('prevMonth').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});

updateCalendar();

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
