import { renderClock, renderSpotify, renderQuote, renderWeather } from "./VEMULAPALLI_render.js";
import { getDate } from "./date.js";
import { getQuote, getWeather } from "./fetches.js"
import { theme } from "./themes.js"

const clockContainer = document.getElementById('clock-container');
const spotifyContainer = document.getElementById('spotify-container');
const quoteContainer = document.getElementById('quote-container');
const weatherContainer = document.getElementById('weather-container');
const themeButton = document.getElementById('theme-button');
const root = document.querySelector(':root');

let clock24Hour = true;
let f_c = true;

async function render() {
    renderClock(clockContainer, getDate(), clock24Hour);
    renderSpotify(spotifyContainer, null);
    renderQuote(quoteContainer, await getQuote());
    renderWeather(weatherContainer, await getWeather(), f_c);
    startClock();
    startFetchTimers();
}

function startClock() {
    setInterval(() => renderClock(clockContainer, getDate(), clock24Hour),1000);
}

function startFetchTimers() {
    // Refreshes every 10 mins
    setInterval(async () => {
        renderQuote(quoteContainer, await getQuote());
        renderWeather(weatherContainer, await getWeather(), f_c);
    }, 600000);
}

clockContainer.addEventListener('click', () => {
    clock24Hour = !clock24Hour;
    renderClock(clockContainer, getDate(), clock24Hour);
});

weatherContainer.addEventListener('click', async () => {
    f_c = !f_c;
    renderWeather(weatherContainer, await getWeather(), f_c);
});

themeButton.addEventListener('click', () => {
    theme.toggleTheme(root);
});

render();