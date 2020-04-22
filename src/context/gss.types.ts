export interface Smeta {
  total: number;
  additions: Addition[];
  references: GRef[];
}

export interface GRecord {
  id: number;
}

// начисления
export enum AdditionKind {
  Standard,
  Sprav,
  Empty,
  Subtotal,
}
export interface Addition extends GRecord {
  name: string;
  kind: AdditionKind;
  level: number;
  code: string;
  total: number;
  totalBase: number;
}

// привязки
export interface GRef extends GRecord {
  name: string;
  index: string;
  method: string;
}
