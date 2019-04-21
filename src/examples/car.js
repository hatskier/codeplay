let conf = {
  bg: 'https://s3.amazonaws.com/alcourses.codeplay/example1/city-miami.jpg',

  size: {
    width: 500,
    height: 400
  },

  objects: [
    {
      id: 'Car',
      img: 'https://s3.amazonaws.com/alcourses.codeplay/example1/car-black.png',
      size: {
        width: 50,
        height: 50
      },
      startPos: {
        x: 100,
        y: 70
      }
    },
    {
      id: 'Rocket',
      img: 'https://s3.amazonaws.com/alcourses.codeplay/example1/rocket.png',
      size: {
        width: 50,
        height: 100
      },
      startPos: {
        x: 50,
        y: 100
      }
    }
  ],

  taskDescription: 'You need to move car forward or backward some text and some some some text again lorem',

  methods: {
    "car.go": {
      doc: 'Car goes forward',
      async run(context, params) {
        if (params && params[0]) {
          await context.field.safeMove('Car', {
            x: params[0],
            y: 0
          })
        } else {
          await context.field.safeMove('Car', {
            x: 0,
            y: 10
          });
        }
      }
    },
    "car.back": {
      doc: 'Car foes back',
      async run(context) {
        await context.field.safeMove('Car', {
          x: 0,
          y: -10
        });
      }
    },
    "rocket.up": {
      doc: 'Rocket flies up',
      async run(context) {
        await context.field.safeMove('Rocket', {
          x: 0,
          y: -190
        })
      }
    }
  },

  // This function is used to grade passed code after running
  grade (context) {
    if (context.field.checkPosById('Car', {x: 20, y: 10})) {
      return 5;
    } else {
      return 0;
    }
  }

}

export default conf;