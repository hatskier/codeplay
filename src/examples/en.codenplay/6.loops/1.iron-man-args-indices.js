import createConfig from '../base-configs/iron-man';

let config = createConfig();

const startCodeVal =
`// Одень железного человека в его
// костюм и отправь его в полет
// Теперь инструкция take принимает
// числа (подробнее в документации)
take(0);
take(1);
// Замени этот коммент инструкцией
fly();
`;

const solutionCode =
`// Одень железного человека в его
// костюм и отправь его в полет
// Теперь инструкция take принимает
// числа (подробнее в документации)
take(0);
take(1);
take(2);
fly();
`;

const oldMethods = { ...config.methods };

config.methods['take'] = {
  doc: `Инструкция принимает один численный аргумент, указывающий номер элемента костюма железного человека, который он надевает`,
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
        throw new Error(`Инструкция take не поддерживает аргумент: ${params[0] || '\'\''}`);
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
