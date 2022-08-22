import express from 'express';
import logger from 'morgan';

import { quote } from './quote.js'
import { weather } from './weather.js';

const app = express();
const port = process.env.PORT || 3000;

/* ---------- Setup ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

/* ---------- API ---------- */
app.use('/', express.static('client'));

// Anshul
app.get('/weather', async(req, res) => {
    const curWeather = await weather.getWeather();
    res.status(200).json(curWeather);
});

app.get('/quote', async(req, res) => {
    const newQuote = await quote.getQuote();
    res.status(200).json(newQuote);
});

// Felicia
app.get('/notes', async(req, res) => {
  
});

app.post('/notes', async(req, res) => {
  
});

app.get('/tasks', async(req, res) => {
  
});

app.post('/tasks', async(req, res) => {
  
});


/* ---------- Start server ---------- */
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    startTimers();
})

function startTimers() {
    // Every hour
    setInterval(async() => {
        await weather.updateWeather();
        await quote.updateQuote();
    }, 3600000);
}