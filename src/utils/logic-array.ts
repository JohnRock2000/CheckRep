import { Dispatch, SetStateAction } from 'react';
import { ElementStates } from '../types/element-states';
import { timeDelay } from './time-delay';
import { SHORT_DELAY_IN_MS } from '../constants/delays';
import { TArr } from '../components/sorting-page/sorting-page-types';

// BM Подумать над улучшениями алгоритма сортировок
// СЛУЧАЙНЫЙ МАССИВ
export const randomArr = (
  setSortArray: Dispatch<SetStateAction<TArr[]>>,
  sortArray: TArr[]
) => {
  const randomArr = [];
  const lenLimit = Math.floor(Math.random() * (17 - 3 + 1)) + 3;
  for (let i = 0; i <= lenLimit; i++) {
    randomArr.push({
      value: Math.floor(Math.random() * 100),
      color: ElementStates.Default,
    });
  }
  setSortArray((sortArray = randomArr));
};

// ---------------------------------
// МЕТОДЫ СОРТИРОВКИ
export const selectionSortAsc = async (
  arr: TArr[],
  setSortArray: Dispatch<SetStateAction<TArr[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>,
  setIdLoadAsc: Dispatch<SetStateAction<boolean>>
) => {
  setLoad(true);
  setIdLoadAsc(true);

  for (let i = 0; i < arr.length - 1; i++) {
    let tmp = arr[i].value;
    let jIndex = 0;
    arr[i].color = ElementStates.Changing;
    for (let j = i + 1; j < arr.length; j++) {
      arr[j].color = ElementStates.Changing;
      setSortArray([...arr]);
      await timeDelay(SHORT_DELAY_IN_MS);
      if (arr[j].value <= tmp) {
        tmp = arr[j].value;
        jIndex = j;
      }
      arr[j].color = ElementStates.Default;
      setSortArray([...arr]);
    }
    if (tmp < arr[i].value) {
      arr[jIndex].value = arr[i].value;
      arr[i].value = tmp;
    }
    arr[i].color = ElementStates.Modified;

    setSortArray([...arr]);
  }
  if (arr.length <= 0 || arr.length === 1) {
    return;
  }
  arr[arr.length - 1].color = ElementStates.Modified;
  setSortArray([...arr]);
  setLoad(false);
  setIdLoadAsc(false);
};

export const selectionSortDsc = async (
  arr: TArr[],
  setSortArray: Dispatch<SetStateAction<TArr[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>,
  setIsLoadDesc: Dispatch<SetStateAction<boolean>>
) => {
  setLoad(true);
  setIsLoadDesc(true);

  for (let i = 0; i < arr.length - 1; i++) {
    let tmp = arr[i].value;
    let jIndex = 0;
    arr[i].color = ElementStates.Changing;
    for (let j = i + 1; j < arr.length; j++) {
      arr[j].color = ElementStates.Changing;
      setSortArray([...arr]);
      await timeDelay(SHORT_DELAY_IN_MS);
      if (arr[j].value >= tmp) {
        tmp = arr[j].value;
        jIndex = j;
      }
      arr[j].color = ElementStates.Default;
      setSortArray([...arr]);
    }
    if (tmp > arr[i].value) {
      arr[jIndex].value = arr[i].value;
      arr[i].value = tmp;
    }
    arr[i].color = ElementStates.Modified;

    setSortArray([...arr]);
  }
  if (arr.length <= 0 || arr.length === 1) {
    return;
  }
  arr[arr.length - 1].color = ElementStates.Modified;
  setSortArray([...arr]);
  setLoad(false);
  setIsLoadDesc(false);
};

export const sortingBubbleAsc = async (
  arr: TArr[],
  setSortArray: Dispatch<SetStateAction<TArr[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>,
  setIdLoadAsc: Dispatch<SetStateAction<boolean>>
) => {
  setLoad(true);
  setIdLoadAsc(true);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].color = ElementStates.Changing;
      arr[j + 1].color = ElementStates.Changing;
      setSortArray([...arr]);
      await timeDelay(SHORT_DELAY_IN_MS);
      if (arr[j].value > arr[j + 1].value) {
        const tmp = arr[j].value;
        arr[j].value = arr[j + 1].value;
        arr[j + 1].value = tmp;
      }
      arr[j].color = ElementStates.Default;
    }
    if (arr.length <= 0 || arr.length === 1) {
      return;
    }
    arr[arr.length - i - 1].color = ElementStates.Modified;
  }
  setLoad(false);
  setIdLoadAsc(false);
};

export const sortingBubbleDsc = async (
  arr: TArr[],
  setSortArray: Dispatch<SetStateAction<TArr[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>,
  setIsLoadDesc: Dispatch<SetStateAction<boolean>>
) => {
  setLoad(true);
  setIsLoadDesc(true);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].color = ElementStates.Changing;
      arr[j + 1].color = ElementStates.Changing;
      setSortArray([...arr]);
      await timeDelay(SHORT_DELAY_IN_MS);
      if (arr[j].value < arr[j + 1].value) {
        const tmp = arr[j].value;
        arr[j].value = arr[j + 1].value;
        arr[j + 1].value = tmp;
      }
      arr[j].color = ElementStates.Default;
    }
    if (arr.length <= 0 || arr.length === 1) {
      return;
    }
    arr[arr.length - i - 1].color = ElementStates.Modified;
  }
  setLoad(false);
  setIsLoadDesc(false);
};

// ---------------------------------
