//// 🌙 DARK MODE TOGGLE + MEMORY
const toggleModeBtn = document.getElementById("toggleMode");
const userPrefersDark = localStorage.getItem("darkMode") === "enabled";

if (userPrefersDark) {
  document.body.classList.add("dark");
}

if (toggleModeBtn) {
  toggleModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const mode = document.body.classList.contains("dark") ? "enabled" : "disabled";
    localStorage.setItem("darkMode", mode);
  });
}


// 📅 Today’s Date
const today = new Date();
const options = { day: 'numeric', month: 'long', year: 'numeric' };
const formattedDate = today.toLocaleDateString('en-IN', options);
const todayEl = document.getElementById("todayDate");
if (todayEl) todayEl.innerText = `📅 Today: ${formattedDate}`;

// 💬 Static Quote
const quote = document.getElementById("quote");
const author = document.getElementById("author");
if (quote && author) {
  quote.innerText = `"The future depends on what you do today."`;
  author.innerText = "- Mahatma Gandhi";
}

// 🚀 Task Management
let tasks = JSON.parse(localStorage.getItem("taskverseTasks")) || [];

const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDesc");
const taskDate = document.getElementById("taskDate");
const taskPriority = document.getElementById("taskPriority");
const taskCategory = document.getElementById("taskCategory");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterStatus = document.getElementById("filterStatus");
const searchTask = document.getElementById("searchTask");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

function saveTasks() {
  localStorage.setItem("taskverseTasks", JSON.stringify(tasks));
}

function clearInputs() {
  taskTitle.value = "";
  taskDesc.value = "";
  taskDate.value = "";
  taskPriority.value = "";
  taskCategory.value = "";
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  if (progressText && progressBar) {
    progressText.innerText = `✅ ${completed} of ${total} tasks completed (${percent}%)`;
    progressBar.style.width = `${percent}%`;
  }
}

function displayTasks() {
  const search = searchTask.value.toLowerCase();
  const status = filterStatus.value;

  const filtered = tasks.filter(task => {
    const matchesText = task.title.toLowerCase().includes(search) || task.desc.toLowerCase().includes(search);
    const matchesStatus = status === "all" || (status === "done" && task.done) || (status === "pending" && !task.done);
    return matchesText && matchesStatus;
  });

  taskList.innerHTML = "";

  if (filtered.length === 0) {
    taskList.innerHTML = "<p>No tasks found.</p>";
    updateProgress();
    return;
  }

  filtered.forEach(task => {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card";

    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";
    taskInfo.innerHTML = `
      <h3>${task.done ? "✅ " : "⬜ "} ${task.title}</h3>
      <p>${task.desc || ""}</p>
      <p>📅 ${task.date || "No due date"}</p>
      <p>📌 ${task.category || "Uncategorized"} | 🔥 ${task.priority || "Not set"}</p>
    `;

    const actions = document.createElement("div");
    actions.className = "task-actions";
    actions.innerHTML = `
      <button class="edit">✏️</button>
      <button class="delete">🗑️</button>
    `;

    // Mark as done toggle
    taskInfo.querySelector("h3").addEventListener("click", () => {
      task.done = !task.done;
      saveTasks();
      displayTasks();
    });

    // Delete task
    actions.querySelector(".delete").addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      displayTasks();
    });

    // Edit task
    actions.querySelector(".edit").addEventListener("click", () => {
      const newTitle = prompt("Edit Task Title", task.title);
      const newDesc = prompt("Edit Description", task.desc);
      const newDate = prompt("Edit Due Date", task.date);
      const newPriority = prompt("Edit Priority (High/Medium/Low)", task.priority);
      const newCategory = prompt("Edit Category (Work/Personal/Study)", task.category);
      if (newTitle !== null) task.title = newTitle;
      if (newDesc !== null) task.desc = newDesc;
      if (newDate !== null) task.date = newDate;
      if (newPriority !== null) task.priority = newPriority;
      if (newCategory !== null) task.category = newCategory;
      saveTasks();
      displayTasks();
    });

    taskCard.appendChild(taskInfo);
    taskCard.appendChild(actions);
    taskList.appendChild(taskCard);
  });

  updateProgress();
}

if (addTaskBtn) {
  addTaskBtn.addEventListener("click", () => {
    const title = taskTitle.value.trim();
    const desc = taskDesc.value.trim();
    const date = taskDate.value;
    const priority = taskPriority.value;
    const category = taskCategory.value;

    if (title === "") {
      alert("Please enter a task title.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      desc,
      date,
      priority,
      category,
      done: false
    };

    tasks.push(newTask);
    saveTasks();
    clearInputs();
    displayTasks();
  });
}

if (filterStatus) filterStatus.addEventListener("change", displayTasks);
if (searchTask) searchTask.addEventListener("input", displayTasks);

// Initialize on load
displayTasks();
