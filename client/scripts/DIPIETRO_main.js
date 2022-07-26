import * as crud from './crud.js';

const clock = new Date();
const timeContainer = document.getElementById('time-container');
const dateContainer = document.getElementById('date-container');
const notesTextBox = document.getElementById('notes-textbox');
const saveNotesButton = document.getElementById('save-notes-button');
const tasksTextBox = document.getElementById('tasks-textbox');
const saveTasksButton = document.getElementById('save-tasks-button');

saveNotesButton.addEventListener('click', async function(e) {
  const notes = {
    date: clock.toLocaleDateString('en-US'),
    content: notesTextBox.value,
  };
  await crud.saveNotes(notes);
});

saveTasksButton.addEventListener('click', async function(e) {
  const tasks = {
    date: clock.toLocaleDateString('en-US'),
    content: tasksTextBox.value,
  };
  await crud.saveTasks(tasks);
});

function renderTime(element) {
  element.innerHTML = '';
  const display = document.createElement('div');
  display.innerHTML = clock.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  element.appendChild(display);
}

function renderDate(element) {
  element.innerHTML = '';
  const display = document.createElement('div');
  display.innerHTML = clock.toLocaleDateString('en-US');
  element.appendChild(display);
}

function startClock() {
  setInterval(() => renderTime(timeContainer), 1000);
  setInterval(() => renderDate(dateContainer), 10000);
}

renderTime(timeContainer);
renderDate(dateContainer);
startClock();