let tasks = [];
let currentIndex = null;

function addNewTask() {
  const taskNameElement = document.getElementById("task-name");
  const value = taskNameElement.value;

  const newTask = {
    id: 1,
    name: value,
    status: "Processing",
  };

  if (currentIndex == null) {
    tasks.push(newTask);
  } else {
    const task = tasks[currentIndex];
    task.name = value;
    currentIndex = null;
  }

  renderTask();

  taskNameElement.value = "";
}

function renderTask() {
  let listOfTr = "";
  const tbodyElement = document.getElementById("tbody");

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    listOfTr += `          
    <tr>
    <td class="align-middle">${i + 1} </td>
    <td class="align-middle ${
      task.status == "Completed" ? "text-decoration-line-through" : ""
    }">${task.name}</td>
    <td class="align-middle">${task.status}</td>
    <td class="align-middle">
      ${
        task.status != "Completed"
          ? `<button class="btn btn-info" onclick="doneTask(${i})" >Done</button>
         <button class="btn btn-success" onclick="updateTask(${i})" >Update</button>
            `
          : ""
      }
      <button class="btn btn-danger" onclick="deleteTask(${i})" >Delete</button>
      
    </td>
  </tr>`;
  }
  tbodyElement.innerHTML = listOfTr;

  save();
}

function deleteTask(index) {
  Swal.fire({
    title: "Do you want to delete task?",
    showDenyButton: true,
    showCancelButton: true,
    showConfirmButton: false,
    denyButtonText: `Delete`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      tasks.splice(index, 1);
      renderTask();
    }
  });
}

function updateTask(index) {
  const task = tasks[index];
  const taskNameElement = document.getElementById("task-name");
  taskNameElement.value = task.name;

  currentIndex = index;
  console.log(currentIndex);
}

function doneTask(index) {
  const task = tasks[index];
  task.status = "Completed";
  renderTask();
}

function save() {
  //name, content
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadData() {
  let tasksString = localStorage.getItem("tasks");
  tasks = JSON.parse(tasksString);
  renderTask();
}
loadData();
