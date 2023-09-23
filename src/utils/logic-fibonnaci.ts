import { SHORT_DELAY_IN_MS } from '../constants/delays';
import { IFibonacci } from '../components/fibonacci-page/fibonacci-page-types';
import { timeDelay } from './time-delay';

export const calculateFibonacci = async ({
  userText,
  setLoad,
  setResult,
}: IFibonacci) => {
  //   console.log(userText);
  const numberQuery = Number(userText);
  const baseArray = ['1', '1'];

  for (let i = 2; i < numberQuery + 1; i++) {
    const first = Number(baseArray[i - 1]);
    const second = Number(baseArray[i - 2]);
    const res = first + second;
    baseArray.push(String(res));
  }

  setLoad(true);
  for (let i = 0; i <= baseArray.length; i++) {
    await timeDelay(SHORT_DELAY_IN_MS);
    setResult(baseArray.slice(0, i + 1));
  }
  setLoad(false);
};
