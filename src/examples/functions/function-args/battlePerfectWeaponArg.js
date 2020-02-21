
// Start code
var perfectWeapon = getPerfectWeapon();
var distance = getPerfectDistance();

function attack(weapon, distance) {
  hero.go(distance);
  hero.attackWith(weapon);
}

// Change one of arguments below
attack(weapon, distance);


// Solution code
var perfectWeapon = getPerfectWeapon();
var distance = getPerfectDistance();

function attack(weapon, distance) {
  hero.go(distance);
  hero.attackWith(weapon);
}

// Change one of arguments below
attack(perfectWeapon, distance);
