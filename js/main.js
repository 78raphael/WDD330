document.getElementById('#year').textContent = new Date().getFullYear();

const toggleMenu = () =>  {
  document.querySelector('#navigation').classList.toggle('open');
}

document.querySelector('#menu').addEventListener('click', toggleMenu);