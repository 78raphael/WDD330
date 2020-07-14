import { triviaJson } from './triviaJson.js';

var triviaQuestions;

document.getElementById('btn-submit').addEventListener("click", () => {
  getAPI();
});

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
    // console.log(data.response_code);
    if(data.response_code === 1)  {
      chooseAnother();
    } else {
      triviaQuestions = new triviaJson(data);
      console.log('new Object', triviaQuestions);
      loadQuestions(data);
    }
  })
  .catch(error => {
    console.error("Error in the fetch(): ", error);
  });
}

const switchHeader = (header, button) => {
  let setup_box = document.getElementById('setup_box'),
  trivia_box = document.getElementById('trivia_box'),
  trivia_header = document.getElementById('trivia_header'),
  trivia_content = document.getElementById('trivia_content');

  setup_box.setAttribute('class', 'hidden');
  trivia_box.classList.remove('hidden');

  trivia_header.innerHTML = header;
  (!button) ? '' : trivia_content.appendChild(button);
}

const chooseAnother = () => {
  let backButton = document.createElement('button');
  backButton.innerHTML = 'Back';
  backButton.classList.add('btn');
  backButton.id = 'back-btn';
  backButton.addEventListener('click', () => {
    location.reload();
  });

  switchHeader("Select different categories", backButton);  
}

const loadQuestions = (data) => {
  let trivia_content = document.getElementById('trivia_content');
  let firstLoad = 1;
  let question_num = 1;
  // console.log(data);

  data.results.forEach( item => {
    firstLoad = (firstLoad) ? loadHeader(item, firstLoad, question_num) : loadTrivia(item, question_num);

    question_num++;
  });
}

const loadHeader = (items,firstLoad, question_num) =>  {
  switchHeader(items['category']);
  loadTrivia(items, question_num);
  return firstLoad = 0;
}

const loadTrivia = (items, question_num) => {
  let trivia_content = document.getElementById('trivia_content'),
  question_container = document.createElement('div'),
  question_div = document.createElement('div');

  question_container.classList.add('question_container');
  question_div.classList.add('question_title');
  question_div.innerHTML = question_num + ") " + items['question'];

  trivia_content.appendChild(question_container);
  question_container.appendChild(question_div);

  // console.log("loadTrivia: ", items);
  createButton(question_container, question_num);
}

const createButton = (question_container, question_num) => {
  let label = document.createElement('label');
  label.innerHTML = 'Question' + question_num;
  label.setAttribute('for', 'question'+question_num);

  let newDiv = document.createElement('div');
  newDiv.classList.add('trivia-select');

  question_container.appendChild(label);
  question_container.appendChild(newDiv);
}