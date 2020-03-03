import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    {
      enemies: {
        'Archer': {
          action(tickNr) {
            if (tickNr == 0 || tickNr == 1) {
              return 'attack';
            } else {
              return 'skip';
            }
          },
          kind: 'archer',
          location: 60
        }
      },
    },
  ],

  startPosX: 34,
  
  stepsArgSupported: false,

});

const startCodeVal =
`// В этот раз твой противник - лучник
// он может атаковать с любого расстояния
hero.defend();
`;

const solutionCode =
`// В этот раз твой противник - лучник
// он может атаковать с любого расстояния
hero.defend();
hero.defend();
hero.go();
hero.go();
hero.attack();
`;

delete conf.methods["hero.attackWith"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
