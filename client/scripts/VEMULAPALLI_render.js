function renderClock(element, timeObject, clock24format) {
    element.innerHTML = '';
    // Time
    const time = document.createElement('div');
    time.classList.add('clock-time');
    if (clock24format) {
        time.innerHTML = timeObject.hour + ":" + timeObject.minute;
    } else {
        const suffix = timeObject.hour/12 >= 1 ? 'PM' : 'AM';
        let hour = timeObject.hour%12;
        if (hour === 0) {
            hour = 12;
        }
        time.innerHTML = hour + ":" + timeObject.minute + ' '  + suffix;
    }
    element.appendChild(time);
    // Day
    const day = document.createElement('div');
    day.classList.add('clock-day');
    day.innerHTML = timeObject.dayOfWeek;
    element.appendChild(day);
    // Date
    const date = document.createElement('div');
    date.classList.add('clock-date');
    date.innerHTML = timeObject.month + " " + timeObject.date + " " + timeObject.year;
    element.appendChild(date);
}

function renderSpotify(element, songData) {
    element.innerHTML = '';
    // Spotify container
    const spotifyContainer = document.createElement('div');
    spotifyContainer.classList.add('spotify-container');
    element.appendChild(spotifyContainer);

    // Left portion
    const leftContainer = document.createElement('div');
    leftContainer.classList.add('spotify-left');
    spotifyContainer.appendChild(leftContainer);
    // Spotify img slot
    const imgSlot1 = document.createElement('div');
    imgSlot1.classList.add('img-slot');
    leftContainer.appendChild(imgSlot1);
    // Spotify img
    const spotifyImg = document.createElement('img');
    spotifyImg.src = 'client_resources/white_spotify.png';
    spotifyImg.classList.add('img-circ');
    imgSlot1.appendChild(spotifyImg);

    // Middle portion
    const middleContainer = document.createElement('div');
    middleContainer.classList.add('spotify-mid');
    spotifyContainer.appendChild(middleContainer);
    
    // Spotify track
    const spotifyTrack = document.createElement('div');
    spotifyTrack.classList.add('spotify-track');
    middleContainer.appendChild(spotifyTrack);
    // Spotify track title
    const spotifyTitle = document.createElement('div');
    spotifyTitle.classList.add('spotify-title');
    spotifyTitle.innerHTML = 'November';
    spotifyTrack.appendChild(spotifyTitle);
    // Spotify track artist
    const spotifyArtist = document.createElement('div');
    spotifyArtist.classList.add('spotify-artist');
    spotifyArtist.innerHTML = 'Psychadelic Porn Crumpets';
    spotifyTrack.appendChild(spotifyArtist);
    // Spotify progress
    const spotifyProgress = document.createElement('div');
    spotifyProgress.classList.add('spotify-progress');
    spotifyProgress.innerHTML = '0:00 / 0:00';
    spotifyTrack.appendChild(spotifyProgress);

    // Spotify controller
    const spotifyController = document.createElement('div');
    spotifyController.classList.add('spotify-controller');
    middleContainer.appendChild(spotifyController);

    // Spotify prev button
    const spotifyPrev = document.createElement('div');
    spotifyPrev.id = 'spotify-prev';
    spotifyPrev.classList.add('spotify-btn');
    spotifyPrev.innerHTML = '<';
    spotifyController.appendChild(spotifyPrev);
    // Spotify play button
    const spotifyPlay = document.createElement('div');
    spotifyPlay.id = 'spotify-play';
    spotifyPlay.classList.add('spotify-btn');
    spotifyPlay.innerHTML = 'P';
    spotifyController.appendChild(spotifyPlay);
    // Spotify next button
    const spotifyNext = document.createElement('div');
    spotifyNext.id = 'spotify-next';
    spotifyNext.classList.add('spotify-btn');
    spotifyNext.innerHTML = '>';
    spotifyController.appendChild(spotifyNext);

    // Right portion
    const rightContainer = document.createElement('div');
    rightContainer.classList.add('spotify-right');
    spotifyContainer.appendChild(rightContainer);
    // Album img slot
    const imgSlot2 = document.createElement('div');
    imgSlot2.classList.add('img-slot');
    rightContainer.appendChild(imgSlot2);
    // Album img
    const spotifyAlbum = document.createElement('img');
    spotifyAlbum.src = 'client_resources/album.jpg';
    spotifyAlbum.classList.add('img-circ');
    imgSlot2.appendChild(spotifyAlbum);

}

function renderQuote(element, quote) {
    let html = '';
    html += quote.q;
    html += ' -'
    html += quote.a;
    element.innerHTML = html;
}

function renderWeather(element, weather, f_c) {
    let temp = '';
    if (f_c) {
        temp = weather.temp + ' ' + weather.unit;
    } else {
        temp = Math.floor(((weather.temp-32)*5)/9) + ' ' + 'C';
    }

    element.innerHTML = '';
    const weatherTemp = document.createElement('div');
    weatherTemp.classList.add('weather-temp');

    const weatherText = document.createElement('div');
    weatherText.classList.add('weather-text');
    weatherText.innerHTML = temp;

    weatherTemp.appendChild(weatherText);

    const weatherIcon = document.createElement('div');
    weatherIcon.classList.add('weather-icon');

    const weatherImg = document.createElement('img');
    weatherImg.classList.add('img-circ');
    weatherImg.src = weather.icon;
    weatherIcon.appendChild(weatherImg)

    element.appendChild(weatherTemp);
    element.appendChild(weatherIcon);

}

function clearElement(element) {
    element.innerHTML = '';
}

export { renderClock, renderSpotify, renderQuote, renderWeather, clearElement };