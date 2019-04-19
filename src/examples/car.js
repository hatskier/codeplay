let conf = {
  bg: 'https://s3.amazonaws.com/alcourses.codeplay/example1/city-miami.jpg',

  size: {
    width: '400px',
    height: '400px'
  },

  objects: [
    {
      id: 'Car',
      img: 'http://url.img',
      size: {
        width: '50px',
        height: '50px'
      },
      startPos: {
        x: 10,
        y: 10       
      }
    }
  ],

  methods: {
    "car.go": {
      doc: 'Car goes forward',
      async run (context, params) {
        if (params) {
          await context.field.safeMove('Car', {
            x: params[0],
            y: 0
          })
        } else {
          await context.field.safeMove('Car', {
            x: 10,
            y: 0
          });
        }
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