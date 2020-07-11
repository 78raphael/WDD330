var submit_btn = document.getElementById('btn-submit');

submit_btn.addEventListener("click", () => {
  // console.log("button clicked");
  getAPI();
});

const getAPI = () =>  {
  let select1 = document.getElementById('select1').value,
  select2 = document.getElementById('select2').value,
  select3 = document.getElementById('select3').value,
  select4 = document.getElementById('select4').value;

  let url = `https://opentdb.com/api.php?amount=${select1}&category=${select2}&difficulty=${select3}&type=${select4}`;

  console.log("url", url);

  fetch(url)
  .then(response => response.json())
  .then(data => {
    loadQuestions(data);
  })
  .catch(error => {
    console.error("Error in the fetch(): ", error);
  });
}

const loadQuestions = (data) => {
  console.log(data);
  let setup_box = document.getElementById('setup_box'),
  trivia_box = document.getElementById('trivia_box'),
  trivia_header = document.getElementById('trivia_header'),
  firstLoad = 1;

  setup_box.setAttribute('class', 'hidden');
  trivia_box.classList.remove('hidden');

  data.results.forEach( item => {
    (firstLoad) ? (loadHeader(item),firstLoad = 0) : loadTrivia(item);
  });
}

const loadHeader = (items) =>  {
  trivia_header.innerHTML = items['category'];
  loadTrivia(items);
}

const loadTrivia = (items) => {
  console.log(items);
}