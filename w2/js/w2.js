const exerciseOne = () => {
  console.clear();
  let p = "";
  for(let i = 1; i <= 7; i++) {
    p += "#";
    console.log(p);
  }
}

const exerciseTwo = () => {
  console.clear();
  for(let i = 1; i <= 100; i++) {
    if(i % 5 == 0 && i % 3 == 0) {
      console.log('FizzBuzz');
    }
    else if(i % 3 == 0) {
      console.log('Fizz');
    }
    else if(i % 5 == 0) {
      console.log('Buzz');
    }
    else  {
      console.log(i);
    }
  }
}