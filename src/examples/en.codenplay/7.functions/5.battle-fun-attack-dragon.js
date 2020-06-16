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
        }
      },
    },
  ],

  startPosX: 44,
  
  shortDescription: true,

  solutionCode:
`function attackDragon() {
  hero.go();
  hero.go();
  hero.spearAttack();
}

function attackWarrior() {
  hero.go();
  hero.swordAttack();
}

// Add one instruction below
attackDragon();
`,

  startCodeVal:
`function attackDragon() {
  hero.go();
  hero.go();
  hero.spearAttack();
}

function attackWarrior() {
  hero.go();
  hero.swordAttack();
}

// Add one instruction below
`
});

delete conf.methods["hero.attack"];
delete conf.methods["hero.attackWith"];

export default conf;
