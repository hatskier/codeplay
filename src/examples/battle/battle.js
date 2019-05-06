const defaultSize = 50;
const landYPos = 60;
const stepWidth = 10;

// function copyObject(obj) {
//   return JSON.parse(JSON.stringify(obj));
// }

function prepareBattle({enemies, startPosX, maxTicksToWin, startCodeVal}) {
  function checkIfStillAlive(state) {
    // TODO
  }

  let conf = {
    // This field is used for caching
    images: {
      'landscape': 'https://s3.amazonaws.com/alcourses.codeplay/battle/landscape.jpg',
      'hero': 'https://s3.amazonaws.com/alcourses.codeplay/battle/warrior-waiting.png',
      'hero-waiting': 'https://s3.amazonaws.com/alcourses.codeplay/battle/warrior-waiting.png',
      'hero-attacking': 'https://s3.amazonaws.com/alcourses.codeplay/battle/warrior-attacks.png'
    },
    bg: 'landscape',
    objects: [
      {
        kind: 'img',
        id: 'Hero',
        img: 'hero',
        startPos: {
          x: startPosX,
          y: landYPos
        },
        size: {
          width: defaultSize,
          height: defaultSize * 1.2
        }
      }
    ],
    taskDescription: 'You need to survive and defeat all the enemies',
    size: {
      width: 500,
      height: 400
    },
    // TODO define methods
    methods: {
      'hero.go': {
        doc: 'Hero goes right',
        async run({field}) {
          // Maybe 
          await field.changeImage('Hero', 'hero-waiting');
          await field.safeMove('Hero', {x: stepWidth, y: 0});
        }
      },

      'hero.swordAttack': {
        doc: 'Hero attacks using sword',
        async run({field}) {
          // hero changing image to hero-attack
          // if (enemy is nearby (at the right side)) {
          //   enemy dying (logic) and disappearing
          // }
        }
      },

      'hero.spearAttack': {
        doc: 'Hero attacks using spear',
        async run({field}) {

          // hero image changes to one without spear
          // the new spear object added near the hero

          // if (dragon is at the top (logic)) {
          //   spear flies to dragon position
          //   spear is disappearing
          //   dragon is dying (logic) and disappearing
          // } else {
          //   spear flying up and disappearing
          // }

          // hero image changes to one with spear
        }
      },

      'hero.defend': {
        doc: 'Hero stays at the place and defends. Noone can kill him.',
        async run({field}) {
          // Hero changing image to defding one
          // Hero defending (logic)
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
        async pre() {
          // TODO
        },
        async post() {
          // TODO
        }
      }
    ],

    // Define hooks based on enemies actions
    tickHooks: {
      async pre() {
        // TODO
      },

      async post() {
        // TODO
      }
    },
    startCodeVal
  };

  // TODO add enemies objects

  return conf;
}

export default prepareBattle;