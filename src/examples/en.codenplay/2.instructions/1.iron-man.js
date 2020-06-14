import createConfig from '../base-configs/iron-man';

let config = createConfig();

const startCodeVal =
`// Let’s get iron man into his outfit
// Then make him fly to save the world
takeHands();
takeBody();
`;

const solutionCode =
`// Let’s get iron man into his outfit
// Then make him fly to save the world
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
