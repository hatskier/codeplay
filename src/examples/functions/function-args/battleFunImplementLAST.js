
// Start code
var perfectWeapon = getPerfectWeapon();
var distance = getDistance();

win(perfectWeapon, distance);


// Solution code
var perfectWeapon = getPerfectWeapon();
var distance = getDistance();

function win(perfectWeapon, distance) {
  hero.go(distance);
  hero.attackWith(perfectWeapon);
}

win(perfectWeapon, distance);