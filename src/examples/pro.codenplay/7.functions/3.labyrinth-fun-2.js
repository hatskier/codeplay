function pattern() {
  man.moveRight();
  man.moveDown();
}

function solve() {
  var counter = 0;
  while (counter < 5) {
    counter++;
    pattern();
  }
  moveRight();
}

// Добавь лишь две строки кода
solve();
