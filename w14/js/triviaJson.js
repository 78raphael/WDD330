export class triviaJson {
 
  constructor(data) {
    this.setData(data.results);
    this.setJson();
    this.createTriviaArray();
  }

  setData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  setTriviaArray(arr)  {
    this.arr = arr;
  }

  getTriviaArray()  {
    return this.arr;
  }

  setJson(json = {}) {
    // console.log(typeof json, json);
    this.triviaJson = json;
  }

  getJson() {
    return this.triviaJson;
  }

  createTriviaArray() {
    let data = this.getData();
    let arr;

    console.log('getData', data);

    data.forEach((item, i) => {
      arr = item['incorrect_answers'];
      arr.push(item['correct_answer']);

      // console.log('i: ', i);

      this.setTriviaArray(arr);
      this.randomizeAnswers();
      this.createJson(i, item['correct_answer']);

    });
  }

  randomizeAnswers(once = 0)  {
    let arr = this.getTriviaArray();

    if(once <= 1) {
      for(let i = arr.length - 1; i > 0; i--) {
        let random = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[random]] = [arr[random], arr[i]];
      }
      this.setTriviaArray(arr);
      this.randomizeAnswers(once + 1);
    }
  }

  createJson(index, correct)  {
    let arr = this.getTriviaArray();
    let json = this.getJson();

    console.log('index: ', index, 'arr: ', arr, 'correct: ', correct, 'json: ', json);

    json = {question: {}};

    arr.forEach((item, i) => {
      let name = 'obj' + i
      json.question[name] = item;
    });

     json.question['correct'] = correct;

    this.setJson(json);

    console.log('json: ', json);
  }
}