import { Dispatch, SetStateAction } from 'react';
import { List } from '../components/list-page/list-page-class';
import { ElementStates } from '../types/element-states';
import { timeDelay } from './time-delay';
import { SHORT_DELAY_IN_MS } from '../constants/delays';
import { TItem } from '../components/list-page/list-page-types';

// Добавление через индекс
export const addItemIndex = async (
  setOperationStarted: Dispatch<SetStateAction<boolean>>,
  setAddIndx: Dispatch<SetStateAction<boolean>>,
  setSmallCircle: Dispatch<SetStateAction<TItem>>,
  inputState: string,
  inputIndxState: string,
  list: List<string>,
  setListArr: Dispatch<SetStateAction<TItem[]>>,
  setInputIndxState: Dispatch<SetStateAction<string>>,
  setInputState: Dispatch<SetStateAction<string>>,
  runAnim: (num: number, end: number) => void
) => {
  setOperationStarted(true);
  setAddIndx(true);
  let num = 0;
  const end = Number(inputIndxState);
  await runAnim(num, end);
  setSmallCircle({
    value: '',
    position: -1,
    color: ElementStates.Changing,
  });
  list.setAllElDefaultCollor();
  list.pushByIndx(
    { value: inputState, color: ElementStates.Modified },
    inputIndxState
  );
  list.setTail();
  setListArr([...list.arr]);
  await timeDelay(SHORT_DELAY_IN_MS);
  list.arr[end].color = ElementStates.Default;
  setListArr([...list.arr]);
  setInputIndxState('');
  setInputState('');
  setAddIndx(false);
  setOperationStarted(false);
};

// TODO Дописать удаление...
// Удаление через индекс
export const removeItemIndex = async (
  setOperationStarted: Dispatch<SetStateAction<boolean>>,
  setRemoveIndx: Dispatch<SetStateAction<boolean>>,
  setbottomOper: Dispatch<SetStateAction<boolean>>,
  setSmallCircle: Dispatch<SetStateAction<TItem>>,
  inputIndxState: string,
  list: List<string>,
  setListArr: Dispatch<SetStateAction<TItem[]>>,
  setInputIndxState: Dispatch<SetStateAction<string>>,
  setInputState: Dispatch<SetStateAction<string>>,
  runAnim: (end: number) => void
) => {
  setOperationStarted(true);
  setRemoveIndx(true);
  setbottomOper((isbottom) => !isbottom);
  const end = Number(inputIndxState);
  await runAnim(end);
  list.removeByIndx(inputIndxState);
  list.setTail();
  setListArr([...list.arr]);
  setSmallCircle({
    value: '',
    position: -1,
    color: ElementStates.Changing,
  });
  list.setAllElDefaultCollor();
  setListArr([...list.arr]);
  setbottomOper((isbottom) => !isbottom);
  setInputIndxState('');
  setInputState('');
  setRemoveIndx(false);
  setOperationStarted(false);
};
// Добавление с головы
export const addToHead = async (
  setStart: Dispatch<SetStateAction<boolean>>,
  setAddHead: Dispatch<SetStateAction<boolean>>,
  setSmallCircle: Dispatch<SetStateAction<TItem>>,
  smallCircle: TItem,
  inputState: string,
  list: List<string>,
  setListArr: Dispatch<SetStateAction<TItem[]>>,
  setInputIndxState: Dispatch<SetStateAction<string>>,
  setInputState: Dispatch<SetStateAction<string>>
) => {
  setStart(true);
  setAddHead(true);
  setSmallCircle({
    ...smallCircle,
    position: 0,
    value: inputState,
  });
  await timeDelay(SHORT_DELAY_IN_MS);
  list.pushInHead({ value: inputState, color: ElementStates.Modified });
  setSmallCircle({
    value: '',
    position: -1,
    color: ElementStates.Changing,
  });
  list.setTail();
  setListArr([...list.arr]);
  await timeDelay(SHORT_DELAY_IN_MS);
  list.arr[list.head].color = ElementStates.Default;
  setListArr([...list.arr]);
  setInputIndxState('');
  setInputState('');
  setAddHead(false);
  setStart(false);
};

// Удаление с головы
export const removeFromHead = async (
  setStart: Dispatch<SetStateAction<boolean>>,
  setRemoveHead: Dispatch<SetStateAction<boolean>>,
  setbottomOper: Dispatch<SetStateAction<boolean>>,
  setSmallCircle: Dispatch<SetStateAction<TItem>>,
  smallCircle: TItem,
  list: List<string>,
  setListArr: Dispatch<SetStateAction<TItem[]>>,
  setInputIndxState: Dispatch<SetStateAction<string>>,
  setInputState: Dispatch<SetStateAction<string>>
) => {
  setStart(true);
  setRemoveHead(true);
  setbottomOper((isbottom) => !isbottom);
  setSmallCircle({
    ...smallCircle,
    position: 0,
    value: list.arr[0].value,
  });
  await timeDelay(SHORT_DELAY_IN_MS);
  setInputIndxState('');
  setInputState('');
  list.removeHead();
  setSmallCircle({
    value: '',
    position: -1,
    color: ElementStates.Changing,
  });
  list.setTail();
  setListArr([...list.arr]);
  setbottomOper((isbottom) => !isbottom);
  setRemoveHead(false);
  setStart(false);
};

// Добавление в конец
export const addToTail = async (
  setStart: Dispatch<SetStateAction<boolean>>,
  setAddTail: Dispatch<SetStateAction<boolean>>,
  setSmallCircle: Dispatch<SetStateAction<TItem>>,
  smallCircle: TItem,
  inputState: string,
  list: List<string>,
  setListArr: Dispatch<SetStateAction<TItem[]>>,
  setInputIndxState: Dispatch<SetStateAction<string>>,
  setInputState: Dispatch<SetStateAction<string>>
) => {
  setStart(true);
  setAddTail(true);
  setSmallCircle({
    ...smallCircle,
    position: list.arr.length - 1,
    value: inputState,
  });
  await timeDelay(SHORT_DELAY_IN_MS);
  list.pushInTail({ value: inputState, color: ElementStates.Modified });
  list.setTail();
  setListArr([...list.arr]);
  setSmallCircle({
    value: '',
    position: -1,
    color: ElementStates.Changing,
  });
  await timeDelay(SHORT_DELAY_IN_MS);
  list.getLastEl().color = ElementStates.Default;
  setListArr([...list.arr]);
  setInputIndxState('');
  setInputState('');
  setAddTail(false);
  setStart(false);
};

// Удаление с конца
export const removeTailItem = async (
  setOperationStarted: Dispatch<SetStateAction<boolean>>,
  setRemoveTail: Dispatch<SetStateAction<boolean>>,
  setbottomOper: Dispatch<SetStateAction<boolean>>,
  setSmallCircle: Dispatch<SetStateAction<TItem>>,
  smallCircle: TItem,
  list: List<string>,
  setListArr: Dispatch<SetStateAction<TItem[]>>,
  setInputIndxState: Dispatch<SetStateAction<string>>,
  setInputState: Dispatch<SetStateAction<string>>
) => {
  setOperationStarted(true);
  setRemoveTail(true);
  setbottomOper((isbottom) => !isbottom);
  setSmallCircle({
    ...smallCircle,
    position: list.arr.length - 1,
    value: list.getLastEl().value,
  });
  list.getLastEl().value = '';
  setListArr([...list.arr]);
  await timeDelay(SHORT_DELAY_IN_MS);
  list.removeTail();
  list.setTail();
  setListArr([...list.arr]);
  setInputIndxState('');
  setInputState('');
  setbottomOper((isbottom) => !isbottom);
  setRemoveTail(false);
  setOperationStarted(false);
};

export const example = [
  { value: '0', color: ElementStates.Default },
  { value: '1', color: ElementStates.Default },
  { value: '2', color: ElementStates.Default },
];
