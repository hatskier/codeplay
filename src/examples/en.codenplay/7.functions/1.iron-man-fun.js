import createConfig from '../base-configs/iron-man';

let config = createConfig();

const startCodeVal =
`// Let’s get iron man into his outfit
// Then make him fly to save the world

function takeSuit() {
  // Add some code here
}

takeSuit();
fly();
`;

const solutionCode =
`// Let’s get iron man into his outfit
// Then make him fly to save the world

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
