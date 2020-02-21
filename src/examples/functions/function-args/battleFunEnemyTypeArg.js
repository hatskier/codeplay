// Just a code for now

// Start code

// Fill some gaps
var enemy = getEnemyType();

function attack(enemyType) {
  if (enemyType == 'warrior') {

  } else {

  }
}

attack(enemy);

// Solution code
// Fill some gaps
var enemy = getEnemyType();

function attack(enemyType) {
  if (enemyType == 'warrior') {
    hero.swordAttack();
  } else {
    hero.spearAttack();
  }
}

attack(enemy);
