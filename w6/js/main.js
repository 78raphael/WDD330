import toDos from "./toDos.js";

const add = document.getElementById('btn-add');
const all = document.getElementById('btn-all');

let newTask = new toDos;
newTask.showList();

add.addEventListener("click", function()  {
  newTask.addToDo();
});

all.addEventListener("click", function()  {
  newTask.showAll();
});