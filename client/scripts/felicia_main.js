import { renderClock, renderWeather, renderTasks, renderNotes } from "./felicia_render.js";

const container = document.getElementById('container');

function render(element) {
  const content = document.createElement('div');
  element.appendChild(content);
}

render(container);