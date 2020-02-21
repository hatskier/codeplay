// Just a code for now

// Start code
var distance = getDistance();

function goAndAttack(distance) {
  hero.go(distance + 2);
  hero.attack();
}

goAndAttack(distance);

// Solution code
var distance = getDistance();

function goAndAttack(distance) {
  hero.go(distance);
  hero.attack();
}

goAndAttack(distance);
