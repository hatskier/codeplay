import createConfig from '../base-configs/iron-man';

let config = createConfig();

const startCodeVal =
`// Одень железного человека в его
// костюм и отправь его в полет
// на помощь другим мстителям
takeHands();
takeBody();
takeHead();
fly();
`;

const solutionCode =
`// Одень железного человека в его
// костюм и отправь его в полет
// на помощь другим мстителям
takeHands();
takeBody();
takeHead();
fly();
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
