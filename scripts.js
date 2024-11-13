const calendar = document.getElementById('calendar');
const currentMonthEl = document.getElementById('currentMonth');
const routineContent = document.getElementById('routineContent');

let currentDate = new Date();
const routines = {
  "lunes": "Combos",
  "martes": "Front Lever",
  "miércoles": "Descanso",
  "jueves": "Planche",
  "viernes": "Combos",
  "sábado": "Front Lever",
  "domingo": "Descanso",
};

const getMonthDays = (year, month) => new Date(year, month + 1, 0).getDate();

const renderCalendar = (date) => {
  calendar.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getMonthDays(year, month);

  currentMonthEl.textContent = date.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric"
  });

  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += `<div class="day empty"></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const thisDate = new Date(year, month, day);
    const weekDay = thisDate.toLocaleDateString("es-ES", { weekday: "long" }).toLowerCase();
    const routine = routines[weekDay] || "Descanso";

    let dayClass = routine === "Descanso" ? "rest" : "training";
    
    const dayEl = document.createElement('div');
    dayEl.classList.add('day', dayClass);
    dayEl.textContent = day;
    dayEl.onclick = () => showRoutineDetail(weekDay, routine);
    
    calendar.appendChild(dayEl);
  }
};

const showRoutineDetail = (day, routine) => {
  routineContent.innerHTML = `
    <h4>${day.charAt(0).toUpperCase() + day.slice(1)}</h4>
    <p>Hoy te toca: <strong>${routine}</strong></p>
    <p>Rutina: ${routine === "Combos" ? "Series de movimientos combinados" :
                 routine === "Front Lever" ? "Ejercicios para Front Lever" :
                 routine === "Planche" ? "Entrenamiento de Planche" : "Día de descanso"}</p>`;
};

document.getElementById('prevMonth').onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
};

document.getElementById('nextMonth').onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
};

renderCalendar(currentDate);

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
