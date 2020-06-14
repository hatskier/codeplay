import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    {
      enemies: {
        'Dragon': {
          action(tickNr) {
            return 'skip';
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
  shortDescription: true,
  stepsArgSupported: true,
});

const startCodeVal =
`// Передай инструкциям правильные аргументы
// Не добавляя новых инструкций
hero.go();
hero.attackWith();
hero.go();
hero.attackWith();
`;

const solutionCode =
`// Передай инструкциям правильные аргументы
// Не добавляя новых инструкций
hero.go(2);
hero.attackWith('spear');
hero.go(1);
hero.attackWith('sword');
`;

delete conf.methods["hero.attack"];
delete conf.methods["hero.spearAttack"];
delete conf.methods["hero.swordAttack"];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
