import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    // Enemies in first iteration
    {
      enemies: {
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

  solutionCode:
`// Fix the code of this function
function solve() {
  hero.go();
  hero.go();
  hero.swordAttack();
}

solve();
`,

  startCodeVal:
`// Fix the code of this function
function solve() {
  hero.go();
  hero.spearAttack();
}

solve();
`,
});

delete conf.methods["hero.attack"];
delete conf.methods["hero.attackWith"];

export default conf;
