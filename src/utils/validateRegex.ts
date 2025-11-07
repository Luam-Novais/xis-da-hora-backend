

export type regexKey = keyof typeof typesRegex;

const typesRegex = {
  email: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    messageError: 'O formato de email é inválido.',
  },
  password: {
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    messageError: 'O formato da senha é inválido.',
  },
  phone: {
    regex: /^\d{10,11}$/,
    messageError: 'O formato do telefone está inválido.',
  },
  cep: {
    regex: /^\d{2}\.?\d{3}-?\d{3}$/,
    messageError: 'O formato do cep  é inválido.',
  },
};

export class ValidadeRegex {
  validate(type: regexKey, data: string): boolean | Error {
    if (!typesRegex[type].regex.test(data)) {
      return new Error(typesRegex[type].messageError);
    } else {
      return true;
    }
  }
}
