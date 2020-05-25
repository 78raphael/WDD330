const btn = document.getElementById('task-btn');

class toDoList  {

  constructor(taskName) {
    this.content = taskName;
    this.id = new Date;
    this.completed = false;

    console.log(this.id, this.content);
  }
}

// const toDoList = [];

toDoList = new toDoList("new");

btn.addEventListener("click", function()  {
  console.log("button clicked");
});