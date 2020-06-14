import createConfig from '../base-configs/iron-man';

let config = createConfig();

const startCodeVal =
`// Одень железного человека в его
// костюм и отправь его в полет

function takeSuit() {
  // Код пиши только внутри этой функции
}

takeSuit();
fly();
`;

const solutionCode =
`// Одень железного человека в его
// костюм и отправь его в полет

function takeSuit() {
  takeHands();
  takeBody();
  takeHead();
}

takeSuit();
fly();
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
