import createConfig from '../base-configs/iron-man';

let config = createConfig();

const startCodeVal =
`// Fix this function
// It has 2 bugs (errors)
function take() {
  if (elem == 'head') {
    takeHead();
  }
  if (elem == 'body') {
    takeHead();
  }
  if (elem == 'hands') {
    takeHands();
  }
}

take('hands');
take('body');
take('head');
fly();
`;

const solutionCode =
`// Fix this function
// It has 2 bugs (errors)
function take(elem) {
  if (elem == 'head') {
    takeHead();
  }
  if (elem == 'body') {
    takeBody();
  }
  if (elem == 'hands') {
    takeHands();
  }
}

take('hands');
take('body');
take('head');
fly();
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
  codeFontSize: 15,
};
