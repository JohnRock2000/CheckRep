import React, { useState } from 'react';
import styles from './fibonacci-page.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import classNames from 'classnames';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { calculateFibonacci } from '../../utils/logic-fibonnaci';
import { INumber } from './fibonacci-page-types';

export const FibonacciPage: React.FC = () => {
  const [isLoad, setLoad] = useState<boolean>(false);
  const [userText, setUserText] = useState<string>('');
  const [result, setResult] = useState<string[]>([]);

  const changeUserString = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = evt.target;
    if (Number(value) > 19) value = '19';
    setUserText(value);
  };

  const runCalculate = () => {
    calculateFibonacci({ userText, setLoad, setResult });
  };

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <div className={classNames(styles.wrapper)}>
        <Input
          min={1}
          max={19}
          value={userText}
          isLimitText={true}
          type='number'
          onChange={changeUserString}
        />
        <Button
          text='Рассчитать'
          isLoader={isLoad}
          disabled={false}
          onClick={runCalculate}
        />
      </div>
      <div className={styles.result}>
        {result.map((el, i) => (
          <Circle key={i} letter={el} index={i} />
        ))}
      </div>
    </SolutionLayout>
  );
};
