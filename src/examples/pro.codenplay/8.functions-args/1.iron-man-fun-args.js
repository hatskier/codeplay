import createConfig from '../base-configs/iron-man';

let config = createConfig();

const startCodeVal =
`// Одень железного человека в его
// костюм и отправь его в полет

// Поправь декларацию функции
// В ней 2 бага (ошибки)
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
`// Одень железного человека в его
// костюм и отправь его в полет

// Поправь декларацию функции
// В ней 2 бага (ошибки)
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
};
