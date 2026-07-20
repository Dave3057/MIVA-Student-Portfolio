let tasks = [
    { id: 1, name: "Complete COS 102 Lab Assessment", completed: true },
    { id: 2, name: "Finalize COS 106 Cybersecurity Academic Web Hub", completed: false }
];

document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
});

function addTask() {
    const inputField = document.getElementById("taskInput");
    const taskName = inputField.value.trim();

    if (taskName === "") {
        alert("Please enter a valid task description.");
        return;
    }

    const newTask = {
        id: Date.now(),
        name: taskName,
        completed: false
    };

    tasks.push(newTask);
    inputField.value = "";
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function renderTasks() {
    const tableBody = document.getElementById("taskList");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (tasks.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#94a3b8;">No tasks recorded. Add a new milestone above.</td></tr>`;
        return;
    }

    tasks.forEach(task => {
        const row = document.createElement("tr");

        const statusCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTask(task.id));
        statusCell.appendChild(checkbox);

        const textCell = document.createElement("td");
        textCell.textContent = task.name;
        if (task.completed) {
            textCell.classList.add("completed-text");
        }

        const actionCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Delete';
        deleteBtn.className = "btn btn-secondary btn-sm";
        deleteBtn.style.color = "#dc2626";
        deleteBtn.onclick = () => deleteTask(task.id);
        actionCell.appendChild(deleteBtn);

        row.appendChild(statusCell);
        row.appendChild(textCell);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
    });
}

function validateForm(event) {
    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const msg = document.getElementById("message").value.trim();
    const feedback = document.getElementById("formFeedback");

    feedback.style.display = "block";

    if (!name || !email || !phone || !msg) {
        feedback.style.backgroundColor = "#fee2e2";
        feedback.style.color = "#991b1b";
        feedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error: All fields must be filled out.';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        feedback.style.backgroundColor = "#fee2e2";
        feedback.style.color = "#991b1b";
        feedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error: Enter a valid email format.';
        return;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
        feedback.style.backgroundColor = "#fee2e2";
        feedback.style.color = "#991b1b";
        feedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error: Phone numbers must contain digits only.';
        return;
    }

    feedback.style.backgroundColor = "#d1fae5";
    feedback.style.color = "#065f46";
    feedback.innerHTML = '<i class="fas fa-check-circle"></i> Success: Validation passed and message sent.';
    document.getElementById("contactForm").reset();
}