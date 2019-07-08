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
      doc: 'Iron make wears iron hands',
      log: 'Iron man is taking his iron hands...'
    },
    'takeBody': {
      bg: 'body',
      doc: 'Iron make wears iron body',
      log: 'Iron man is taking his iron body...'
    },
    'takeHead': {
      bg: 'head',
      doc: 'Iron make wears iron helmet',
      log: 'Iron man is taking his iron head...'
    },
    'fly': {
      bg: 'flying',
      doc: 'Iron make flies',
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
  taskDescription: 'You are Tony Stark. You need to fly and save the world again. But for now you just need to get dressed. Use the commands below (use each command exactly once). Find the correct order and fly to help other Avengers!',
  startCodeVal: `// Get the iron man dressed!
`,

  solutionCode: `// Get the iron man dressed!
  takeHands();
  takeBody();
  takeHead();
  fly();
    `,
});