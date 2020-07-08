var se_size, div_1, div_2, div_3, select_element;
var custom_select = document.getElementsByClassName("custom-select");
var size = custom_select.length;
let selectArr = new Map();

for (let i = 0; i < size; i++) {
  select_element = custom_select[i].getElementsByTagName("select")[0];
  se_size = select_element.length;

  div_1 = document.createElement("div");
  div_1.setAttribute("class", "select-selected");

  div_1.innerHTML = select_element.options[select_element.selectedIndex].innerHTML;
  custom_select[i].appendChild(div_1);

  div_2 = document.createElement("div");
  div_2.setAttribute("class", "select-items select-hide");

  for (let j = 1; j < se_size; j++) {
    div_3 = document.createElement("div");
    div_3.innerHTML = select_element.options[j].innerHTML;

    div_3.addEventListener("click", function(e) {
        var same_selected, child_select, prev_sibling, child_select_size, same_selected_size;
        child_select = this.parentNode.parentNode.getElementsByTagName("select")[0];
        child_select_size = child_select.length;
        prev_sibling = this.parentNode.previousSibling;

        for (let i = 0; i < child_select_size; i++) {
          if (child_select.options[i].innerHTML == this.innerHTML) {
            child_select.selectedIndex = i;
            prev_sibling.innerHTML = this.innerHTML;
            same_selected = this.parentNode.getElementsByClassName("same-as-selected");
            same_selected_size = same_selected.length;
            for (let k = 0; k < same_selected_size; k++) {
              same_selected[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        prev_sibling.click();
    });
    div_2.appendChild(div_3);
  }
  custom_select[i].appendChild(div_2);

  div_1.addEventListener("click", function(e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
    // console.log(this.innerHTML, this.parentElement.children[0].id);
    if(this.innerHTML != "...") {
      selectArr.set(this.parentElement.children[0].id, this.innerHTML);
    // console.log(selectArr.size);
    checkArray(selectArr.size);
    // console.log(selectArr);
    }
  });

  // div_1.addEventListener("change", function(event) {
  //   // event.stopPropagation();
  //   console.log(event);
  // });
}

function closeAllSelect(element) {
  var closeArr = [];
  var select_items = document.getElementsByClassName("select-items");
  var selected_select = document.getElementsByClassName("select-selected");
  var select_items_size = select_items.length;
  var selected_select_size = selected_select.length;

  for (let i = 0; i < selected_select_size; i++) {
    if (element == selected_select[i]) {
      closeArr.push(i)
    } else {
      selected_select[i].classList.remove("select-arrow-active");
    }
  }

  for (let i = 0; i < select_items_size; i++) {
    if (closeArr.indexOf(i)) {
      select_items[i].classList.add("select-hide");
    }
  }
}

document.addEventListener("click", closeAllSelect);

function checkArray(length) {
  if(length == 4)  {
    console.log("dropdown.js", selectArr);
    exports.billieEllish = selectArr;
  }
}