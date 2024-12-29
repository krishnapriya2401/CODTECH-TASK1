document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";
  
        const span = document.createElement("span");
        span.textContent = task;
  
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", () => editTask(index));
  
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteTask(index));
  
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    }
  
    
    function addTask() {
      const task = taskInput.value.trim();
      if (task) {
        tasks.push(task);
        taskInput.value = "";
        saveTasks();
        renderTasks();
      }
    }
  
    
    function editTask(index) {
      const newTask = prompt("Edit Task:", tasks[index]);
      if (newTask !== null && newTask.trim() !== "") {
        tasks[index] = newTask.trim();
        saveTasks();
        renderTasks();
      }
    }
  
    
    function deleteTask(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
  
    // Save tasks to localStorage
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    
    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") addTask();
    });
  
    
    renderTasks();
  });
  