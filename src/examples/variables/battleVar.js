const defaultSize = 100;
const landYPos = 50;
const attackDistance = 9;
const defaultGraveSize = {
  width: defaultSize,
  height: defaultSize * 1.2
}

function sleep(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}

function runtimeError(msg, field) {
  field.log(`Error: ${msg}`, {error: true});
  throw new Error(msg);
}

function prepareBattle({iterations, startPosX, maxTicksToWin, startCodeVal, stepWidth, solutionCode}) {

  function getEnemiesToAdd(enemies) {
    let enemiesToAdd = [];
    for (const enemyId in enemies) {
      const enemy = enemies[enemyId];

      let yPos = landYPos;
      let size = {
        width: defaultSize,
        height: defaultSize * 1.2
      };

      if (enemy.kind == 'dragon') {
        yPos = 0;
        size.width *= 3;
        size.height *= 2;
      }

      if (enemy.kind == 'warrior') {
        size.width /= 1.4;
      }

      enemiesToAdd.push({
        kind: 'img',
        id: enemyId,
        imgKey: enemy.kind,
        startPos: {
          x: enemy.location,
          y: yPos
        },
        size
      });
    }
    return enemiesToAdd;
  }

  function createIterations() {
    let iterationsConf = [];

    let firstIteration = true;
    for (let iteration of iterations) {
      iterationsConf.push({
        async pre({state, field}, iterationNr) {
          if (!firstIteration) {
            // Removing enemies which were drawed for the first iteration
            for (let firstIterationEnemy in iterations[0].enemies) {
              field.removeObject(firstIterationEnemy);
            }

            // Adding appropriate enemies
            let enemiesToAdd = getEnemiesToAdd(iteration.enemies);
            for (let enemyToAdd of enemiesToAdd) {
              field.addObject(enemyToAdd);
            }
            // addEnemiesToField(iteration.enemies);
          } else {
            firstIteration = false;
          }
          
          // for (const enemyId in iteration.enemies) {
          //   const enemy = iteration.enemies[enemyId];

          //   let yPos = landYPos;
          //   let size = {
          //     width: defaultSize,
          //     height: defaultSize * 1.2
          //   };

          //   if (enemy.kind == 'dragon') {
          //     yPos = 0;
          //     size.width *= 3;
          //     size.height *= 2;
          //   }

          //   if (enemy.kind == 'warrior') {
          //     size.width /= 1.4;
          //   }

          //   field.addObject({
          //     kind: 'img',
          //     id: enemyId,
          //     imgKey: enemy.kind,
          //     startPos: {
          //       x: enemy.location,
          //       y: yPos
          //     },
          //     size
          //   });
          // }

          state.funResults = iteration.funResults;
          state.enemies = Object.assign({}, iteration.enemies);
          state.allEnemies = Object.assign({}, iteration.enemies);
        },

        async post({state, field}) {
          if (!allEnemiesKilled(state)) {
            runtimeError('Not all enemies were killed!', field);
          }
        }
      });
    }
    return iterationsConf;
  }

  // TODO refactor crete common function getClosestEnemyID
  function gerClosestWarriorId(pos, field, {enemies}) {
    for (const enemyId in enemies) {
      const enemy = enemies[enemyId];
      const enemyOnField = field.findById(enemyId);
      if (enemy.kind != 'dragon') {
        // TODO change it (hero can attack only enemies on the right side)
        if (Math.abs(enemyOnField.pos.x - pos.x) <= attackDistance) {
          return enemyId;
        }
      }
    }
    return null;
  }

  function getClosestDragonId(pos, field, state) {
    for (const enemyId in state.enemies) {
      const enemy = state.enemies[enemyId];
      const enemyOnField = field.findById(enemyId);
      if (enemy.kind == 'dragon') {
        // hero could throw spear only exactly up
        // TODO remove
        // console.log(`En: ${enemyOnField.pos.x}, War: ${pos.x}`);
        const diff = pos.x - enemyOnField.pos.x;
        if (enemyOnField.pos.x < pos.x && diff > 10 && diff < 20) {
          return enemyId;
        }
      }
    }
    return null;
  }

  function canHeroBeKilledByEnemy(enemyId, field, state) {
    const enemy = field.findById(enemyId);
    const hero = field.findById('Hero');
    // Enemy could kill hero if he is at their left side and closer than 3% of width
    const enemyKind = state.enemies[enemyId].kind;
    let attackDistanceIsOk = false;
    switch (enemyKind) {
      case 'archer': {
        attackDistanceIsOk = hero.pos.x < enemy.pos.x;
        break;
      }
      case 'warrior': {
        // field.log(`Hpos: ${hero.pos.x} EPos: ${enemy.pos.x}`);
        attackDistanceIsOk = (
          hero.pos.x < enemy.pos.x + attackDistance
          && hero.pos.x + attackDistance >= enemy.pos.x);
        break;
      }
      default: {
        // Dragon always can kill a hero (if he is not defending)
        attackDistanceIsOk = true;
        break
      }
    }
    return attackDistanceIsOk && !(state.heroAction == 'defending');
  }

  function allEnemiesKilled(state) {
    return Object.keys(state.enemies).length == 0;
  }

  async function animateDeath(id, field) {
    const obj = field.findById(id);
    let newImgKey = obj.img.key + '-dying'
    if (id == 'Hero') {
      // We can't assume that hero's key always is the same (example: defending)
      newImgKey = 'hero-dying';
      field.log(`Unfortunatelly hero was killed. Please try again!`);
    } else {
      field.log(`${id} is dying...`);
    }
    if (id !== 'Dragon' && id !== 'Hero' && !id.includes('Warrior')) {
      field.changeImageSize(id, defaultGraveSize);
    }
    await field.changeImage(id, newImgKey);
    if (id.includes('Warrior')) {
      // await field.safeMove(id, {x: 8, y: 2}, {fast: true});
    }
    if (id.includes('Archer')) {
      await field.safeMove(id, {x: 2, y: 1}, {fast: true});
    }
    await sleep(field.tickTime);
  }

  // Refactor this function - group similar parts
  async function animateAttack(id, field) {
    const obj = field.findById(id);
    const oldImgKey = obj.img.key;
    const attackingImageKey = oldImgKey + '-attacking';
    await field.changeImage(id, attackingImageKey);

    const size = {
      width: defaultSize / 2,
      height: defaultSize / 2
    };

    if (id == 'Hero') {
      const newObj = field.addObject({
        kind: 'img',
        imgKey: 'spear',
        startPos: {
          x: obj.pos.x,
          y: obj.pos.y
        },
        size: {
          width: size.width * 1.5,
          height: size.height * 2.5
        }
      });
      await field.safeMove(newObj.id, {x: 0, y: -30});
      field.removeObject(newObj.id);
    }

    const hero = field.findById('Hero');

    let enemy = field.state.allEnemies[id];
    if (enemy) {
      switch (enemy.kind) {
        case 'dragon': {
          const newObj = field.addObject({
            kind: 'img',
            imgKey: 'fire',
            startPos: {
              x: obj.pos.x + 8,
              y: obj.pos.y + 27
            },
            size
          });
          await field.moveToPos(newObj.id, hero.pos);
          field.removeObject(newObj.id);
          break;
        }
        case 'archer': {
          let arrowYPos = obj.pos.y + 8;
          const newObj = field.addObject({
            kind: 'img',
            imgKey: 'arrow',
            startPos: {
              x: obj.pos.x,
              y: arrowYPos
            },
            size: {
              width: size.width,
              height: size.height / 3
            }
          });
          const newPos = {
            y: arrowYPos,
            x: hero.pos.x + 7
          };
          await field.moveToPos(newObj.id, newPos);
          field.removeObject(newObj.id);
          break;
        }
        default: {
          await animateWaiting(id, field);
          break;
        }
      }
    }


    await field.changeImage(id, oldImgKey);
  }

  async function animateWaiting(_id, field) {
    await sleep(field.tickTime);
  }

  async function swordAttack({field, state}) {
    field.log('Hero is attacking with sword...');

    await field.changeImage('Hero', 'hero-sword-attack');
    state.heroAction = 'sword_attacking';
    const heroPos = field.findById('Hero').pos;
    const closestWarriorId = gerClosestWarriorId(heroPos, field, state);

    if (closestWarriorId) {
      // Removing enemy
      delete state.enemies[closestWarriorId];
      await animateDeath(closestWarriorId, field);
    } else {
      // TODO make these sleeps better
      await sleep(field.tickTime);
    }
    
    await field.changeImage('Hero', 'hero');
  }

  async function spearAttack({field, state}) {
    field.log('Hero is attacking with spear...');

    await field.changeImage('Hero', 'hero-spear-attack');
    state.heroAction = 'spear_attacking';
    const heroPos = field.findById('Hero').pos;
    const closestDragonId = getClosestDragonId(heroPos, field, state);

    await animateAttack('Hero', field);

    if (closestDragonId) {
      // Removing enemy (dragon)
      delete state.enemies[closestDragonId];
      await animateDeath(closestDragonId, field);
    }
    
    await field.changeImage('Hero', 'hero');
  }

  let conf = {
    // This field is used for caching
    images: {
      // Hero
      'hero': 'https://codenplay.io/img/tasks/battle/hero-waiting.gif',
      'hero-sword-attack': 'https://codenplay.io/img/tasks/battle/hero-attacking.gif',
      'hero-spear-attack': 'https://codenplay.io/img/tasks/battle/hero-waiting.gif',
      'hero-going': 'https://codenplay.io/img/tasks/battle/hero-running.gif',
      'hero-dying': 'https://codenplay.io/img/tasks/battle/grave.png',
      'hero-defending': 'https://codenplay.io/img/tasks/battle/hero-defending.gif',

      // Enemies
      'dragon': 'https://codenplay.io/img/tasks/battle/dragon-flying.gif',
      'dragon-attacking': 'https://codenplay.io/img/tasks/battle/dragon-flying.gif',
      'dragon-dying': 'https://codenplay.io/img/tasks/battle/grave-with-wings.gif',
      'warrior': 'https://codenplay.io/img/tasks/battle/warrior-new-waiting.gif',
      'warrior-attacking': 'https://codenplay.io/img/tasks/battle/warrior-new-attacking.gif',
      'warrior-dying': 'https://codenplay.io/img/tasks/battle/grave.png',
      'archer': 'https://codenplay.io/img/tasks/battle/warrior-archer-purchased.png',
      'archer-attacking': 'https://codenplay.io/img/tasks/battle/warrior-archer-purchased.png',
      'archer-dying': 'https://codenplay.io/img/tasks/battle/grave.png',

      // Weapon
      'spear': 'https://codenplay.io/img/tasks/battle/spear.png',
      'arrow': 'https://codenplay.io/img/tasks/battle/arrow-transparent.png',
      'fire': 'https://codenplay.io/img/tasks/battle/fireball.png',

      // Other images
      'landscape': 'https://codenplay.io/img/tasks/battle/landscape.jpg'
    },
    bg: 'landscape',
    objects: [
      {
        kind: 'img',
        style: {
          'z-index': 4 // hero should be on top layer
        },
        id: 'Hero',
        imgKey: 'hero',
        startPos: {
          x: startPosX,
          y: landYPos
        },
        size: {
          width: defaultSize / 1.4,
          height: defaultSize * 1.2
        }
      }
    ],
    docTableExtended: true,
    taskDescription: 'Just kill your enemies and don\'t let them kill you.',
    size: {
      width: 550,
      height: 450
    },

    methods: {
      'hero.go': {
        doc: 'You can specify a number of steps (1 step is default)',
        examples: 'hero.go(2); <br /> hero.go(distance);',
        async run({field, state}, params) {
          field.log('Hero is going...');

          let stepsNumber = 1;
          if (params.length > 0) {
            stepsNumber = params[0];
          }

          state.heroAction = 'going';
          await field.changeImage('Hero', 'hero-going');
          await field.safeMove('Hero', {x: stepWidth * stepsNumber, y: 0});
          await field.changeImage('Hero', 'hero');
        }
      },

      'hero.swordAttack': {
        doc: 'This instruction doesn\'t accept arguments.',
        examples: 'hero.swordAttack();',

        async run({field, state}) {
          await swordAttack({field, state});
          // field.log('Hero is attacking with sword...');

          // await field.changeImage('Hero', 'hero-sword-attack');
          // state.heroAction = 'sword_attacking';
          // const heroPos = field.findById('Hero').pos;
          // const closestWarriorId = gerClosestWarriorId(heroPos, field, state);

          // if (closestWarriorId) {
          //   // Removing enemy
          //   delete state.enemies[closestWarriorId];
          //   await animateDeath(closestWarriorId, field);
          // } else {
          //   // TODO make these sleeps better
          //   await sleep(field.tickTime);
          // }
          
          // await field.changeImage('Hero', 'hero');
        }
      },

      'hero.spearAttack': {
        doc: 'This instruction doesn\'t accept arguments.',
        examples: 'hero.spearAttack();',
        async run({field, state}) {
          await spearAttack({field, state});
          // field.log('Hero is attacking with spear...');

          // await field.changeImage('Hero', 'hero-spear-attack');
          // state.heroAction = 'spear_attacking';
          // const heroPos = field.findById('Hero').pos;
          // const closestDragonId = getClosestDragonId(heroPos, field, state);

          // await animateAttack('Hero', field);

          // if (closestDragonId) {
          //   // Removing enemy (dragon)
          //   delete state.enemies[closestDragonId];
          //   await animateDeath(closestDragonId, field);
          // }
          
          // await field.changeImage('Hero', 'hero');
        }
      },

      'hero.attackWith': {
        // doc: 'The hero attacks using the selected weapon. Weapon should be passed by argument. Example: hero.attackWith(\'sword\'); or hero.attackWith(\'spear\');',
        doc: 'You can specify the weapon to attack with',
        examples: 'hero.attackWith(\'spear\'); <br /> hero.attackWith(\'sword\');',
        async run({field, state}, args) {
          if (args.length != 1) {
            runtimeError('hero.attackWith takes only one argument: \'spear\' or \'sword\'');
          }
          let arg = args[0];
          if (arg == 'spear') {
            await spearAttack({field, state});
          } else if (arg == 'sword') {
            await swordAttack({field, state});
          } else {
            runtimeError('hero.attackWith takes only one argument: \'spear\' or \'sword\'');
          }
        }
      },

      'hero.defend': {
        doc: 'This instruction doesn\'t accept arguments.',
        examples: 'hero.defend();',
        async run({field, state}) {
          field.log('Hero is defending...');
          await field.changeImage('Hero', 'hero-defending');
          state.heroAction = 'defending'
          await sleep(field.tickTime);
        }
      },

      // 'print': {
      //   doc: 'You can use this instruction to print value of some variable to the terminal. Example: print(x);',
      //   async run({field}, params) {
      //     field.log(`Printing using command "print": ${params[0]}`);
      //   }
      // },
    },

    iterations: createIterations(),

    tickHooks: {
      async pre(tickNr, {field}) {
        field.log(`----- Round nr ${tickNr + 1} started -----`);
        await sleep(field.tickTime);
      },

      async post(tickNr, {state, field}) {
        if (tickNr >= maxTicksToWin) {
          runtimeError(`You can not use more than ${maxTicksToWin} instructions to win`, field);
        }

        let heroKilled = false;
        let promises = [];
        for (const enemyId in state.enemies) {
          const enemy = state.allEnemies[enemyId];
          if (enemy.action(tickNr) == 'attack') {
            field.log(`${enemyId} is attacking...`);
            promises.push(animateAttack(enemyId, field));
            if (!heroKilled && canHeroBeKilledByEnemy(enemyId, field, state)) {
              heroKilled = true;
            }
          } else {
            field.log(`${enemyId} is just waiting...`);
            promises.push(animateWaiting(enemyId, field));
          }
        }

        await Promise.all(promises);

        if (heroKilled) {
          await animateDeath('Hero', field);
          runtimeError('Hero was killed :(', field);
        }
      }
    },
    startCodeVal,
    solutionCode
  };


  // Adding enemies to show
  for (let enemyToAdd of getEnemiesToAdd(iterations[0].enemies)) {
    conf.objects.push(enemyToAdd);
  }

  return conf;
}

export default prepareBattle;
