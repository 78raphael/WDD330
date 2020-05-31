import * as utl from "./utilities.js";
import * as ls from "./ls.js";

const listName = "list";
let toDoList = [];

export default class toDos  {

  constructor(taskName) {
    this.content = taskName;
    this.id = Date.now();
    this.completed = true;

    // console.log('constructor', toDoList)
    getToDos(listName);
  }

  addToDo()  {
    let entry = document.getElementById('task-input').value;

    // console.log(entry, toDoList);

    saveToDo(entry, listName);
    this.showList();
  }

  removeToDo(id)  {
    console.log("remove ID: ", id);
  }

  showAll() {
    let allItems = document.getElementsByClassName("item-div");

    for(var key in allItems) {
      if(typeof allItems[key] == "number")  {
        break;
      } else {
        if(allItems[key].style.display == "none")  {
          allItems[key].style.display = "block";
        } else {}
      }
    }
  }

  showActive() {
    console.log("show active clicked");
    let allItems = document.getElementsByClassName("item-div");

    for(var key in allItems)  {
      if(typeof allItems[key] == "number")  {
        break;
      } else {
        if(!allItems[key].classList.contains("active"))  {
          allItems[key].style.display = "none";
        } else {
          allItems[key].style.display = "block";
        }
      }
    }
  }

  showCompleted() {
    console.log("show completed clicked");
    let allItems = document.getElementsByClassName("item-div");

    for(var key in allItems)  {
      if(typeof allItems[key] == "number")  {
        break;
      } else {
        if(!allItems[key].classList.contains("completed"))  {
          allItems[key].style.display = "none";
        } else {
          allItems[key].style.display = "block";
        }
      }
    }
  }

  showList()  {
    document.getElementById("list-container").innerHTML = "";
    let list_length = (!toDoList) ? 0 : toDoList.length;
    document.getElementById("tsk-num").innerHTML = list_length;

    if(list_length > 0)  {

      toDoList.forEach(item => {

        let ckBox = document.createElement("input");
        ckBox.setAttribute("type", "checkbox");
        ckBox.setAttribute("name", "ck-box");
        ckBox.setAttribute("id", item.id);

        let lbl = document.createElement("span");
        lbl.setAttribute("class", "label");
        lbl.textContent = item.content;

        let del = document.createElement("input");
        del.setAttribute("type", "button");
        del.setAttribute("id", item.id);
        del.setAttribute("class", "btn-del");
        del.setAttribute("value", "X");

        ckBox.addEventListener("click", function()  {
          console.log(this.id);
        });

        del.addEventListener("click", function()  {
          console.log(this);
          this.removeToDo(this.id);
        });

        utl.addTaskToTable([ckBox, lbl, del], item.completed);
      });
    }
  }
}

function saveToDo(task, key) {
  let toDo = new toDos(task);
  toDoList.push(toDo);
  ls.writeToLS(key, toDoList);
}

function getToDos(key) {
  // console.log('initial', toDoList.length, toDoList, key);
  if(toDoList === null || toDoList.length == 0)  {
    toDoList = ls.readFromLS(key);
    toDoList = (!toDoList) ? [] : toDoList;
    // console.log("inside getToDos: ", toDoList);
    return toDoList;
  } 
  return;
}