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
`// Don't add new instructions to this code
// Just update one argument into one of the instructions

hero.go(3);
hero.attack();
`;

const startCodeVal =
`// Don't add new instructions to this code
// Just add one argument into one of the instructions

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
