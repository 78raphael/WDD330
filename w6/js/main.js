import toDos from "./toDos";

const add = document.getElementById('btn-add');
const all = document.getElementById('btn-all');
const atv = document.getElementById('btn-atv');
const cpt = document.getElementById('btn-cpt');

let newTask = new toDos;
newTask.showList();

add.addEventListener("click", function()  {
  newTask.addToDo();
});

all.addEventListener("click", function()  {
  newTask.showAll();
});

atv.addEventListener("click", function()  {
  newTask.showActive();
});

cpt.addEventListener("click", function()  {
  newTask.showCompleted();
});
