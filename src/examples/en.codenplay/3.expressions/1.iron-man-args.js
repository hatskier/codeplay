import createConfig from '../base-configs/iron-man';

let config = createConfig();

const startCodeVal =
`// Let’s get iron man into his outfit
// Then make him fly to save the world
take('hands');
`;

const solutionCode =
`// Let’s get iron man into his outfit
// Then make him fly to save the world
take('hands');
take('body');
take('head');
fly();
`;

const oldMethods = { ...config.methods };

config.methods['take'] = {
  doc: `This instruction accepts single String argument: element to take (it may be 'hands', 'body' or 'head')`,
  examples: `take('hands'); <br /> take('body'); <br /> take('head');`,
  async run(context, params) {
    switch (params[0]) {
      case 'hands':
        await oldMethods.takeHands.run(context, params);
        break;
      case 'body':
        await oldMethods.takeBody.run(context, params);
        break;
      case 'head':
        await oldMethods.takeHead.run(context, params);
        break;
      default:
        throw new Error(`Instruction "take" doesn't support this argument: ${params[0] || '\'\''}`);
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
