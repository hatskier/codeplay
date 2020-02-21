import createConfig from '../base-configs/iron-man';

let config = createConfig();

const startCodeVal =
`// Одень железного человека в его
// костюм и отправь его в полет
// на помощь другим мстителям
take('hands');
`;

const solutionCode =
`// Одень железного человека в его
// костюм и отправь его в полет
// на помощь другим мстителям
take('hands');
take('body');
take('head');
fly();
`;

const oldMethods = { ...config.methods };

config.methods['take'] = {
  doc: `Инструкция принимает один строковый аргумент, указывающий элемент костюма железного человека, который следует надеть`,
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
        throw new Error(`Инструкция take не поддерживает аргумент: ${params[0] || ''}`);
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
