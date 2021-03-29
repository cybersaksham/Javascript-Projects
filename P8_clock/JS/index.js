// Grabbing hands
let hour = document.getElementById('hour');
let minute = document.getElementById('minute');
let second = document.getElementById('second');

let time = document.getElementById('time');

// Starting
showClock();

// Each second
setInterval(() => {
    showClock();
    let tick = new Audio('Gallery/tick.mp3');
    tick.play();
    setTimeout(() => {
        tick.pause();
    }, 1000);
}, 1000);

// Function to show clock
function showClock() {
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let dateShow = `${d.getDate()}`;
    let monthShow = `${d.getMonth() + 1}`;
    let yearShow = `${d.getFullYear() % 2000}`;
    let format = "";
    let dateStr = "";

    // Converting hour into 12 hour format
    if (hours >= 12) {
        hours = hours - 12;
        format = "PM";
    } else {
        format = "AM";
    }

    // Calculating rotation
    let hRot = (hours * 30) + (minutes * 0.5) + (seconds * (1 / 120));
    let mRot = (minutes * 6) + (seconds * 0.1);
    let sRot = (seconds * 6);

    // Rotating hands
    hour.style.transform = `rotate(${hRot}deg)`;
    minute.style.transform = `rotate(${mRot}deg)`;
    second.style.transform = `rotate(${sRot}deg)`;

    // Converting in 2 digits
    if (d.getDate() < 10) {
        dateShow = `0${d.getDate()}`;
    }
    if (d.getMonth() < 9) {
        monthShow = `0${d.getMonth() + 1}`;
    }

    // Time formatting
    if (hours == 0) {
        hours = 12;
    }
    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    // Printing date & format
    dateStr = `<p>${hours}-${minutes}-${seconds} ${format}</p><p>${dateShow}/${monthShow}/${yearShow}</p>`;
    time.innerHTML = dateStr;
}