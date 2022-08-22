import { getDate } from "./date.js";

function renderClock(element) {
  element.innerHTML = '';
  const current = getDate();
  const clock = document.createElement('div');
  clock.innerHTML = current.hour + ':' + current.minute;
  element.appendChild(clock);
}

function renderDate(element) {
  element.innerHTML = '';
  const date = document.createElement('div');
  date.innerHTML = new Date().toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"}) ;
  element.appendChild(date);
}

function renderWeather(element) {

}

function renderTasks(element) {
  
}

function renderNotes(element) {

}


export {
  renderClock,
  renderDate,
  renderWeather,
  renderTasks,
  renderNotes
};