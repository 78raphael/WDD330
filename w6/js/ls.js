export function readFromLS(key)  {
  return JSON.parse(localStorage.getItem(key));
}

export function writeToLS(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}