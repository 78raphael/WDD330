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

  checkAnswer(question, selected) {
    let check = this.getCorrect();
    return (check[question] == selected) ? 1 : 0 ;
  }

  setScore(score = 0) {
    this.score = score;
  }

  getScore()  {
    return this.score;
  }

  create() {
    let data = this.getData();
    let answers, correct = this.getCorrect();

    data.forEach((item, i) => {
      answers = item['incorrect_answers'];
      answers.push(item['correct_answer']);
      correct[i] = item['correct_answer'];

      this.setTempArray(answers);
      this.randomize();
      this.finalize(i);
    });
    console.log('correct: ', correct);
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
    let arr = this.getTempArray();
    let collection = this.getTriviaArray();
    let correct = this.getCorrect();
    // console.log("correctArray: ", correct);
    let name1 = 'Q' + index;

    collection[index] = {};

    arr.forEach((item, i) => {
      // let name2 = 'A' + i;
      collection[index][i] = item;
      // if(correct[name1] == item){
        // console.log('key: ', name1, 'value: ', correct[name1]);
        // correct[name1] = [name2, item];
      // }
    });

    // console.log('finalCorrect: ', correct);
    this.setTriviaArray(collection);
  }

  // finalize(index, correct)  {
  //   let arr = this.getTempArray();
  //   let collection = this.getTriviaArray();
  //   let tempArr = {};

  //   // if(index === 0) {
  //   //   console.log('arr: ', typeof arr, arr);
  //   //   console.log('tempArr: ', typeof tempArr, tempArr);
  //   //   console.log('collection: ', typeof collection, collection);
  //   // }

  //   arr.forEach((item, i) => {
  //     // (i===0) ? console.log("item: ", typeof item, item) : "";
  //     let name2 = 'A' + i;
  //     tempArr[name2] = item;
  //     console.log('tempArr 1: ', typeof tempArr, tempArr);
  //   });

  //   tempArr['correct'] = correct;

  //   collection['Q' + index] = JSON.stringify(tempArr);

  //   console.log('tempArr 2: ', typeof tempArr, tempArr);
  //   console.log('collection: ', typeof collection, collection);

  //   // (index == 0) ? console.log('tempArr 2: ', typeof tempArr, tempArr) : "";
  //   // (index == 0) ? console.log('collection: ', typeof collection, collection) : "";

  // }
}