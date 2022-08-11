import { renderClock, renderSpotify } from "./VEMULAPALLI_render.js";
import { getDate } from "./date.js";

const clockContainer = document.getElementById('clock-container');
const spotifyContainer = document.getElementById('spotify-container');

function render() {
    startClock();
    renderSpotify(spotifyContainer, null);
}

function startClock() {
    setInterval(renderClock(clockContainer, getDate()),1000);
}

render();