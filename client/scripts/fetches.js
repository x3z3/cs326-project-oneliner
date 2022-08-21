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
//     "endTime": "2022-08-21T06:00:00-04:00"
// }
async function getWeather() {
    const route = '/weather';
    const response = await fetch(url+route);
    const body = await response.json();
    return body;
}

export { getQuote, getWeather };