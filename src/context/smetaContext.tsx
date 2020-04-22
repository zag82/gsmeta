import React, { createContext, useState } from 'react';
import { Smeta, AdditionKind } from './gss.types';

// consts and types
interface SmetaContextProvider {
  currentFile: string;
  smeta: Smeta;
  // view state
  showAddi: boolean;
  showRefs: boolean;
  curRecID: number | null;
  // common actions
  openFile: (file: string) => void;
  // view actions
  toggleShowAddi: () => void;
  toggleShowRefs: () => void;
  toggleRecordState: (param: number) => void;
  setCurRecID: (recID: number) => void;
  // gss Actions
  gssChangeQuantity: () => void;
  gssCopyItem: () => void;
}

const initialFile = 'small';
const initialSmeta: Smeta = {
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
      id: 2,
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
};
const initialShowAddi = false;
const initialShowRefs = false;
const initialRecID = null;
const defaultContext: SmetaContextProvider = {
  currentFile: initialFile,
  smeta: initialSmeta,
  // view state
  showAddi: initialShowAddi,
  showRefs: initialShowRefs,
  curRecID: initialRecID,
  // common actions
  openFile: (file: string) => {},
  // view actions
  toggleShowAddi: () => {},
  toggleShowRefs: () => {},
  toggleRecordState: (param: number) => {},
  setCurRecID: (recID: number) => {},
  // gss Actions
  gssChangeQuantity: () => {},
  gssCopyItem: () => {},
};

// context
export const SmetaContext = createContext<SmetaContextProvider>(defaultContext);

interface Props {
  children: React.ReactNode;
}
export const SmetaProvider = (props: Props) => {
  // state
  const [currentFile, setFile] = useState<string>(initialFile);
  const [smeta, setSmeta] = useState<Smeta>(initialSmeta);
  const [showAddi, setShowAddi] = useState<boolean>(initialShowAddi);
  const [showRefs, setShowRefs] = useState<boolean>(initialShowRefs);
  const [curRecID, setCurRecID] = useState<number | null>(initialRecID);

  // common actions
  const openFile = (file: string) => {
    // do file opening operations
    // store file
    setFile(file);
  };

  // view actions
  const toggleShowAddi = () => {
    setShowAddi(!showAddi);
  };
  const toggleShowRefs = () => {
    setShowRefs(!showRefs);
  };
  const toggleRecordState = (param: number) => {
    // do toggle state of param of record in smeta
  };

  // gss actions
  const gssChangeQuantity = () => {
    // change quantity
  };

  const gssCopyItem = () => {
    // copy item
  };

  return (
    <SmetaContext.Provider
      value={{
        currentFile,
        smeta,
        showAddi,
        showRefs,
        curRecID,
        // common actions
        openFile,
        // view actions
        toggleShowAddi,
        toggleShowRefs,
        toggleRecordState,
        setCurRecID,
        gssChangeQuantity,
        gssCopyItem,
      }}
    >
      {props.children}
    </SmetaContext.Provider>
  );
};
