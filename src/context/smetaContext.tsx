import React, { createContext, useState } from 'react';
import { Smeta, GRecord } from './gss.types';
import { gssTestSmeta } from './gss.smeta';

// consts and types
interface SmetaContextProvider {
  currentFile: string;
  smeta: Smeta;
  // view state
  showAddi: boolean;
  showRefs: boolean;
  curRecID: number | null;
  curRec: GRecord | null;
  // common actions
  openFile: (file: string) => void;
  // view actions
  toggleShowAddi: () => void;
  toggleShowRefs: () => void;
  toggleRecordStatus: (param: number) => void;
  getRecordStatus: (recID: number) => number;
  selectRec: (recID: number) => void;
  // gss Actions
  gssChangeQuantity: () => void;
  gssCopyItem: () => void;
}

const initialFile = 'small';
const initialSmeta: Smeta = gssTestSmeta;
const initialShowAddi = false;
const initialShowRefs = false;
const initialRecID = null;
const initialCurRec = null;
const defaultContext: SmetaContextProvider = {
  currentFile: initialFile,
  smeta: initialSmeta,
  // view state
  showAddi: initialShowAddi,
  showRefs: initialShowRefs,
  curRecID: initialRecID,
  curRec: initialCurRec,
  // common actions
  openFile: (file: string) => {},
  // view actions
  toggleShowAddi: () => {},
  toggleShowRefs: () => {},
  toggleRecordStatus: (param: number) => {},
  getRecordStatus: (recID: number): number => {
    return 0;
  },
  selectRec: (recID: number) => {},
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
  const [collapses, setCollapses] = useState(new Map<number, number>());
  const [curRecID, setCurRecID] = useState<number | null>(initialRecID);
  const [curRec, setCurRec] = useState<GRecord | null>(initialCurRec);

  // common actions
  const openFile = (file: string) => {
    // do file opening operations
    gssRecalc(initialSmeta);
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
  const getRecordStatus = (recID: number): number => {
    const status = collapses.get(recID);
    return status || 0;
  };
  const toggleRecordStatus = (param: number) => {
    // do toggle state of param of record in smeta
    if (curRecID) {
      const newCollapses = new Map<number, number>(collapses);
      let status = getRecordStatus(curRecID);
      if ((status & param) === param) status -= param;
      else status += param;
      newCollapses.set(curRecID, status);
      setCollapses(newCollapses);
    }
  };
  const selectRec = (recID: number) => {
    // set current selected record
    setCurRecID(recID);
    setCurRec(gssFindRec(smeta, recID));
  };

  // gss actions
  const gssRecalc = (sm: Smeta) => {
    console.log('Recalc');
    let total = 0;
    sm.data.forEach((part) => {
      part.children?.forEach((cost) => {
        total += parseFloat(cost.fields.get('Итого') as string);
      });
    });
    const newSmeta = { ...smeta };
    newSmeta.total = total;
    setSmeta(newSmeta);
  };

  const gssFindRec = (sm: Smeta, recID: number): GRecord | null => {
    return null;
  };

  const gssChangeQuantity = () => {
    // change quantity
    // curRecID;
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
        curRec,
        // common actions
        openFile,
        // view actions
        toggleShowAddi,
        toggleShowRefs,
        toggleRecordStatus,
        getRecordStatus,
        selectRec,
        gssChangeQuantity,
        gssCopyItem,
      }}
    >
      {props.children}
    </SmetaContext.Provider>
  );
};
