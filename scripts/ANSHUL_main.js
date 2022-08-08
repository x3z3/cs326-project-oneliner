import { getDate } from "./ANSHUL_date.js";
import { renderClock } from "./ANSHUL_render.js";

function render() {
    renderClock(getDate());
}

function updateTime() {
    const timeObj = getDate();
    renderClock(timeObj);
}

render();