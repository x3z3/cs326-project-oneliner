import { renderClock, renderDate, renderWeather, renderTasks, renderNotes } from "./felicia_render.js";

const pageContainer = document.getElementById('page-container');
const clockContainer = document.getElementById('clock-container');
const dateContainer = document.getElementById('date-container');

function render() {
  renderClock(clockContainer);
  renderDate(dateContainer);
}

render();