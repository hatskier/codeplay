import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    {
      enemies: {
        'Warrior': {
          action(tickNr) {
            return 'skip';
          },
          kind: 'warrior',
          location: 58
        }
      },
    }
  ],
  stepsArgSupported: false,
  startPosX: 40,
  maxTicksToWin: 12,
});

const solutionCode =
`// Одолей своих врагов
// Подойди поближе и атакуй мечом
hero.go();
hero.attack();
`;

const startCodeVal =
`// Одолей своих врагов
// Подойди поближе и атакуй мечом
`;

delete conf.methods["hero.attackWith"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
