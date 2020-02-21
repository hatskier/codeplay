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

config.methods['take'] = {
  doc: `Инструкция принимает один строковый аргумент, указывающий элемент костюма железного человека, который он надевает`,
  examples: `take('hands'); <br /> take('body') <br /> take('head')`,
  async run(context, params) {
    switch (params[0]) {
      case 'hands':
        await config.methods.takeHands.run();
        break;
      case 'body':
        await config.methods.takeBody.run();
        break;
      case 'head':
        await config.methods.takeHead.run();
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
