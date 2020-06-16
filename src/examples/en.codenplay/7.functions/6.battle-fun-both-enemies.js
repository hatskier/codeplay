import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    // Enemies in first iteration
    {
      enemies: {
        'Dragon': {
          action() {
            return 'skip';
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 50
        },
        'Warrior': {
          action() {
            return 'skip';
          },
          kind: 'warrior',
          location: 72,
        },
      },
    },
  ],

  startPosX: 44,
  
  shortDescription: true,
  codeFontSize: 16,

  solutionCode:
`// Function to attack a dragon
// at a distance of 2 steps
function attackDragon() {
  hero.go();
  hero.go();
  hero.spearAttack();
}

// Function to attack a warrior
function attackWarrior() {
  hero.swordAttack();
}

// Add 2 instructions below
attackDragon();
attackWarrior();
`,

  startCodeVal:
`// Function to attack a dragon
// at a distance of 2 steps
function attackDragon() {
  hero.go();
  hero.go();
  hero.spearAttack();
}

// Function to attack a warrior
function attackWarrior() {
  hero.swordAttack();
}

// Add 2 instructions below
`,
});

delete conf.methods["hero.attack"];
delete conf.methods["hero.attackWith"];

export default conf;
