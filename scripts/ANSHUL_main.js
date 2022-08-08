import { getDate } from "./ANSHUL_date.js";

function updateTime() {
    const dateObj = getDate();
    const time = document.getElementById("clock-time");
    const date = document.getElementById("clock-date");
    const day = document.getElementById("clock-day");
    time.innerHTML = dateObj.hour + ":" + dateObj.minute;
    date.innerHTML = dateObj.month + " " + dateObj.date + " " + dateObj.year;
    day.innerHTML = dateObj.dayOfWeek;
}

updateTime();