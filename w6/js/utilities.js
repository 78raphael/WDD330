
export function addTaskToTable(arr, bool) {
  let container = document.getElementById("list-container"),
  ul = document.createElement('ul'),
  li = document.createElement('li');

  let tds = container.appendChild(ul).appendChild(li);
  
  arr.forEach((item, key )=> {
    let div = document.createElement("div");
    ul.classList.add("item-div");
    if(bool === true) {
      ul.classList.add("completed");
    } else  {
      ul.classList.add("active");
    }
    tds.append(div);
    div.append(item);
  });
}

export function qs(selector) {
  return document.querySelector(selector);
}

export function onTouch(elementSelector, callback) {
  
}