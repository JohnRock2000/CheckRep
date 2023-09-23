import React, { useState } from 'react';
import styles from './string-page.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import classNames from 'classnames';
import { stringReverse } from '../../utils/logic-string';
import { IString } from './string-interface';
import { Circle } from '../ui/circle/circle';

export const StringComponent: React.FC = () => {
  // Храним введенный текст в стейте
  const [userText, setUserText] = useState<string>('');
  // Стейт для результата
  const [result, setResult] = useState<IString[]>([]);
  // Стейт лоадера
  const [isLoad, setLoad] = useState<boolean>(false);

  const changeUserString = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserText(evt.target.value);
  };

  const runCalculate = () => {
    stringReverse({
      userText: userText,
      setResult,
      setLoad,
    });
  };

  return (
    <SolutionLayout title='Строка'>
      <div className={classNames(styles.wrapper)}>
        <Input
          maxLength={11}
          isLimitText={true}
          onChange={changeUserString}
          value={userText}
        />
        <Button
          text='Развернуть'
          isLoader={isLoad}
          disabled={false}
          onClick={runCalculate}
        />
      </div>
      <div className={styles.result}>
        {result.map((element, i) => (
          <Circle key={i} letter={element.element} state={element.color} />
        ))}
      </div>
    </SolutionLayout>
  );
};
