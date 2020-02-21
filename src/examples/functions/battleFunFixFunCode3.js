// Just a code for now

// Start code
function attackDragon() {
  hero.go();
  hero.swordAttack();
}

function attackWarrior() {
  hero.go();
  hero.spearAttack();
}

if (enemy == 'warrior') {
  attackWarrior();
} else {
  attackDragon();
}

// Solution code
function attackDragon() {
  hero.go();
  hero.go();
  hero.spearAttack();
}

function attackWarrior() {
  hero.go();
  hero.swordAttack();
}

if (enemy == 'warrior') {
  attackWarrior();
} else {
  attackDragon();
}
