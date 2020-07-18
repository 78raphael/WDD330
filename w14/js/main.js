import { triviaObj } from './triviaObj.js';

var game;

document.getElementById('btn-submit').addEventListener("click", () => {
  init();
  getAPI();
});

const init = () => {
  let enter = document.getElementById('btn-enter');

  enter.addEventListener('click', (event) =>  {
    event.preventDefault();
    console.log('form submitted');
    getResults();
    showResults();
  });
}

const getAPI = () =>  {
  let select1 = document.getElementById('select1').value,
  select2 = document.getElementById('select2').value,
  select3 = document.getElementById('select3').value,
  select4 = document.getElementById('select4').value;

  let url = `https://opentdb.com/api.php?amount=${select1}&category=${select2}&difficulty=${select3}&type=${select4}`;

  // console.log("url", url);

  fetch(url)
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    if(data.response_code === 1)  {
      chooseAnother();
    } else {
      game = new triviaObj(data);
      console.log('new Object', game);
      loadQuestions(data);
    }
  })
  .catch(error => {
    console.error("Error in the fetch(): ", error);
  });
}

const switchHeader = (header, backDiv) => {
  let setup_box = document.getElementById('setup_box'),
  trivia_box = document.getElementById('trivia_box'),
  trivia_header = document.getElementById('trivia_header'),
  trivia_content = document.getElementById('trivia_content');

  setup_box.setAttribute('class', 'hidden');
  trivia_box.classList.remove('hidden');

  trivia_header.innerHTML = header;
  (!backDiv) ? '' : trivia_content.appendChild(backDiv);
}

const chooseAnother = () => {
  let backDiv = document.createElement('div'),
  backButton = document.createElement('button');

  backDiv.classList.add('button_container');
  
  backButton.innerHTML = 'Back';
  backButton.classList.add('btn');
  backButton.id = 'back-btn';
  backButton.addEventListener('click', () => {
    location.reload();
  });

  backDiv.appendChild(backButton);

  switchHeader("Select different categories", backDiv);  
}

const loadQuestions = (data) => {
  // let trivia_content = document.getElementById('trivia_content');
  let firstLoad = 1;
  let question_num = 0;

  data.results.forEach( (item, index) => {
    let answers = game.triviaArray[index];

    firstLoad = (firstLoad) ? loadHeader(item, firstLoad, question_num, answers) : loadTrivia(item, question_num, answers);

    question_num++;
  });
}

const loadHeader = (items, firstLoad, question_num, answers) =>  {
  switchHeader(items['category']);
  loadTrivia(items, question_num, answers);
  return firstLoad = 0;
}

const loadTrivia = (items, question_num, answers) => {
  let trivia_content = document.getElementById('trivia_content'),
  question_container = document.createElement('div'),
  question_div = document.createElement('div'),
  answers_div = document.createElement('div');

  question_container.classList.add('question_container');
  question_container.setAttribute('id', 'Q' + question_num);

  question_div.classList.add('question_title');
  question_div.innerHTML = (question_num + 1) + ") " + items['question'];

  trivia_content.appendChild(question_container);
  question_container.appendChild(question_div);

  answers_div.classList.add('radio-toolbar');
  question_container.appendChild(answers_div);

  // console.log('answers', answers);

  Object.entries(answers).forEach((item) => {
    createButton(answers_div, question_num, item);
  });
}

const createButton = (answers_div, question_num, answers) => {
  const [key, value] = answers;
  let num = Number(key) + 1;

  let radio = document.createElement('input');
  radio.setAttribute('type', 'radio');
  radio.setAttribute('id', 'Q' + question_num + 'A' + num);
  radio.setAttribute('name', 'Q' + question_num);
  radio.setAttribute('value', answers[1]);
  radio.innerHTML = value;

  let label = document.createElement('label');
  label.setAttribute('for', 'Q' + question_num + 'A' + num);
  label.innerHTML = value;

  answers_div.appendChild(radio);
  answers_div.appendChild(label);
}

const getResults = () =>  {
  let correctAnswers = game.correct,
  score = 0;
  // console.log('inside getResults: ', typeof correctAnswers, correctAnswers);
  Object.entries(correctAnswers).forEach((item, index) => {
    let cell = 'Q' + index;
    // console.log('cell:', cell, 'index', index);
    // let radioAnswer = document.forms['form-trivia'][cell].checked;
    let radios = document.forms['form-trivia'];
    // console.log('radios:', radios);
    for(let count = 0; count < radios.length; count++) {
      // console.log('radios['+cell+']['+count+']', radios[cell][count]);
      if(radios[cell][count].checked) {
        let val = radios[cell][count].value;
        // console.log('cell', cell, 'count', count, 'val', val);
        // let val = radios[index][count].value;
        score += (val == item[1]) ? 1 : 0;

        console.log('Selected:', val, 'Correct:', item[1], 'Score:', score);
        break;
      }
    }
    game.setScore(score);

    console.log('total score', game.getScore());

    // console.log('radioAnswer: ', radioAnswer, radioAnswer.value);
    // console.log('foreach: ', 'item: ', item, 'index: ', index, 'cell:', cell);
  });
}

const showResults = () => {
  let score = game.getScore();
  document.getElementById('results_box').classList.remove('hidden');
  document.getElementById('trivia_box').classList.add('hidden');

  document.getElementById('results_container').innerHTML = score;

}