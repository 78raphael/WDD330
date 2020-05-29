
export function addTaskToTable(taskObj) {
  let taskToTable = '<tr><td><input type="checkbox" class="" id="'+taskObj.id+'"></td><td>'+taskObj.content+'</td><td>X</td></tr>';

  document.querySelector("tbody").innerHTML += taskToTable;
}