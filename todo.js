let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
        <div>
            <button onclick="toggleTask(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Check--Streamline-Core" height="14" width="14">
                    <desc>
                        Check Streamline Icon: https://streamlinehq.com
                    </desc>
                    <g id="check--check-form-validation-checkmark-success-add-addition-tick">
                        <path id="Vector (Stroke)" fill="#fefcff" fill-rule="evenodd" d="M13.637 1.198a1 1 0 0 1 0.134 1.408l-8.04 9.73 -0.003 0.002a1.922 1.922 0 0 1 -1.5 0.693 1.923 1.923 0 0 1 -1.499 -0.748l-0.001 -0.002L0.21 9.045a1 1 0 1 1 1.578 -1.228l2.464 3.167 7.976 -9.652a1 1 0 0 1 1.408 -0.134Z" clip-rule="evenodd" stroke-width="1"></path>
                    </g>
                </svg>
            </button>
            <button onclick="deleteTask(${index})">
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
        list.appendChild(li);
    });
}

// Agregar tarea
function addTask() {
    const input = document.getElementById("taskInput");
    const name = input.value.trim();
    if (!name) return;
    tasks.push({ name, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
}

// Marcar/Desmarcar como completada
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Eliminar tarea
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Al cargar
window.onload = function(){
    renderTasks?.();
}
