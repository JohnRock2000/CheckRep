import { ElementStates } from '../types/element-states';
import { IDataGet } from '../components/string/string-interface';
import { timeDelay } from './time-delay';

export const stringReverse = async ({
  userText,
  setResult,
  setLoad,
}: IDataGet) => {
  // Создаем массив объектов, с индивидуальным типом
  const elements = userText
    .split('')
    .map((element) => ({ element, color: ElementStates.Default }));

  // Включаем лоадер
  setLoad(true);

  const middle = Math.floor(elements.length / 2);
  for (let i = 0; i < middle; i++) {
    elements[i].color = ElementStates.Changing;
    elements[elements.length - 1 - i].color = ElementStates.Changing;
    setResult([...elements]);
    await timeDelay(1000);

    let temp = elements[i];
    elements[i] = elements[elements.length - 1 - i];
    elements[elements.length - 1 - i] = temp;

    // Меняем цвета на результирующие
    elements[i].color = ElementStates.Modified;
    elements[elements.length - 1 - i].color = ElementStates.Modified;
  }
  elements[middle].color = ElementStates.Modified;
  setResult([...elements]);
  //   console.log(elements);
  setLoad(false);
};
