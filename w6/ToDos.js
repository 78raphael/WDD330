import { toDoList } from "./toDoList.js";
import * as utl from "./utilities.js";

const btn = document.getElementById('task-btn');
const taskStorage = window.localStorage;

if(taskStorage.length == 0) {
  taskStorage.clear();
  const tblList = [];
} else {
  const tblList = JSON.parse(taskStorage.getItem("tableList"));

  console.log("tableList: ", tblList);

  tblList.forEach( item => {
    utl.addTaskToTable(item);
    utl.prt2scrn();
  });
}

btn.addEventListener("click", function()  {
  let entry = document.getElementById('task-input').value;

  if(!entry)  {
    console.log("Enter a valid task name")
   } else {
    let newTask = new toDoList(entry, false);
    tblList.push(newTask);
    console.log("tblList:", tblList);
    taskStorage.setItem('tableList', JSON.stringify(tblList));
    utl.addTaskToTable(newTask);
   }
});
