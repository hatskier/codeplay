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
  maxTicksToWin: 12,
  shortDescription: true,

  solutionCode:
`// Поправь код этой функции
function solve() {
  hero.go();
  hero.go();
  hero.spearAttack();
}

solve();
`,

  startCodeVal:
`// Поправь код этой функции
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
