import createConfig from '../base-configs/iron-man';

let config = createConfig();

const startCodeVal =
`// Let’s get iron man into his outfit
// Then make him fly to save the world
// Instruction "take" now accepts
// numerical arguments (more in docs below)
take(0);
take(1);
// Replace this comment with some instruction
fly();
`;

const solutionCode =
`// Let’s get iron man into his outfit
// Then make him fly to save the world
// Instruction "take" now accepts
// numerical arguments (more in docs below)
take(0);
take(1);
take(2);
fly();
`;

const oldMethods = { ...config.methods };

config.methods['take'] = {
  doc: `This instruction accepts a single number argument (0, 1 or 2), which is a number of element to take.`,
  examples: `take(0); <br /> take(1) <br /> take(2)`,
  async run(context, params) {
    switch (params[0]) {
      case 0:
        await oldMethods.takeHands.run(context, params);
        break;
      case 1:
        await oldMethods.takeBody.run(context, params);
        break;
      case 2:
        await oldMethods.takeHead.run(context, params);
        break;
      default:
        throw new Error(`Instruction "take" doesn't accept argument: ${params[0] || '\'\''}`);
        break;
    }
  },
};
delete config.methods['takeHands'];
delete config.methods['takeBody'];
delete config.methods['takeHead'];

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
