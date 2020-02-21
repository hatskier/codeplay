// Just a code for now

// Start code
var distance = getDistance();
var enemy = getEnemyType();

function attack(enemyType, distanceToEnemy) {
  hero.go(distanceToEnemy)
  if (enemyType == 'dragon') {
    hero.spearAttack();
  } else {
    hero.swordAttack();
  }
}

// Uncomment one of the lines below
// attack(enemy, distance);
// attack(enemyType, distance);
// attack(enemyType, distanceToEnemy);
// attack(enemy, distanceToEnemy);


// Solution code
var distance = getDistance();
var enemy = getEnemyType();

function attack(enemyType, distanceToEnemy) {
  hero.go(distanceToEnemy)
  if (enemyType == 'dragon') {
    hero.spearAttack();
  } else {
    hero.swordAttack();
  }
}

// Uncomment one of the lines below
attack(enemy, distance);
// attack(enemyType, distance);
// attack(enemyType, distanceToEnemy);
// attack(enemy, distanceToEnemy);
