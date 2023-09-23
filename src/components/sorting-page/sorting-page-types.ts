import { ElementStates } from '../../types/element-states';

export type TArr = {
  value: number;
  color: ElementStates;
};

export enum SortingRadioType {
  SelectionSort = 'selectsort',
  Bubble = 'bubble',
}
