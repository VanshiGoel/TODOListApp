let b1 = document.getElementById("addbutton");
let tasks = document.getElementById("tasks");
let taskIdCounter = localStorage.getItem("taskIdCounter") || 0;

function getNextTaskId() {
  taskIdCounter++;
  localStorage.setItem("taskIdCounter", taskIdCounter);
  return taskIdCounter;
}

window.onload = () => {
  for (let j = 1; j <= taskIdCounter; j++) {
    let key = `todo${j}`;
    let taskText = localStorage.getItem(key);
    if (taskText) {
      let div = createTaskElement(j, taskText);
      tasks.append(div);
    }
  }
};

b1.onclick = (e) => {
  e.preventDefault();
  let todo = document.getElementById("input").value;
  let taskId = getNextTaskId();
  localStorage.setItem(`todo${taskId}`, todo);
  let div = createTaskElement(taskId, todo);
  tasks.append(div);
};

function createTaskElement(taskId, taskText) {
  let div = document.createElement("div");
  div.id = `task-${taskId}`;
  div.innerHTML = `<textarea readonly>${taskText}</textarea>
    <button class="edit" onclick="editTask(${taskId})">Edit</button>
    <button class="delete" onclick="deleteItem(${taskId})">Delete</button>`;
  return div;
}

function deleteItem(index) {
  let conf = confirm("Are you sure you want to delete this task?");
  if (conf) {
    localStorage.removeItem(`todo${index}`);
    let taskToDelete = document.getElementById(`task-${index}`);
    if (taskToDelete) {
      taskToDelete.parentNode.removeChild(taskToDelete);
    }
  }
}

function editTask(index) {
  let taskToEdit = document.getElementById(`task-${index}`);
  let textarea = taskToEdit.querySelector("textarea");
  let updatedText = prompt("Edit task:", textarea.value);

  if (updatedText !== null) {
    textarea.value = updatedText;
    localStorage.setItem(`todo${index}`, updatedText);
  }
}
