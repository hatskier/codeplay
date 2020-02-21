// Just a code for now

// Start code
var isEnemyClose = isEnemyClose();

// Maybe there are too many steps
function win(makeStep) {
  if (makeStep) {
    hero.go();
    hero.go();
    hero.go();
  }
  hero.attack();
}

win(isEnemyClose);

// Solution code
var isEnemyClose = isEnemyClose();

// Maybe there are too many steps
function win(makeStep) {
  if (makeStep) {
    hero.go();
  }
  hero.attack();
}

win(isEnemyClose);
