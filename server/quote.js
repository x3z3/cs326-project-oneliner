import fetch from 'node-fetch'

class Quote {

    constructor() {
        this.path = './server/quoteDB.json';
        this.url = 'https://zenquotes.io/api/today';
        this.quote = null;
    }

    async #fetchQuote() {
        const data = await fetch(this.url, {method:'GET'})
        const body = await data.json();
        this.quote = body[0];
    }

    async updateQuote() {
        await this.#fetchQuote();
    }
   
    async getQuote() {
        if (!this.quote)  {
            await this.#fetchQuote();
        }
        return this.quote;
    }
}

const quote = new Quote();

export { quote };