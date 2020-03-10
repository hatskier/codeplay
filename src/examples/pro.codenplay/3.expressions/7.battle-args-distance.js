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
          location: 78
        }
      },
    }
  ],
  startPosX: 40,
  shortDescription: true,
  stepsArgSupported: true,
});

const solutionCode =
`// Не добавляй новых инструкций
// Просто обнови аргумент в одной из них

hero.go(3);
hero.attack();
`;

const startCodeVal =
`// Не добавляй новых инструкций
// Просто обнови аргумент в одной из них

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
