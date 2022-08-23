import { renderClock, renderSpotify, renderHistButton, renderStoreButton, renderLogin, renderQuote, renderWeather } from "./VEMULAPALLI_render.js";
import { getDate } from "./date.js";
import { getQuote, getWeather, postLogin, postRegister } from "./fetches.js"
import { theme } from "./themes.js"

const root = document.querySelector(':root');

const clockContainer = document.getElementById('clock-container');
const interactiveContainer = document.getElementById('interactive-container');
const quoteContainer = document.getElementById('quote-container');
const weatherContainer = document.getElementById('weather-container');
const themeButton = document.getElementById('theme-button');
const storeBtn = document.getElementById('block-btn1');
const histBtn = document.getElementById('block-btn2');

let userName = '';

let clock24Hour = true;
let f_c = true;

async function renderLoginPage() {
    renderClock(clockContainer, getDate(), clock24Hour);
    renderLogin(interactiveContainer);
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    loginBtn.addEventListener('click', async () => {
        const userInput = document.getElementById('user-input');
        const passInput = document.getElementById('pass-input');
        const resp = await postLogin(userInput.value, passInput.value);
        if (resp.status === 'success') {
            userName = userInput.value;
            await renderUnlockedPage();
        } else {
            alert('Invalid credentials');
            renderLogin(interactiveContainer);
        }
    });
    registerBtn.addEventListener('click', async () => {
        const userInput = document.getElementById('user-input');
        const passInput = document.getElementById('pass-input');
        const resp = await postRegister(userInput.value, passInput.value);
        if (resp.status === 'success') {
            userName = userInput.value;
            await renderUnlockedPage();
        } else {
            alert('User already exists');
            renderLogin(interactiveContainer);
        }
    });
    renderQuote(quoteContainer, await getQuote());
    renderWeather(weatherContainer, await getWeather(), f_c);
    startClock();
    startFetchTimers();
}

async function renderUnlockedPage() {
    renderSpotify(interactiveContainer, null);
    renderHistButton(histBtn);
    renderStoreButton(storeBtn);
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

renderLoginPage();