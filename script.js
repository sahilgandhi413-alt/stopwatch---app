// Stopwatch Variables
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

let timer = null;
let isRunning = false;
let lapCount = 1;

// DOM Elements
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");
const themeBtn = document.getElementById("themeBtn");

// Format Number
function format(value) {
    return value < 10 ? "0" + value : value;
}

// Update Display
function updateDisplay() {
    hoursEl.textContent = format(hours);
    minutesEl.textContent = format(minutes);
    secondsEl.textContent = format(seconds);
    millisecondsEl.textContent = format(Math.floor(milliseconds / 10));
}

// Start Timer
function startTimer() {

    if (isRunning) return;

    isRunning = true;

    timer = setInterval(() => {

        milliseconds++;

        if (milliseconds === 100) {
            milliseconds = 0;
            seconds++;
        }

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }

        updateDisplay();

    }, 10);

}

// Stop Timer
function stopTimer() {

    clearInterval(timer);
    isRunning = false;

}

// Reset Timer
function resetTimer() {

    clearInterval(timer);

    isRunning = false;

    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;

    lapCount = 1;

    lapList.innerHTML = "";

    updateDisplay();

}

// Lap Function
function addLap() {

    if (!isRunning) return;

    const li = document.createElement("li");

    li.innerHTML = `
        <span>Lap ${lapCount++}</span>
        <span>${format(hours)}:${format(minutes)}:${format(seconds)}.${format(Math.floor(milliseconds / 10))}</span>
    `;

    lapList.prepend(li);

}

// Dark Mode
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("dark")) {
        icon.classList.replace("fa-moon", "fa-sun");
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
    }

});

// Button Events
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);

// Keyboard Shortcuts
document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {
        e.preventDefault();

        if (isRunning)
            stopTimer();
        else
            startTimer();
    }

    if (e.key.toLowerCase() === "r")
        resetTimer();

    if (e.key.toLowerCase() === "l")
        addLap();

});

// Initialize
updateDisplay();