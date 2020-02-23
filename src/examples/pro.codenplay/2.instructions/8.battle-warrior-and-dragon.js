import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    {
      enemies: {
        'Dragon': {
          action(tickNr) {
            if (tickNr % 2 == 0) {
              return 'attack';
            } else {
              return 'skip';
            }
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 50
        },

        'Warrior': {
          action(tickNr) {
            return 'skip';
          },
          kind: 'warrior',
          location: 82,
        }
      }
    }
  ],

  startPosX: 44,
  maxTicksToWin: 30,
  stepsArgSupported: false,

});

const startCodeVal =
`// Одолей врагов
hero.defend();
`;

const solutionCode =
`// Одолей врагов
hero.defend();
hero.go();
hero.defend();
hero.go();
hero.defend();
hero.spearAttack();
hero.go();
hero.swordAttack();
`;

delete conf.methods["hero.attackWith"];
delete conf.methods["hero.attack"];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
