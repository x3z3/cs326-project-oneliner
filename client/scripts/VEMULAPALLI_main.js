import { renderClock, renderSpotify, renderQuote } from "./VEMULAPALLI_render.js";
import { getDate } from "./date.js";
import { getQuote } from "./quotes.js"

const clockContainer = document.getElementById('clock-container');
const spotifyContainer = document.getElementById('spotify-container');
const quoteContainer = document.getElementById('quote-container');

async function render() {
    renderClock(clockContainer, getDate())
    renderSpotify(spotifyContainer, null);
    renderQuote(quoteContainer, await getQuote());
    startClock();
}

function startClock() {
    setInterval(() => renderClock(clockContainer, getDate()),1000);
}

render();