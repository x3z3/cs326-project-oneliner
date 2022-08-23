const url = 'http://localhost:3000';

// Returns a quote object
// { 
//  q: 'a quote',
//  a: 'author name',
//  h: 'html render of quote and author'
// }
async function getQuote() {
    const route = '/quote';
    const response = await fetch(url+route);
    const body = await response.json();
    return body;
}

// Returns a weather object
// {
//     "temp": 64,
//     "unit": "F",
//     "icon": "https://api.weather.gov/icons/land/night/sct?size=medium",  
//     "endTime": "2022-08-21T06:00:00-04:00"                               -- Can be ignored
// }
// In case the weather API is down, returns a default object:
//  this.weather = {temp : NaN, unit : null, isDayTime : null, icon : '../resources/sad.png', endTime : null }
async function getWeather() {
    const route = '/weather';
    const response = await fetch(url+route);
    const body = await response.json();
    return body;
}

async function postLogin(username, password) {
    const route = '/login';
    const response = await fetch(url+route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    const body = await response.json();
    return body;
}

async function postRegister(username, password) {
    const route = '/register';
    const response = await fetch(url+route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    const body = await response.json();
    return body;
}

async function saveNotes(notes, username) {
    const route = '/notes/save';
    const response = await fetch(url+route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            content: notes
        })
    });
    const body = await response.json();
    return body;
}

async function getNotes(username) {
    const route = '/notes/fetch';
    const response = await fetch(url+route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username
        })
    });
    const body = await response.json();
    return body.content;
}

async function saveTasks(tasks, username) {
    console.log(tasks);
    const route = '/tasks/save';
    const response = await fetch(url+route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            content: tasks
        })
    });
    const body = await response.json();
    return body;
}

async function getTasks(username) {
    const route = '/tasks/fetch';
    const response = await fetch(url+route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username
        })
    });
    const body = await response.json();
    return body.content;
}

export { getQuote, getWeather, postLogin, postRegister, saveNotes, getNotes, saveTasks, getTasks };