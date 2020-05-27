const btn = document.getElementById('task-btn');
const tbl = document.querySelector("table");
const tblList = "";
const taskStorage = window.localStorage;

if(window.localStorage.length == 0) {
  localStorage.clear();
  printToConsole(taskStorage);
} else {
  const listOfTasks = [...taskStorage];
  printToConsole(typeof listOfTasks, "typeof");
  // let taskToTable;
  // Object.keys(listOfTasks).forEach( item => {
    // taskToTable += '<tr><td><input type="checkbox" class="" id="'+item.id+'"></td><td>'+item.content+'</td><td>X</td></tr>';
    // printToConsole('item', item);
    // printToConsole('listOfTasks', listOfTasks);
    // printToConsole('final', listOfTasks[item]);
  // });
  // tbl.innerHTML = taskToTable;
}

class toDoList  {

  constructor(taskName) {
    this.content = taskName;
    this.id = Date.now();
    this.completed = false;

    printToConsole(this.id, this.content);
  }

  addTaskToTable = (taskObj) => {
    printToConsole("inside addTaskToTable");
    let taskToTable = '<tr><td><input type="checkbox" class="" id="'+taskObj.id+'"></td><td>'+taskObj.content+'</td><td>X</td></tr>';
    tbl.innerHTML = taskToTable;
  }

}

btn.addEventListener("click", function()  {
  let entry = document.getElementById('task-input').value;

  if(!entry)  {
    printToConsole("Enter a valid task name")
   } else {
    newTask = new toDoList(entry);
    newTask.addTaskToTable(newTask);
    taskStorage.setItem(taskStorage.length+1, newTask);
   }
});

function printToConsole(...stuff) {
  console.log(stuff);
}