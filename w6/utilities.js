const tbl = document.querySelector("table");

export function addTaskToTable(taskObj) {
  let taskToTable = '<tr><td><input type="checkbox" class="" id="'+taskObj.id+'"></td><td>'+taskObj.content+'</td><td>X</td></tr>';
  tbl.innerHTML = taskToTable;
}

export function prt2scrn()  {
  console.log("hi there");
}