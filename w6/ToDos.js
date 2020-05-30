import { toDoList } from "./toDoList.js";
import * as utl from "./utilities.js";

const add = document.getElementById('btn-add');
const tsk = document.getElementById('btn-tsk');
const all = document.getElementById('btn-all');
const atv = document.getElementById('btn-atv');
const cpt = document.getElementById('btn-cpt');
const num = document.getElementById('tsk-num');
const taskStorage = window.localStorage;
let tblList = [];

if(taskStorage.length == 0) {
  taskStorage.clear();
} else {
  tblList = JSON.parse(taskStorage.getItem("tableList"));
  let list_length = tblList.length;
  console.log("# of tasks: ", list_length);

  num.innerHTML = list_length;

  tblList.forEach(item => {
    utl.addTaskToTable(item);
  });
}

add.addEventListener("click", function()  {
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

tsk.addEventListener("click", function()  {
  console.log("Task clicked");
});

all.addEventListener("click", function()  {
  console.log("All clicked");
});

atv.addEventListener("click", function()  {
  console.log("Active clicked");
});

cpt.addEventListener("click", function()  {
  console.log("Completed clicked");
});

document.addEventListener("click", function(e) {
  if(e.path[0].id != null)  {
    console.log("clicked", e.path[0].id);
  }
});