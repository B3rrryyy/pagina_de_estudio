// 🔹 SISTEMA DE FLASHCARDS - versión corregida
// Guardamos todo en localStorage 
let data = JSON.parse(localStorage.getItem("flashcards")) || {};
let currentFolder = "";
let currentIndex = 0;

// Guardar en localStorage
function saveData() {
    localStorage.setItem("flashcards", JSON.stringify(data));
}

// Crear carpeta
function createFolder() {
    const name = document.getElementById("folderName").value.trim();
    if (!name) return alert("Ponle un nombre a la carpeta");

    if (!data[name]) {
        data[name] = [];
        saveData();
        renderFolders();
    } else {
        alert("Esa carpeta ya existe");
    }

    document.getElementById("folderName").value = "";
}

// Mostrar carpetas
function renderFolders() {
    const container = document.getElementById("folders");
    container.innerHTML = "";

    Object.keys(data).forEach(folderName => {
        const div = document.createElement("div");
        div.className = "folder";
        div.innerHTML = `
            <h3>${folderName}</h3>
            <div class="folder-buttons">

                <button onclick="openFolderCards('${folderName}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="New-Folder--Streamline-Core" height="14" width="14">
                        <desc>
                            New Folder Streamline Icon: https://streamlinehq.com
                        </desc>
                        <g id="new-folder--empty-folder">
                            <path id="Union" fill="#fefcff" d="M6.12675 0.805269c-0.2708 -0.205804 -0.60343 -0.313418 -0.9433 -0.305333H1.5c-0.39782 0 -0.779356 0.158035 -1.06066 0.43934C0.158035 1.22058 0 1.60211 0 1.99994v9.99996c0 0.3979 0.158035 0.7794 0.43934 1.0607 0.281304 0.2813 0.66283 0.4393 1.06066 0.4393h11c0.3978 0 0.7794 -0.158 1.0607 -0.4393S14 12.3978 14 11.9999V3.99994c0 -0.39783 -0.158 -0.77936 -0.4393 -1.06066 -0.2813 -0.28131 -0.6629 -0.43934 -1.0607 -0.43934H6.89039l-0.21495 -0.85979c-0.08224 -0.33249 -0.27599 -0.62762 -0.54869 -0.834881Z" stroke-width="1"></path>
                        </g>
                    </svg>
                </button>
                
                <button onclick="addCard('${folderName}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Add-1--Streamline-Core" height="14" width="14">
                                <desc>
                                    Add 1 Streamline Icon: https://streamlinehq.com
                                </desc>
                                <g id="add-1--expand-cross-buttons-button-more-remove-plus-add-+-mathematics-math">
                                    <path id="Union" fill="#fefcff" fill-rule="evenodd" d="M8 1c0 -0.552285 -0.44772 -1 -1 -1S6 0.447715 6 1v5H1c-0.552285 0 -1 0.44772 -1 1s0.447715 1 1 1h5v5c0 0.5523 0.44772 1 1 1s1 -0.4477 1 -1V8h5c0.5523 0 1 -0.44772 1 -1s-0.4477 -1 -1 -1H8V1Z" clip-rule="evenodd" stroke-width="1"></path>
                                </g>
                            </svg>
                </button>

                <button onclick="startFlashcard('${folderName}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Button-Play--Streamline-Ultimate" height="24" width="24">
                    <desc>
                        Button Play Streamline Icon: https://streamlinehq.com
                    </desc>
                    <path fill="#fbfaff" d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236 3.35977 3.34094 1.8217 5.21509 0.913451 7.4078 0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411c0.463023 2.3278 1.605908 4.466 3.284138 6.1442 1.67823 1.6782 3.81643 2.8211 6.1442 3.2841 2.32778 0.463 4.74058 0.2254 6.93328 -0.6828 2.1927 -0.9083 4.0669 -2.4464 5.3854 -4.4198C23.2962 16.6935 24 14.3734 24 12c0 -3.1826 -1.2643 -6.23485 -3.5147 -8.48528C18.2348 1.26428 15.1826 0 12 0Zm4.83 12.89 -7.37999 3.69c-0.15223 0.0767 -0.32155 0.1132 -0.49186 0.1061 -0.17032 -0.0071 -0.33598 -0.0577 -0.48126 -0.1469 -0.14528 -0.0891 -0.26536 -0.214 -0.34882 -0.3626 -0.08346 -0.1486 -0.12755 -0.3161 -0.12806 -0.4866V8.31c-0.0012 -0.17131 0.04163 -0.34006 0.12439 -0.49006 0.08276 -0.14999 0.20266 -0.27622 0.34822 -0.36656 0.14555 -0.09035 0.31188 -0.14179 0.48303 -0.14938 0.17114 -0.0076 0.34137 0.0289 0.49436 0.106L16.83 11.1c0.1664 0.0829 0.3064 0.2106 0.4043 0.3687 0.0978 0.1581 0.1496 0.3404 0.1496 0.5263s-0.0518 0.3682 -0.1496 0.5263c-0.0979 0.1581 -0.2379 0.2858 -0.4043 0.3687Z" stroke-width="1"></path>
                    </svg>
                </button>

                <button onclick="deleteFolder('${folderName}')">
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

// Abrir ventana con tarjetas de una carpeta
function openFolderCards(folderName) {
    const cards = data[folderName];
    const modal = document.getElementById("flashcardFolderModal");
    const title = document.getElementById("modalFolderTitle");
    const list = document.getElementById("modalCardList");

    title.textContent = folderName;
    list.innerHTML = "";

    if (!cards || cards.length === 0) {
        list.innerHTML = "<p>No hay tarjetas en esta carpeta.</p>";
    } else {
        cards.forEach((card, i) => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = `
                <strong>${card.front}</strong> - ${card.back}
                <div class="card-buttons">
                    <button onclick="editCard('${folderName}', ${i})">✎</button>
                    <button onclick="deleteCard('${folderName}', ${i})">🗑️</button>
                </div>
            `;
            list.appendChild(div);
        });
    }

    modal.style.display = "flex";
}

// Cerrar ventana de tarjetas
function closeFolderCards() {
    document.getElementById("flashcardFolderModal").style.display = "none";
}

// Iniciar modo flashcards (una por una)
function startFlashcard(folder) {
    if (!data[folder] || data[folder].length === 0) {
        alert("No hay tarjetas en esta carpeta");
        return;
    }

    currentFolder = folder;
    currentIndex = 0;

    let modal = document.getElementById("flashcardModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "flashcardModal";
        modal.className = "flashcard-modal";
        modal.innerHTML = `
            <div class="flashcard-container">
                <button class="close-btn" onclick="closeFlashcard()">✖</button>
                <div class="flashcard-inner" onclick="flipFlashcard()">
                    <div class="front" id="flashFront"></div>
                    <div class="back" id="flashBack"></div>
                </div>
                <div class="flashcard-buttons">
                    <button onclick="closeFlashcard()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Folder-Add--Streamline-Core" height="14" width="14">
                            <desc>
                                Folder Add Streamline Icon: https://streamlinehq.com
                            </desc>
                            <g id="folder-add--add-folder-plus">
                                <path id="Subtract" fill="#fefcff" fill-rule="evenodd" d="M5.183 0.5a1.5 1.5 0 0 1 1.492 1.14l0.215 0.86h5.61A1.5 1.5 0 0 1 14 4v8a1.5 1.5 0 0 1 -1.5 1.5h-11A1.5 1.5 0 0 1 0 12V2A1.5 1.5 0 0 1 1.5 0.5h3.683ZM7 4.75a0.75 0.75 0 0 1 0.75 0.75v1.75H9.5a0.75 0.75 0 0 1 0 1.5H7.75v1.75a0.75 0.75 0 0 1 -1.5 0V8.75H4.5a0.75 0.75 0 0 1 0 -1.5h1.75V5.5A0.75 0.75 0 0 1 7 4.75Z" clip-rule="evenodd" stroke-width="1"></path>
                            </g>
                        </svg>
                    </button>

                    <button onclick="nextFlashcard()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Button-Next--Streamline-Core" height="14" width="14">
  <desc>
    Button Next Streamline Icon: https://streamlinehq.com
  </desc>
  <g id="button-next--button-television-buttons-movies-skip-next-video-controls">
    <path id="Union" fill="#fefcff" fill-rule="evenodd" d="M9.51212 6.056 1.6931 0.656892C1.29745 0.406346 0.815218 0.473133 0.466699 0.735097 0.198102 0.936989 0.00892463 1.25481 0.0000077775 1.63264V12.3333C0.000002589 12.3347 0 12.3362 0 12.3376c9.627e-7 0.884 0.978943 1.4562 1.6931 1.0039l7.81902 -5.36654c0.65048 -0.43882 0.65048 -1.48014 0 -1.91896Zm4.23778 -4.31384c0 -0.55229 -0.4477 -1.000003 -1 -1.000003 -0.5522 0 -1 0.447713 -1 1.000003V12.2578c0 0.5523 0.4478 1 1 1 0.5523 0 1 -0.4477 1 -1V1.74216Z" clip-rule="evenodd" stroke-width="1"></path>
  </g>
</svg>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    modal.style.display = "flex";
    modal.classList.remove("flipped");
    showFlashcard();
}

function closeFlashcard() {
    const modal = document.getElementById("flashcardModal");
    if (modal) modal.style.display = "none";
}

function nextFlashcard() {
    if (!currentFolder) return;
    currentIndex++;
    if (currentIndex >= data[currentFolder].length) {
        closeFlashcard();
        return;
    }
    const container = document.querySelector(".flashcard-inner");
    container.classList.remove("flipped");
    showFlashcard();
}

function flipFlashcard() {
    const container = document.querySelector(".flashcard-inner");
    container.classList.toggle("flipped");
}

function showFlashcard() {
    const card = data[currentFolder][currentIndex];
    document.getElementById("flashFront").innerText = card.front;
    document.getElementById("flashBack").innerText = card.back;
}

// Agregar tarjeta
function addCard(folder) {
    openCustomPrompt("Nueva Flashcard", [
        { id: "front", label: "Frente", placeholder: "Pregunta o palabra" },
        { id: "back", label: "Reverso", placeholder: "Respuesta" }
    ], values => {
        if (!values.front || !values.back) return;
        data[folder].push({ front: values.front, back: values.back });
        saveData();
        openFolderCards(folder);
    });
}

// Editar tarjeta
function editCard(folder, index) {
    const card = data[folder][index];

    openCustomPrompt("Editar Flashcard", [
        { id: "front", label: "Frente", value: card.front },
        { id: "back", label: "Reverso", value: card.back }
    ], values => {
        if (values.front && values.back) {
            data[folder][index] = { front: values.front, back: values.back };
            saveData();
            openFolderCards(folder);
        }
    });
}

// Eliminar tarjeta
function deleteCard(folder, index) {
    if (confirm("¿Eliminar esta tarjeta?")) {
        data[folder].splice(index, 1);
        saveData();
        openFolderCards(folder);
    }
}

// Eliminar carpeta
function deleteFolder(folder) {
    if (confirm("¿Eliminar toda la carpeta con sus tarjetas?")) {
        delete data[folder];
        saveData();
        renderFolders();
    }
}

// Administrar carpetas
function openFolderManager() {
    const allFolders = Object.keys(data);
    if (allFolders.length === 0) {
        alert("No hay carpetas para administrar");
        return;
    }

    let modal = document.getElementById("folderManagerModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "folderManagerModal";
        modal.className = "flashcard-modal";
        modal.innerHTML = `
            <div class="folder-manager-container">
                <button class="close-folder-btn" onclick="closeFolderManager()">✖</button>
                <h2>📁 Administrar carpetas</h2>
                <ul id="folderList"></ul>
            </div>
        `;
        document.body.appendChild(modal);
    }

    modal.style.display = "flex";
    const folderList = modal.querySelector("#folderList");
    folderList.innerHTML = "";

    allFolders.forEach(folder => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${folder}</span>
            <div>
                <button onclick="renameFolder('${folder}')">✎

                </button>
                <button onclick="deleteFolder('${folder}')">🗑️
                
                </button>
            </div>
        `;
        folderList.appendChild(li);
    });
}

function closeFolderManager() {
    document.getElementById("folderManagerModal").style.display = "none";
}

function renameFolder(oldName) {
    const newName = prompt("Nuevo nombre para la carpeta:", oldName);
    if (!newName || newName === oldName) return;
    if (data[newName]) return alert("Ya existe una carpeta con ese nombre");

    data[newName] = data[oldName];
    delete data[oldName];
    saveData();
    renderFolders();
    openFolderManager();
}

// =====================================================
// 🔹 Modal personalizado reutilizable (para inputs)
// =====================================================
let promptCallback = null;

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


//--------------------cargar -------------------
window.onload = function() {
    renderFolders(); // Mostrar carpetas
};
