import { toDoList } from "./toDoList.js";
import * as utl from "./utilities.js";

const btn = document.getElementById('task-btn');
const taskStorage = window.localStorage;
let tblList = [];

console.log("taskStorage Length: ", taskStorage.length);

if(taskStorage.length == 0) {
  taskStorage.clear();
} else {
  tblList = JSON.parse(taskStorage.getItem("tableList"));

  tblList.forEach(item => {
    utl.addTaskToTable(item);
  });
}

btn.addEventListener("click", function()  {
  let entry = document.getElementById('task-input').value;

  if(!entry)  {
    alert("Enter a valid task name")
  } else {
    document.querySelector("tbody").innerHTML = "";
    let newTask = new toDoList(entry, false);
    tblList.push(newTask);

    tblList.forEach(item => {
      utl.addTaskToTable(item);
    });

    taskStorage.setItem('tableList', JSON.stringify(tblList));
  }
});
