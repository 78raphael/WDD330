var select1 = document.getElementById("select1"),
select2 = document.getElementById("select2"),
select3 = document.getElementById("select3"),
select4 = document.getElementById("select4");

const dropDowns = document.querySelectorAll(".trivia-selects");
console.log(select1);

dropDowns.forEach( (selectItem) => {
  // console.log("key", selectItem);

  selectItem.addEventListener("change", (event) => {
    console.log(event.target);
    // consoleView(event);
  });
});

// dropDowns.addEventListener("change", (event) => {
//   console.log("select changed", event);
//   consoleView(event.target);
// });

// select1.addEventListener("change", function() {
//   console.log(this.value);
//   consoleView(select1);
// }, false);

// select2.addEventListener("change", function() {
//   consoleView(select2);
// });

// select3.addEventListener("change", function() {
//   consoleView(select3);
// });

// select4.addEventListener("change", function() {
//   consoleView(select4);
// });

function consoleView(btn1)  {
  console.log(btn1);
  console.log(btn1.value);
}