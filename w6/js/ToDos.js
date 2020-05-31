import * as utl from "./utilities.js";
import * as ls from "./ls.js";

const listName = "list";
let toDoList = [];
let self;

export default class toDos  {

  constructor(taskName) {
    this.id = Date.now();
    this.content = taskName;
    this.completed = false;
    self = this;

    getToDos(listName);
  }

  addToDo()  {
    let entry = document.getElementById('task-input').value;

    saveToDo(listName, entry);
    this.showList();
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

  removeToDo(id)  {
    for(let i = 0; i < toDoList.length; i++ ) {
      for(let key in toDoList[i]) {

        if(!toDoList[i])  {
          break;
        } else {
          if(toDoList[i].id == id) {
            toDoList.splice(i, 1);
          }
        }
      }
    }

    ls.writeToLS( listName, toDoList);
    this.showList();
  }

  markCompleted(id) {
    for(let i = 0; i < toDoList.length; i++ ) {
      for(let key in toDoList[i]) {
        if(!toDoList[i])  {
          break;
        } else {
          if(toDoList[i].id == id) {
            if(!toDoList[i].completed)  {
              toDoList[i].completed = true;
            } else {
              toDoList[i].completed = false;
            }
          }
        }
      }
    }

    ls.writeToLS( listName, toDoList);
    this.showList();
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
          self.markCompleted(this.id);
        });

        del.addEventListener("click", function()  {
          self.removeToDo(this.id);
        }, false);

        utl.addTaskToTable([ckBox, lbl, del], item.completed);
      });
    }
  }
}

function saveToDo(key, task) {
  let toDo = new toDos(task);
  toDoList.push(toDo);
  ls.writeToLS(key, toDoList);
}

function getToDos(key) {
  if(toDoList === null || toDoList.length == 0)  {
    toDoList = ls.readFromLS(key);
    toDoList = (!toDoList) ? [] : toDoList;

    return toDoList;
  } 
  return;
}