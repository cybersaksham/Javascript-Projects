// Grabbing hands
let hour = document.getElementById('hour');
let minute = document.getElementById('minute');
let second = document.getElementById('second');

// Starting
showClock();

// Each second
setInterval(() => {
    showClock();
}, 1000);

// Function to show clock
function showClock() {
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let format = "";

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
}