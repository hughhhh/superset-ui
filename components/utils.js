export function randomNumber(maxValue) {
  return Math.floor(Math.random() * 20) % maxValue;
}


export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
