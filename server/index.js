import express from 'express';
import logger from 'morgan';

import { quote } from './quote.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/', express.static('client'));

// app.get('/weather', async(req, res) => {

// });

app.get('/quote', async(req, res) => {
    const newQuote = await quote.getQuote();
    res.status(200).json(newQuote)
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})