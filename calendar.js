let calendar;
let eventsData = JSON.parse(localStorage.getItem("calendarEvents")) || {};
let selectedDate = "";

// Guardar en localStorage
function saveCalendarEvents() {
    localStorage.setItem("calendarEvents", JSON.stringify(eventsData));
}

// Inicializar calendario
document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar-container");

    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        locale: "es",
        dateClick: function (info) {
            openDayEventsModal(info.dateStr);
        }
    });

    calendar.render();
});

// ---------------- MODAL: EVENTOS DEL DÍA --------------------

function openDayEventsModal(date) {
    selectedDate = date;

    const modal = document.getElementById("dayEventsModal");
    const title = document.getElementById("dayEventsTitle");
    const list = document.getElementById("dayEventsList");

    title.textContent = `Eventos del ${date}`;
    list.innerHTML = "";

    const events = eventsData[date] || [];

    if (events.length === 0) {
        list.innerHTML = "<p>No hay eventos</p>";
    } else {
        events.forEach(ev => {
            const li = document.createElement("li");
            li.textContent = `${ev.time} - ${ev.desc}`;
            list.appendChild(li);
        });
    }

    modal.style.display = "flex";
}

function closeDayEventsModal() {
    document.getElementById("dayEventsModal").style.display = "none";
}

// ---------------- MODAL: AGREGAR EVENTO --------------------

function openAddEventModal() {
    closeDayEventsModal();

    document.getElementById("eventDate").value = selectedDate;
    document.getElementById("eventTime").value = "";
    document.getElementById("eventDesc").value = "";
    document.getElementById("eventReminder").checked = false;

    document.getElementById("eventReminderTime").style.display = "none";

    document.getElementById("addEventModal").style.display = "flex";
}

function closeAddEventModal() {
    document.getElementById("addEventModal").style.display = "none";
}

// Mostrar opción de tiempo cuando se activa el recordatorio
document.addEventListener("change", function (e) {
    if (e.target.id === "eventReminder") {
        document.getElementById("eventReminderTime").style.display =
            e.target.checked ? "block" : "none";
    }
});

// ---------------- GUARDAR EVENTO --------------------

function saveEvent() {
    const date = document.getElementById("eventDate").value;
    const time = document.getElementById("eventTime").value;
    const desc = document.getElementById("eventDesc").value.trim();
    const reminder = document.getElementById("eventReminder").checked;
    const reminderMinutes = document.getElementById("eventReminderTime").value;

    if (!date || !time || !desc) {
        alert("Debes llenar todos los campos");
        return;
    }

    if (!eventsData[date]) {
        eventsData[date] = [];
    }

    eventsData[date].push({
        time,
        desc,
        reminder,
        reminderMinutes
    });

    saveCalendarEvents();

    if (reminder) {
        scheduleReminder(date, time, desc, reminderMinutes);
    }

    closeAddEventModal();
    openDayEventsModal(date);
}

// ---------------- RECORDATORIOS --------------------

function scheduleReminder(date, time, desc, minutesBefore) {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    const eventTime = new Date(`${date}T${time}`);
    const reminderTime = new Date(eventTime - minutesBefore * 60000);
    const now = new Date();

    const diff = reminderTime - now;

    if (diff <= 0) return;

    setTimeout(() => {
        new Notification("Recordatorio 📌", {
            body: desc
        });
    }, diff);
}
