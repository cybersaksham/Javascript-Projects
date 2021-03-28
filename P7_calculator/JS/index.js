// Grabbing Elements
const screen = document.getElementById('screen');
const buttons = document.getElementsByClassName('keys');
let screenValue = "";
let restart = false;

// Target the buttons
for (item of buttons) {
    item.addEventListener('click', (e) => {
        let buttonText = e.target.innerText;
        if (restart) {
            screenValue = "";
            restart = false;
        }
        if (buttonText == 'X') {
            buttonText = '*';
            screenValue += buttonText
        } else if (buttonText == "C") {
            screenValue = "";
        }
        else if (buttonText == "=") {
            restart = true;
            screenValue = eval(screenValue);
        } else {
            screenValue += buttonText;
        }
        screen.value = screenValue;
    })
}