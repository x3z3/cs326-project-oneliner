import { renderClock } from "./ANSHUL_render.js";
import { getDate } from "./date.js";

const clockContainer = document.getElementById('clock-container');

function render() {
    renderClock(clockContainer, getDate());
}

function updateTime() {
    const timeObj = getDate();
    renderClock(timeObj);
}

render();