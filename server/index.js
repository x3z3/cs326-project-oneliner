import express from 'express';
import logger from 'morgan';

import { quote } from './quote.js'
import { weather } from './weather.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/', express.static('client'));

app.get('/weather', async(req, res) => {
    const curWeather = await weather.getWeather();
    res.status(200).json(curWeather);
});

app.get('/quote', async(req, res) => {
    const newQuote = await quote.getQuote();
    res.status(200).json(newQuote);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    startTimers();
})

function startTimers() {
    // Every hour
    setInterval(async() => {
        await weather.updateWeather();
        await quote.updateQuote();
        console.log('Updated');
    }, 3600000);
}