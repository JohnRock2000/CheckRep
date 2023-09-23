import React, { useState } from 'react';
import styles from './stack-page.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Stack } from './stack-class';
import {
  addItem,
  clearStack,
  deleteItem,
  takeTop,
} from '../../utils/logic-stack';
import { TItem } from './stack-page-types';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';

export const StackPage: React.FC = () => {
  // СТЕЙТЫ
  const [stack] = useState(new Stack<TItem>());
  const [stackArr, setStackArray] = useState<TItem[]>(stack.arr);
  const [inputState, setInputState] = useState<string>('');
  const [isAddLoad, setAddLoad] = useState<boolean>(false);
  const [isRemoveLoad, setRemoveLoad] = useState<boolean>(false);

  // ХЕНДЛЕРЫ
  const changeInputHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(evt.target.value);
  };

  const actionsList = (type: string) => {
    switch (type) {
      case 'add':
        addItem(setAddLoad, inputState, setStackArray, setInputState, stack);
        break;
      case 'remove':
        deleteItem(setRemoveLoad, setStackArray, stack);
        break;
      case 'clear':
        clearStack(setStackArray, stack);
        break;
      default:
        break;
    }
  };

  // ВЫВОД
  return (
    <SolutionLayout title='Стек'>
      <div className={styles.wrapper}>
        <Input
          maxLength={4}
          isLimitText={true}
          value={inputState}
          onChange={changeInputHandler}
        />
        <div className={styles.button_wrapper}>
          <Button
            text='Добавить'
            onClick={() => actionsList('add')}
            isLoader={isAddLoad}
            disabled={!inputState}
          />
          <Button
            text='Удалить'
            onClick={() => actionsList('remove')}
            disabled={stack.arr.length <= 0}
            isLoader={isRemoveLoad}
          />
          <Button
            text='Очистить'
            onClick={() => actionsList('clear')}
            disabled={stack.arr.length <= 0}
          />
        </div>
      </div>
      <div className={styles.circle_list}>
        {stackArr?.map((item, i) => (
          <Circle
            key={i}
            letter={item.value}
            state={item.color}
            head={takeTop(i, stackArr)}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
