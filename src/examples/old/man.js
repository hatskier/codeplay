let conf = {
  bg: 'https://codenplay.io/img/tasks/example1/city-miami.jpg',

  size: {
    width: 500,
    height: 400
  },

  objects: [
    {
      id: 'Man',
      img: 'https://media.giphy.com/media/C9xZ7gmNNe71p0tjPS/giphy.gif',
      size: {
        width: 100,
        height: 100
      },
      startPos: {
        x: 100,
        y: 73
      }
    }
  ],

  taskDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',

  startCodeVal: 'man.go();\n',

  methods: {
    "man.go": {
      doc: 'Mang goes',
      async run(context) {
        await context.field.safeMove('Man', {
          x: -100,
          y: 15
        });
        await context.field.changeImage('Man', 'https://media.giphy.com/media/WgSFtGmgvJNrrgbBYg/giphy.gif');
        await context.field.sleep(400);
        await context.field.rotate('Man', 359);
      }
    }
  },

  // This function is used to grade passed code after running
  grade (context) {
    if (context.field.checkPosById('Man', {x: 20, y: 10})) {
      return 5;
    } else {
      return 0;
    }
  }

}

export default conf;