let timeLeft = 25 * 60; // 25 minutos
let timerInterval = null;
let isRunning = false;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startPomodoro() {
    if (isRunning) return;
    isRunning = true;
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            alert("¡Tiempo terminado! 🕒 Tómate un descanso.");
            new Notification("¡Pomodoro terminado! 🧠", {
                body: "Es hora de descansar un poco ☕"
            });
        }
    }, 1000);
}

function pausePomodoro() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetPomodoro() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = 25 * 60;
    updateDisplay();
}

// Para habilitar notificaciones
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

updateDisplay();
