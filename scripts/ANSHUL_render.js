
function renderClock(timeObject) {
    const clockContainer = document.getElementById('clock-container');
    clockContainer.innerHTML = '';
    // Time
    const time = document.createElement('div');
    time.classList.add('clock-time');
    time.innerHTML = timeObject.hour + ":" + timeObject.minute;
    clockContainer.appendChild(time);
    // Date
    const date = document.createElement('div');
    date.classList.add('clock-date');
    date.innerHTML = timeObject.month + " " + timeObject.date + " " + timeObject.year;
    clockContainer.appendChild(date);
    // Day
    const day = document.createElement('div');
    day.classList.add('clock-day');
    day.innerHTML = timeObject.dayOfWeek;
    clockContainer.appendChild(day);
}

export { renderClock };