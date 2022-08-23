import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import expressSession from 'express-session';
import { fileURLToPath } from 'url';

import users from './users.js';
import auth from './auth.js';
import { quote } from './quote.js'
import { weather } from './weather.js';
import * as crud from './crud.js';

import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.CONNECTION_URI, { useUnifiedTopology: true });

const __filename = fileURLToPath(import.meta.url);

const sessionConfig = {
    secret: process.env.SECRET || 'SECRET',
    resave: false,
    saveUninitialized: false,
};

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession(sessionConfig));
app.use(logger('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/')
    }
}

app.use('/', express.static('client'));

// Anshul
app.get('/weather', async(req, res) => {
    const curWeather = await weather.getWeather();
    res.status(200).json(curWeather);
});

// Anshul
app.get('/quote', async(req, res) => {
    const newQuote = await quote.getQuote();
    res.status(200).json(newQuote);
});

app.post('/login', auth.authenticate('local', { failureRedirect: '/' }), (req, res) => {
    res.status(200).json({status: 'success'});
});

app.post('/register', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const result = users.addUser(username, password);
    if (result) {
        res.status(200).json({status: 'success'});
    } else {
        res.status(400).json({status: 'user exists'});
    }
});

// Felicia
app.post('/notes/save', async function(req, res) {
  // Protected route
  // app.post('/notes/save', checkLoggedIn, async function(req, res) {
  await client.connect().catch(e => console.log(e));
  try {
    await client.connect();
    const collection = await client.db('oneliner').collection('notes');
    console.log("Connected to: " + collection.namespace);
    await crud.saveEntry(req.body.username, req.body.content, collection);
    res.status(200).send({status: "Successfully saved notes"});
  } catch (e) {
    console.error(e);
    res.status(500).send("Error saving notes");
  }
  await client.close();
});

// Felicia
app.post('/notes/delete', async function(req, res) {
  // Protected route
  // app.post('/notes/delete', checkLoggedIn, async function(req, res) {
  await client.connect().catch(e => console.log(e));
  try {
    await client.connect();
    const collection = await client.db('oneliner').collection('notes');
    console.log("Connected to: " + collection.namespace);
    await crud.deleteEntry(req.body.username, collection);
    res.status(200).send({status: "Successfully deleted notes"});
  } catch (e) {
    console.error(e);
    res.status(500).send("Error deleting notes");
  }
  await client.close();
});

// Anshul
app.post('/notes/fetch', async function(req, res) {
  // Protected route
  // app.post('/notes/fetch', checkLoggedIn, async function(req, res) {
  await client.connect().catch(e => console.log(e));
  try {
    await client.connect();
    const collection = await client.db('oneliner').collection('notes');
    console.log("Connected to: " + collection.namespace);
    const content = await crud.fetchContent(req.body.username, collection);
    res.status(200).send({content: content});
  } catch (e) {
    console.error(e);
    res.status(500).send("Error fetching notes");
  }
  await client.close();
});

// Felicia
app.post('/tasks/save', async function(req, res) {
  // Protected route
  // app.post('/tasks/save', checkLoggedIn async function(req, res) {
  await client.connect().catch(e => console.log(e));
  try {
    await client.connect();
    const collection = await client.db('oneliner').collection('tasks');
    console.log("Connected to: " + collection.namespace);
    await crud.saveEntry(req.body.username, req.body.content, collection);
    res.status(200).send({status:"Successfully saved tasks"});
  } catch (e) {
    console.error(e);
    res.status(500).send("Error saving tasks");
  }
  await client.close();
});

// Felicia
app.post('/tasks/delete', async function(req, res) {
  // Protected route
  // app.post('/tasks/delete', checkLoggedIn, async function(req, res) {
  await client.connect().catch(e => console.log(e));
  try {
    await client.connect();
    const collection = await client.db('oneliner').collection('tasks');
    console.log("Connected to: " + collection.namespace);
    await crud.deleteEntry(req.body.username, collection);
    res.status(200).send({status: "Successfully deleted tasks"});
  } catch (e) {
    console.error(e);
    res.status(500).send("Error deleting tasks");
  }
  await client.close();
});

// Anshul
app.post('/tasks/fetch', async function(req, res) {
  // Protected route
  // app.post('/tasks/fetch', checkLoggedIn, async function(req, res) {
  await client.connect().catch(e => console.log(e));
  try {
    await client.connect();
    const collection = await client.db('oneliner').collection('tasks');
    console.log("Connected to: " + collection.namespace);
    const content = await crud.fetchContent(req.body.username, collection);
    res.status(200).send({content: content});
  } catch (e) {
    console.error(e);
    res.status(500).send("Error fetching tasks");
  }
  await client.close();
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
    }, 3600000);
}