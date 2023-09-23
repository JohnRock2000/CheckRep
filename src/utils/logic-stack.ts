import { Dispatch, SetStateAction } from 'react';
import { SHORT_DELAY_IN_MS } from '../constants/delays';
import { ElementStates } from '../types/element-states';
import { timeDelay } from './time-delay';
import { Stack } from '../components/stack-page/stack-class';
import { TItem } from '../components/stack-page/stack-page-types';

// ДОБАВЛЕНИЕ ЭЛЕМЕНТА
export const addItem = async (
  setAddLoad: Dispatch<SetStateAction<boolean>>,
  inputState: string,
  setStackArr: Dispatch<SetStateAction<TItem[]>>,
  setInputState: Dispatch<SetStateAction<string>>,
  stack: Stack<TItem>
) => {
  setAddLoad(true);
  stack.push({ value: inputState, color: ElementStates.Changing });
  setStackArr([...stack.elements()]);
  setInputState('');
  await timeDelay(SHORT_DELAY_IN_MS);
  stack.lastItem.color = ElementStates.Default;
  setStackArr([...stack.elements()]);
  setAddLoad(false);
};

// УДАЛЕНИЕ ЭЛЕМЕНТА
export const deleteItem = async (
  setRemoveLoad: Dispatch<SetStateAction<boolean>>,
  setStackArr: Dispatch<SetStateAction<TItem[]>>,
  stack: Stack<TItem>
) => {
  setRemoveLoad(true);
  stack.lastItem.color = ElementStates.Changing;
  setStackArr([...stack.elements()]);
  await timeDelay(SHORT_DELAY_IN_MS);
  stack.pop();
  setStackArr([...stack.elements()]);
  setRemoveLoad(false);
};

// ОЧИСТКА СТЕКА
export const clearStack = (
  setStackArray: Dispatch<SetStateAction<TItem[]>>,
  stack: Stack<TItem>
) => {
  stack.clear();
  setStackArray([...stack.elements()]);
};

// ПОКАЗАТЬ HEAD
export const takeTop = (index: number, arr: TItem[]): string | null => {
  if (index === arr.length - 1) {
    return 'top';
  } else {
    return null;
  }
};
