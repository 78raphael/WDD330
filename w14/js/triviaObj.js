export class triviaObj {
 
  constructor(data) {
    this.setData(data.results);
    this.setTriviaArray();
    this.setCorrect();
    this.create();
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

  create() {
    let data = this.getData();
    let answers, correct = this.getCorrect();

    data.forEach((item, i) => {
      answers = item['incorrect_answers'];
      answers.push(item['correct_answer']);
      correct['Q' + i] = ['A' + i, item['correct_answer']];

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

    collection[name1] = [];

    arr.forEach((item, i) => {
      collection[name1]['A' + i] = item;
    });
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