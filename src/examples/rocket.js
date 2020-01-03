let conf = {
  bg: 'https://codenplay.io/img/tasks/example1/city-miami.jpg',

  size: {
    width: 500,
    height: 400
  },

  objects: [
    {
      id: 'Rocket',
      img: 'https://codenplay.io/img/tasks/example1/rocket.png',
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

  taskDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',

  startCodeVal: 'rocket.up();\nrocket.down();',

  methods: {
    "rocket.up": {
      doc: 'Rocket flies up',
      async run(context) {
        await context.field.safeMove('Rocket', {
          x: 0,
          y: -100
        });
      }
    },
    "rocket.down": {
      doc: 'Rocket flies down',
      async run(context) {
        await context.field.rotate('Rocket', 180);
        await context.field.safeMove('Rocket', {
          x: 0,
          y: 100
        });
        await context.field.rotate('Rocket', 180);
      }
    }
  },

  // This function is used to grade passed code after running
  grade (context) {
    if (context.field.checkPosById('Rocket', {x: 20, y: 10})) {
      return 5;
    } else {
      return 0;
    }
  }

}

export default conf;