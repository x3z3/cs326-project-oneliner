import fetch from 'node-fetch'

class Weather {
    
    constructor() {
        // Amherst weather API URL
        this.url = 'https://api.weather.gov/gridpoints/BOX/22,69/forecast';
        this.weather = null;
    }

    async #fetchWeather() {
        const data = await fetch(this.url, {method:'GET'})
        const body = await data.json();
        // if API is doesnt work
        try {
            const weatherObj = body.properties.periods[0];
            this.weather = {
                temp : weatherObj.temperature,
                unit : weatherObj.temperatureUnit,
                isDayTime : weatherObj.isDayTime,
                icon : weatherObj.icon,
                endTime : weatherObj.endTime
            }
        } catch(err) {
            console.log(err);
            this.weather = {
                temp : NaN,
                unit : null,
                isDayTime : null,
                icon : '../resources/sad.png',
                endTime : null
            }
        }        
    }

    async updateWeather() {
        await this.#fetchWeather();
    }

    async getWeather() {
        if (!this.weather) {
            await this.#fetchWeather();
        } 
        return this.weather;
    }
}

const weather = new Weather();

export { weather };