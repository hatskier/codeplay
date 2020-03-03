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
          location: 58
        }
      },
      funResults: {
        getEnemyType: 'dragon',
      }
    },
  ],

  startPosX: 40,
  
  shortDescription: true,

  solutionCode:
`// Нужно пофиксить баг в этой функции
function attackDragon() {
  hero.go();
  hero.go();
  hero.go();
  hero.spearAttack();
}

attackDragon();
`,

  startCodeVal:
`// Нужно пофиксить баг в этой функции
function attackDragon() {
  hero.go();
  hero.go();
  hero.spearAttack();
}

attackDragon();
`
});

delete conf.methods["hero.attack"];
delete conf.methods["hero.attackWith"];

export default conf;
