// Returns a date object with the current time
// {hour: number, minute: string, dayOfWeek: string, month: string, date: string, year: number}
// Example: {hour: '07', minute: '00', dayOfWeek: "Monday", month: "January", date: "1st", year: 2020}
function getDate() {
    const time = new Date();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const month = time.getMonth();
    const date = time.getDate();
    const year = time.getFullYear();
    const dayOfWeek = time.getDay();

    return {
        hour: ('00' + hour).slice(-2),
        minute: ('00' + minute).slice(-2),
        month: month_map[month],
        date: date_suffix(date),
        year: year,
        dayOfWeek: day_map[dayOfWeek]
    }
}

const date_suffix = function(date) {
    if (date === 1 || date === 21 || date === 31) {
        return date + "st";
    }
    if (date === 2 || date === 22) {
        return date + "nd";
    }
    if (date === 3 || date === 23) {
        return date + "rd";
    }
    return date + "th";
}

const month_map = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
}

const day_map = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
}

export { getDate };