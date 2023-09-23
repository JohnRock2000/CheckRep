import { ElementStates } from '../../types/element-states';

export interface IDataGet {
  userText: string;
  setResult: React.Dispatch<React.SetStateAction<IString[]>>;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface IString {
  element: string;
  color: ElementStates;
}
