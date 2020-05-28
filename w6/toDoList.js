export class toDoList  {

  constructor(taskName, completed) {
    this.content = taskName;
    this.id = Date.now();
    this.completed = completed;

    // console.log("constructor", this.id, this.content);
  }
}