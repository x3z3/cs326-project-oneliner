
function renderClock(element, timeObject) {
    element.innerHTML = '';
    // Time
    const time = document.createElement('div');
    time.classList.add('clock-time');
    time.innerHTML = timeObject.hour + ":" + timeObject.minute;
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

export { renderClock };