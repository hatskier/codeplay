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
  
});

const solutionCode =
`// Defeat your enemies
// Come closer and attack
hero.go();
hero.attack();
`;

const startCodeVal =
`// Defeat your enemies
// Come closer and attack
`;

delete conf.methods["hero.attackWith"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
