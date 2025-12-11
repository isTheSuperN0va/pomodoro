focusSettings = document.getElementsByClassName("focus-time");
breakSettings = document.getElementsByClassName("break-time");
startBtn = document.getElementById("start-btn");
timer = document.getElementById("timer");
numFields = document.getElementsByClassName("num-field");

intervalID = null;
time = 0;

focusSeconds = 0;
breakSeconds = 0;
onBreak = false;

functionSetupInputUpdater(focusSettings);
functionSetupInputUpdater(breakSettings);

updateTime();
updateTimer();

function updateTime() {
    focusSeconds = calcTotalSecs(focusSettings);
    breakSeconds = calcTotalSecs(breakSettings);

    if (onBreak) { time = breakSeconds; }
    else { time = focusSeconds }
}

function updateTimer() {
    let timeSeconds = (time % 60).toString().padStart(2, '0');
    let timeMinutes = ((Math.trunc(time / 60)) % 60).toString().padStart(2, '0');
    let timeHours = ((Math.trunc(time / 3600)) % 24).toString().padStart(2, '0');

    timer.innerText = `${timeHours}:${timeMinutes}:${timeSeconds}`;


}

function calcTotalSecs(settings) {
    let totalSecs = 0;

    totalSecs += parseInt(settings[0].value) * 3600;
    totalSecs += parseInt(settings[1].value) * 60;
    totalSecs += parseInt(settings[2].value) * 1;

    return totalSecs
}

function decreaseSecond() {
    time--;
    
    if (time <= 0) {
        clearInterval(intervalID);
        alert("Acabou!")
        onBreak = !onBreak;
        console.log("on break: " + onBreak)
    }

    updateTimer();

    console.log(time)
}

function functionSetupInputUpdater(settings) {
    Array.from(settings).forEach(field => {
    field.addEventListener("input", () => {
            updateTime();
            updateTimer();
        })
    })
}

startBtn.addEventListener("click", () => {
    if (!intervalID) {
        updateTime();
        intervalID = setInterval(decreaseSecond, 1000);
    }
})

