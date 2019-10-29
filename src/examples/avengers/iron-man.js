import createOrderTask from '../order-task';

export default createOrderTask({
  images: {
    'body': 'https://s3.amazonaws.com/alcourses.codeplay/avengers/iron-man/iron-man-body.gif', 
    'flying': 'https://s3.amazonaws.com/alcourses.codeplay/avengers/iron-man/iron-man-flying.gif',
    'hands': 'https://s3.amazonaws.com/alcourses.codeplay/avengers/iron-man/iron-man-hands.gif',
    'head': 'https://s3.amazonaws.com/alcourses.codeplay/avengers/iron-man/iron-man-head.gif',
    'start': 'https://s3.amazonaws.com/alcourses.codeplay/avengers/iron-man/iron-man-start.png',
  },
  methods: {
    'takeHands': {
      bg: 'hands',
      doc: 'Iron man takes iron hands',
      log: 'Iron man is taking his iron hands...'
    },
    'takeBody': {
      bg: 'body',
      doc: 'Iron man takes iron body',
      log: 'Iron man is taking his iron body...'
    },
    'takeHead': {
      bg: 'head',
      doc: 'Iron man takes iron helmet',
      log: 'Iron man is taking his iron head...'
    },
    'fly': {
      bg: 'flying',
      doc: 'Iron man flies',
      log: 'Iron man is flying...'
    }
  },
  size: {
    width: 500,
    height: 450
  },
  tickTime: 2500,
  startWithBg: 'start',
  order: ['takeHands', 'takeBody', 'takeHead', 'fly'],
  taskDescription: 'Imagine you are iron man. Let’s get your outfit on to fly and save your friends.',
  startCodeVal: `// Let’s get iron man into his outfit
// Then make him fly to save the world
takeHands();
takeBody();
`,

  solutionCode: `  
takeHands();
takeBody();
takeHead();
fly();
    `,
});