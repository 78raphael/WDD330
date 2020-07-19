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
      document.getElementById("button-container").classList.add("hidden");
      switchHeader("No questions available. Try again.", backButton("Back"));
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
  let setup_box = document.getElementById('setup-box'),
  trivia_box = document.getElementById('trivia-box'),
  trivia_header = document.getElementById('trivia-header'),
  trivia_content = document.getElementById('trivia-content');

  setup_box.setAttribute('class', 'hidden');
  trivia_box.classList.remove('hidden');

  trivia_header.innerHTML = header;
  (!backDiv) ? '' : trivia_content.appendChild(backDiv);
}

const loadQuestions = (data) => {
  let firstLoad = 1, question_num = 0;

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
  let trivia_content = document.getElementById('trivia-content'),
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
  let correctAnswers = game.correct, score = 0;

  Object.entries(correctAnswers).forEach((item, index) => {
    let radios = document.forms['form-trivia'],
    cell = 'Q' + index, total = radios.length,
    count = 0;

    while(radios[cell][count] !== undefined) {
      if(radios[cell][count].checked) {
        score += (radios[cell][count].value == item[1]) ? 1 : 0;
        break;
      }
      count++;
    }
    game.setScore(score);
  });
}

const showResults = () => {
  document.getElementById('results-box').classList.remove('hidden');
  document.getElementById('trivia-box').classList.add('hidden');

  document.getElementById('score').innerHTML = game.getScore();
  document.getElementById('total').innerHTML = game.getCorrect().length;

  document.getElementById('results-reset').appendChild(backButton("Reset Game"));
}

const backButton = (buttonLabel) => {
  let backDiv = document.createElement('div'),
  backButton = document.createElement('button');

  backDiv.classList.add('button_container');
  
  backButton.innerHTML = buttonLabel;
  backButton.classList.add('btn');
  backButton.id = 'back-btn';
  backButton.addEventListener('click', () => {
    location.reload();
  });

  return backDiv.appendChild(backButton);
}