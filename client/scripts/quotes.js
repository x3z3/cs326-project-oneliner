// Returns a quote object
// { 
//  q: 'a quote',
//  a: 'author name',
//  h: 'html render of quote and author'
// }
const url = 'http://localhost:3000';
const route = '/quote';

async function getQuote() {
    const response = await fetch(url+route);
    const body = await response.json();
    return body;
}

export { getQuote };