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
          location: 50
        },
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
  codeFontSize: 16,

  solutionCode:
`// Функция атаки дракона, находящегося
// на расстоянии двух шагов
function attackDragon() {
  hero.go();
  hero.go();
  hero.spearAttack();
}

// Функция атаки воина, находящегося вблизи
function attackWarrior() {
  hero.swordAttack();
}

// Добавь лишь две инструкции ниже
attackDragon();
attackWarrior();
`,

  startCodeVal:
`// Функция атаки дракона, находящегося
// на расстоянии двух шагов
function attackDragon() {
  hero.go();
  hero.go();
  hero.spearAttack();
}

// Функция атаки воина, находящегося вблизи
function attackWarrior() {
  hero.swordAttack();
}

// Добавь лишь две инструкции ниже
`,
});

delete conf.methods["hero.attack"];
delete conf.methods["hero.attackWith"];

export default conf;
