import fetch from 'node-fetch'
import { jsfs } from './jsonfs.js';

class Quote {

    constructor() {
        this.path = './server/quoteDB.json';
        this.url = 'https://zenquotes.io/api/today';
        this.quote = null;
    }

    async #fetchQuote() {
        const data = await fetch(this.url, {method:'GET'})
        const body = await data.json();
        return body[0];
    }

    async #writeQuote(quote) {
        const data = {
            quote: quote,
            date: new Date()
        }
        const response = await jsfs.writeFile(data, this.path);
        if (response.status === 'success') {
            return response.data;
        } else {
            return response;
        }
    }

    async #readQuote() {
        const response = await jsfs.readFile(this.path);
        if (response.status === 'success') {
            // return cached quote
            this.quote = response.data.quote;
            return this.quote;
        } else if (response.status === 'fileDNE') {
            const newQuote = (await this.#fetchQuote());
            await this.#writeQuote(newQuote);
            return newQuote;
        } else {
            return response;
        }
    }

    async updateQuote() {
        this.quote = await this.#fetchQuote();
        await this.#writeQuote(this.quote)
        return this.quote;
    }
   
    async getQuote() {
        return this.quote ? this.quote : this.#readQuote();
    }

}

const quote = new Quote();

export { quote };