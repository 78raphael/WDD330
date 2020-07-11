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
    (data.response_code === 1) ? chooseAnother() : loadQuestions(data);
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
  let firstLoad = 1;
  // console.log(data);

  data.results.forEach( item => {
    firstLoad = (firstLoad) ? loadHeader(item, firstLoad) : loadTrivia(item);
  });
}

const loadHeader = (items,firstLoad) =>  {
  switchHeader(items['category']);
  loadTrivia(items);
  return firstLoad = 0;
}

const loadTrivia = (items) => {
  let trivia_content = document.getElementById('trivia_content');
  console.log(items);
  createButton(trivia_content);
}

const createButton = (trivia_content) => {
  let label = document.createElement('label');
  label.innerHTML = 'Question #';
  label.setAttribute('for', 'question');

  let newDiv = document.createElement('div');
  newDiv.classList.add('trivia-select');
}