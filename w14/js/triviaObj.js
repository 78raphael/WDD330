export class triviaObj {
 
  constructor(data) {
    this.setData(data.results);
    this.setTriviaArray();
    this.setCorrect();
    this.create();
    this.setScore();
  }

  setData(data = []) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  setTempArray(arr = [])  {
    this.arr = arr;
  }

  getTempArray()  {
    return this.arr;
  }

  setTriviaArray(collection = {}) {
    this.triviaArray = collection;
  }

  getTriviaArray() {
    return this.triviaArray;
  }

  setCorrect(correct = [])  {
    this.correct = correct;
  }

  getCorrect()  {
    return this.correct;
  }

  setScore(score = 0) {
    this.score = score;
    this.total = 0;
  }

  getScore()  {
    return this.score;
  }

  create() {
    let data = this.getData(),
    correct = this.getCorrect(), answers;

    data.forEach((item, i) => {
      answers = item['incorrect_answers'];
      answers.push(item['correct_answer']);
      correct[i] = item['correct_answer'];

      this.setTempArray(answers);
      this.randomize();
      this.finalize(i);
    });

    this.setCorrect(correct);
    this.setTempArray();
    this.setData();
  }

  randomize(once = 0)  {
    let arr = this.getTempArray();

    if(once <= 2) {
      for(let i = arr.length - 1; i > 0; i--) {
        let random = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[random]] = [arr[random], arr[i]];
      }
      this.setTempArray(arr);
      this.randomize(once + 1);
    }
  }

  finalize(index)  {
    let arr = this.getTempArray(),
    collection = this.getTriviaArray();

    collection[index] = {};

    arr.forEach((item, i) => {
      collection[index][i] = item;
    });
    this.setTriviaArray(collection);
  }
}