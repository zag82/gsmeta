// это файл с константами сметы для тестирования и дефолтной пустой сметы
import { Smeta, AdditionKind } from './gss.types';

export const gssEmptySmeta: Smeta = {
  total: 0,
  additions: [],
  references: [],
  data: [],
};

export const gssTestSmeta: Smeta = {
  total: 0,
  additions: [
    {
      id: 1,
      name: 'Начисление такое-то',
      kind: AdditionKind.Standard,
      level: 0,
      code: 'нВсего',
      total: 1500.67,
      totalBase: 1300.33,
    },
    {
      id: 2,
      name: 'Начисление справочное не для расчетов',
      kind: AdditionKind.Sprav,
      level: 0,
      code: 'нЧто',
      total: 150.0,
      totalBase: 130.8,
    },
    {
      id: 3,
      name: 'Начисление внутри пустое',
      kind: AdditionKind.Empty,
      level: 1,
      code: '',
      total: 0,
      totalBase: 0,
    },
  ],
  references: [
    {
      id: 1,
      name: 'ФЕР - ДЕМО',
      index: 'Индекс на поправку',
      method: 'Базисно-индексный метод (БИР)',
    },
    {
      id: 2,
      name: 'ФЕР - Ресурсов и ценников',
      index: '',
      method: 'ССЦ Базизно-индексный метод (сБР)',
    },
  ],
  data: [
    {
      id: 1,
      type: 'Раздел',
      fields: new Map(
        Object.entries({
          Наименование: 'Первый раздел',
          Итого: '100.65',
          ИтогоБаз: '80.00',
        })
      ),
      children: [
        {
          id: 2,
          type: 'Расценка',
          fields: new Map(
            Object.entries({
              Шифр: 'ФЕР 1-1-1-1',
              Наименование:
                'Разработка экскаваторами грунта в отвал и всяко такое',
              Итого: '10.65',
              ИтогоБаз: '8.00',
            })
          ),
          children: [],
          extensions: null,
        },
        {
          id: 3,
          type: 'Расценка',
          fields: new Map(
            Object.entries({
              Шифр: 'ФЕР 100-1000-010-0010',
              Наименование:
                'Разработка без экскаваторов грунта в отвал и всяко такое',
              Итого: '0.65',
              ИтогоБаз: '808.00',
            })
          ),
          children: [],
          extensions: null,
        },
      ],
      extensions: null,
    },
  ],
};
