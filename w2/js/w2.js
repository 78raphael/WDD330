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

const exerciseThree = () => {
  console.clear();
  let size = 8;
  let board = "";
  let a = "#", b = " ";
  for(let i = 1; i <= size; i++) {
    for(let m = 1; m <= size; m++) {
      board += (m % 2 == 0) ? a : b;
      if(m == size) {
        board += "\n";
        let c = a;
        a = b;
        b = c;
      }
    }
  }
  console.log(board);
}

const exerciseFour = ($first, $second) => {
  console.clear();
  let minX = Math.min($first, $second);
  console.log(minX);

}

const isEven = (x) => {
  console.clear();

  if(x === 0)  {
    console.log("true");
  } else if(x === 1) {
    console.log("false");
  } else {
    isEven(x - 2);
  }
}

const exerciseSix = () => {
  console.clear();
  let arr = [];
  let total = 0;

  const range = (start, end) => {
    for(let i = start; i <= end; i++) {
      arr.push(i);
    }
  }

  const sum = (arr) => {
    arr.forEach(value => {
      total += value;
    }) 
    return total;
  }

  range(1, 10);
  console.log(sum(arr));
}