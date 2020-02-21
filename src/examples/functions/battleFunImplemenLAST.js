// Start code

// Declare functions winWarrior and winDragon
var enemy = getEnemy();

if (enemy == 'dragon') {
  winWarrior();
} else {
  winDragon();
}

// Solution code
var enemy = getEnemy();

function winWarrior() {
  hero.go();
  hero.swordAttack();
}

function winDragon() {
  hero.spearAttack();
}

if (enemy == 'dragon') {
  winWarrior();
} else {
  winDragon();
}

