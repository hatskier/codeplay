const defaultSize = 100;
const landYPos = 50;
const attackDistance = 7;

// TODO maybe remove
function changeField(key, val, obj) {
  let newObj = JSON.parse(JSON.stringify(obj));
  newObj[key] = val;
  return newObj;
}

function sleep(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}

function prepareBattle({enemies, startPosX, maxTicksToWin, startCodeVal, stepWidth}) {

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
        console.log(`En: ${enemyOnField.pos.x}, War: ${pos.x}`);
        const diff = pos.x - enemyOnField.pos.x;
        if (enemyOnField.pos.x < pos.x && diff > 10 && diff < 20) {
          return enemyId;
        }
      }
    }
    return null;
  }

  // Implement different cases for different enemies
  function canHeroBeKilledByEnemy(enemyId, field, state) {
    const enemy = field.findById(enemyId);
    const hero = field.findById('Hero');
    // Enemy could kill hero if he is at their left side and closer than 3% of width
    return (hero.pos.x < enemy.pos.x && hero.pos.x + attackDistance >= enemy.pos.x)
      && !(state.heroAction == 'defending');
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
    }
    await field.changeImage(id, newImgKey);
    await sleep(field.tickTime);
  }

  // Refactor this function - group similar parts
  async function animateAttack(id, field) {
    // TODO add animation for archer - later
    // TODO add fire animation for dragon - later
    // TODO add animation for spear hero attack
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

    if (enemies[id]) {
      switch (enemies[id].kind) {
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
          await sleep(field.tickTime);
          break;
        }
      }
    }


    await field.changeImage(id, oldImgKey);
  }

  let conf = {
    // This field is used for caching
    images: {
      // Hero
      'hero': 'https://s3.amazonaws.com/alcourses.codeplay/battle/hero-waiting.gif',
      'hero-sword-attack': 'https://s3.amazonaws.com/alcourses.codeplay/battle/hero-attacking.gif',
      'hero-spear-attack': 'https://s3.amazonaws.com/alcourses.codeplay/battle/hero-waiting.gif',
      'hero-going': 'https://s3.amazonaws.com/alcourses.codeplay/battle/hero-running.gif',
      'hero-dying': 'https://s3.amazonaws.com/alcourses.codeplay/battle/grave.png',
      'hero-defending': 'https://s3.amazonaws.com/alcourses.codeplay/battle/hero-defending.gif',

      // Enemies
      'dragon': 'https://s3.amazonaws.com/alcourses.codeplay/battle/dragon-flying.gif',
      'dragon-attacking': 'https://s3.amazonaws.com/alcourses.codeplay/battle/dragon-flying.gif',
      'dragon-dying': 'https://s3.amazonaws.com/alcourses.codeplay/battle/grave-with-wings.gif',
      'warrior': 'https://s3.amazonaws.com/alcourses.codeplay/battle/warrior-waiting.png',
      'warrior-attacking': 'https://s3.amazonaws.com/alcourses.codeplay/battle/warrior-attacking.gif',
      'warrior-dying': 'https://s3.amazonaws.com/alcourses.codeplay/battle/grave.png',
      'archer': 'https://s3.amazonaws.com/alcourses.codeplay/battle/archer_new.png',
      'archer-attacking': 'https://s3.amazonaws.com/alcourses.codeplay/battle/archer_new.png',
      'archer-dying': 'https://s3.amazonaws.com/alcourses.codeplay/battle/grave.png',

      // Weapon
      'spear': 'https://s3.amazonaws.com/alcourses.codeplay/battle/spear.png',
      'arrow': 'https://s3.amazonaws.com/alcourses.codeplay/battle/arrow-transparent.png',
      'fire': 'https://s3.amazonaws.com/alcourses.codeplay/battle/fireball.png',

      // Other images
      'landscape': 'https://s3.amazonaws.com/alcourses.codeplay/battle/landscape.jpg'
    },
    bg: 'landscape',
    objects: [
      {
        kind: 'img',
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
    taskDescription: 'You are a hero and you must solve your princess. But you may have some troubles on your way. Warriors, archers and even dragons will try to kill you. Create an algorithm that helps to defeat all your enemies and stay alive.',
    size: {
      width: 550,
      height: 450
    },
    methods: {
      'hero.go': {
        doc: 'Hero goes right',
        async run({field, state}) {
          state.heroAction = 'going';
          await field.changeImage('Hero', 'hero-going');
          await field.safeMove('Hero', {x: stepWidth, y: 0});
          await field.changeImage('Hero', 'hero');
        }
      },

      'hero.swordAttack': {
        doc: 'Hero attacks using sword. Note that dragons can not be killed with sword',
        async run({field, state}) {
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
          
          await field.changeImage('Hero', 'hero')
        }
      },

      'hero.spearAttack': {
        doc: 'Use this command to attack with spear. Note that spear can kill only dragons use this command to attack with spear. Note that spear can kill only dragons',
        async run({field, state}) {
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
          
          await field.changeImage('Hero', 'hero')
        }
      },

      'hero.defend': {
        doc: 'Hero stays at the place and defends. Noone can kill him. You also could use this command to skip your step.',
        async run({field, state}) {
          await field.changeImage('Hero', 'hero-defending');
          state.heroAction = 'defending'
          await sleep(field.tickTime);
        }
      }

      // The next version may have simplier version with attack function
      // 'hero.attack': {
      //   doc: 'Hero attacks. The first and only arg is string \'sword\' or \'bow\'',
      //   async run() {
      //     // TODO implement
      //   } 
      // }
    },

    iterations: [
      {
        async pre({state}) {
          state.enemies = enemies;
        },
        async post({state}) {
          if (!allEnemiesKilled(state)) {
            throw 'Not all enemies were killed!';
          }
        }
      }
    ],

    tickHooks: {
      async pre() {
        // Pre hook is empty - enemies make their moves after a hero (in post tick hook)
      },

      async post(tickNr, {state, field}) {
        if (tickNr >= maxTicksToWin) {
          throw `You can not use more than ${maxTicksToWin} instructions to win`;
        }

        let heroKilled = false;
        let promises = [];
        for (const enemyId in state.enemies) {
          const enemy = enemies[enemyId];
          if (enemy.action(tickNr) == 'attack') {
            promises.push(animateAttack(enemyId, field));
            if (!heroKilled && canHeroBeKilledByEnemy(enemyId, field, state)) {
              heroKilled = true;
            }
          }
        }

        await Promise.all(promises);

        if (heroKilled) {
          await animateDeath('Hero', field);
          throw new Error('Hero was killed :(');
        }
      }
    },
    startCodeVal
  };

  // Adding enemies to objects
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
      size.width *= 1.5;
      yPos -= 1;
    }

    conf.objects.push({
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

  return conf;
}

export default prepareBattle;