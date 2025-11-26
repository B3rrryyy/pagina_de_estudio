let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Guardar en localStorage
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Agregar apunte
function addNote() {
    const subject = document.getElementById("subjectInput").value.trim();
    const title = document.getElementById("titleInput").value.trim();
    const content = document.getElementById("noteInput").value.trim();

    if (!subject || !title || !content) {
        alert("Por favor completa todos los campos");
        return;
    }

    const newNote = { subject, title, content };
    notes.push(newNote);
    saveNotes();
    renderNotes();

    // Limpiar campos
    document.getElementById("subjectInput").value = "";
    document.getElementById("titleInput").value = "";
    document.getElementById("noteInput").value = "";
}

// Mostrar los apuntes
function renderNotes() {
    const container = document.getElementById("notesList");
    container.innerHTML = "";

    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((note, i) => {
        const div = document.createElement("div");
        div.className = "note";
        div.innerHTML = `
        <div class="note-summary" onclick="openNoteModal(${i})">
            <h3>${note.title}</h3>
            <p><strong>${note.subject}</strong></p>
        </div>
        <div class="note-buttons">
            <button onclick="editNote(${i})">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Pencil--Streamline-Core" height="14" width="14">
                    <desc>
                        Pencil Streamline Icon: https://streamlinehq.com
                    </desc>
                    <g id="pencil--change-edit-modify-pencil-write-writing">
                        <path id="Union" fill="#fefcff" d="M10.715 -0.000976562c-0.1998 0 -0.3976 0.039922962 -0.5818 0.117424562 -0.18301 0.07702 -0.34892 0.18961 -0.48808 0.331228L1.40732 8.64549c-0.06116 0.06086 -0.10553 0.13651 -0.12879 0.21959L0.0185299 13.3651c-0.0487051 0.1739 0.0001992 0.3606 0.1279281 0.4884 0.12773 0.1277 0.314422 0.1766 0.488369 0.1279l4.500003 -1.26c0.08308 -0.0233 0.15873 -0.0677 0.21959 -0.1288l8.19768 -8.2377 0.0014 -0.00135c0.1399 -0.13917 0.251 -0.30459 0.3269 -0.48679 0.0762 -0.18278 0.1154 -0.37884 0.1154 -0.57686 0 -0.19802 -0.0392 -0.39408 -0.1154 -0.57687 -0.0759 -0.1822 -0.187 -0.34763 -0.3269 -0.48679l-0.0014 -0.00134L11.7859 0.448721c-0.1393 -0.14211 -0.3056 -0.255064 -0.4891 -0.332273 -0.1842 -0.0775016 -0.382 -0.117424562 -0.5818 -0.117424562Z" stroke-width="1"></path>
                    </g>
                </svg>
            </button>
            <button onclick="deleteNote(${i})">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Recycle-Bin-2--Streamline-Core" height="14" width="14">
                        <desc>
                            Recycle Bin 2 Streamline Icon: https://streamlinehq.com
                        </desc>
                        <g id="recycle-bin-2--remove-delete-empty-bin-trash-garbage">
                            <path id="Subtract" fill="#fefcff" fill-rule="evenodd" d="M5.76256 2.01256C6.09075 1.68437 6.53587 1.5 7 1.5c0.46413 0 0.90925 0.18437 1.23744 0.51256 0.20736 0.20737 0.35731 0.46141 0.43961 0.73744h-3.3541c0.0823 -0.27603 0.23225 -0.53007 0.43961 -0.73744ZM3.78868 2.75c0.10537 -0.67679 0.42285 -1.30773 0.91322 -1.798097C5.3114 0.34241 6.13805 0 7 0c0.86195 0 1.6886 0.34241 2.2981 0.951903 0.49037 0.490367 0.8079 1.121307 0.9132 1.798097H13c0.4142 0 0.75 0.33579 0.75 0.75 0 0.41422 -0.3358 0.75 -0.75 0.75h-1v8.25c0 0.3978 -0.158 0.7794 -0.4393 1.0607S10.8978 14 10.5 14h-7c-0.39783 0 -0.77936 -0.158 -1.06066 -0.4393C2.15804 13.2794 2 12.8978 2 12.5V4.25H1c-0.414214 0 -0.75 -0.33578 -0.75 -0.75 0 -0.41421 0.335786 -0.75 0.75 -0.75h2.78868ZM5 5.87646c0.34518 0 0.625 0.27983 0.625 0.625V10.503c0 0.3451 -0.27982 0.625 -0.625 0.625s-0.625 -0.2799 -0.625 -0.625V6.50146c0 -0.34517 0.27982 -0.625 0.625 -0.625Zm4.625 0.625c0 -0.34517 -0.27982 -0.625 -0.625 -0.625s-0.625 0.27983 -0.625 0.625V10.503c0 0.3451 0.27982 0.625 0.625 0.625s0.625 -0.2799 0.625 -0.625V6.50146Z" clip-rule="evenodd" stroke-width="1"></path>
                        </g>
                    </svg>
            </button>
        </div>
        `;
        container.appendChild(div);
    });
}

// 🟢 Mostrar modal con el contenido completo
function openNoteModal(index) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const note = notes[index];

    document.getElementById("modalNoteTitle").textContent = note.title;
    document.getElementById("modalNoteSubject").textContent = note.subject;
    document.getElementById("modalNoteContent").textContent = note.content;

    document.getElementById("editModalBtn").onclick = () => editNote(index);
    document.getElementById("deleteModalBtn").onclick = () => deleteNote(index);

    document.getElementById("noteModal").style.display = "flex";
}
// Textarea autoexpansivo
document.addEventListener("input", function(e) {
    if (e.target.classList.contains("autosize-textarea")) {
        e.target.style.height = "auto";
        e.target.style.height = (e.target.scrollHeight) + "px";
    }
});
function openAddNoteModal() {
    document.getElementById("addNoteModal").style.display = "flex";
}

function closeAddNoteModal() {
    document.getElementById("addNoteModal").style.display = "none";
}

function saveNoteFromModal() {
    const subject = document.getElementById("modalSubjectInput").value.trim();
    const title = document.getElementById("modalTitleInput").value.trim();
    const content = document.getElementById("modalContentInput").value.trim();

    if (!subject || !title || !content) {
        alert("Completa todos los campos");
        return;
    }

    notes.push({ subject, title, content });
    saveNotes();
    renderNotes();
    closeAddNoteModal();

    // Limpiar campos
    document.getElementById("modalSubjectInput").value = "";
    document.getElementById("modalTitleInput").value = "";
    document.getElementById("modalContentInput").value = "";
}


// 🔴 Cerrar modal
function closeNoteModal() {
    document.getElementById("noteModal").style.display = "none";
}


//Editar apunte
function editNote(index) {
    const note = notes[index];

    openCustomPrompt("Editar Apunte", [
        { id: "subject", label: "Materia", value: note.subject },
        { id: "title", label: "Título", value: note.title },
        { id: "content", label: "Contenido", value: note.content }
    ], values => {
        if (!values.subject || !values.title || !values.content) return;

        notes[index] = {
            subject: values.subject.trim(),
            title: values.title.trim(),
            content: values.content.trim()
        };
        saveNotes();
        renderNotes();
    });
}
// Eliminar apunte
function deleteNote(index) {
    if (confirm("¿Quieres eliminar este apunte?")) {
        notes.splice(index, 1);
        saveNotes();
        renderNotes();
    }
}
//
function openCustomPrompt(title, fields, callback) {
    const modal = document.getElementById("customPrompt");
    const titleEl = document.getElementById("promptTitle");
    const fieldsContainer = document.getElementById("promptFields");

    titleEl.textContent = title;
    fieldsContainer.innerHTML = "";

    fields.forEach(f => {
        const label = document.createElement("label");
        label.textContent = f.label;
        const input = document.createElement("input");
        input.type = "text";
        input.id = f.id;
        input.placeholder = f.placeholder || "";
        input.value = f.value || "";
        input.className = "prompt-input";
        fieldsContainer.appendChild(label);
        fieldsContainer.appendChild(input);
    });

    modal.style.display = "flex";
    promptCallback = callback;
}

function closeCustomPrompt() {
    document.getElementById("customPrompt").style.display = "none";
    promptCallback = null;
}

function confirmCustomPrompt() {
    const inputs = document.querySelectorAll("#promptFields input");
    const values = {};
    inputs.forEach(i => values[i.id] = i.value.trim());
    if (promptCallback) promptCallback(values);
    closeCustomPrompt();
}

// Al cargar la página
window.onload = function() {
    renderNotes();     // Apuntes
};
