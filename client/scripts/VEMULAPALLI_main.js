import { renderClock, renderSpotify, renderQuote } from "./VEMULAPALLI_render.js";
import { getDate } from "./date.js";
import { getQuote } from "./quotes.js"

const clockContainer = document.getElementById('clock-container');
const spotifyContainer = document.getElementById('spotify-container');
const quoteContainer = document.getElementById('quote-container');

let clock24Hour = false;

async function render() {
    renderClock(clockContainer, getDate(), clock24Hour);
    renderSpotify(spotifyContainer, null);
    renderQuote(quoteContainer, await getQuote());
    startClock();
}

function startClock() {
    setInterval(() => renderClock(clockContainer, getDate(), clock24Hour),1000);
}

clockContainer.addEventListener('click', () => {
    clock24Hour = !clock24Hour;
    renderClock(clockContainer, getDate(), clock24Hour);
});

render();