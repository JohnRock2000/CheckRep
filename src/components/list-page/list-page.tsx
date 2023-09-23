import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './list-page.module.css';
import { timeDelay as delay } from '../../utils/time-delay';
import { List } from './list-page-class';
import {
  addToHead,
  addToTail,
  example,
  addItemIndex,
  removeFromHead,
  removeItemIndex,
  removeTailItem,
} from '../../utils/list-logic';
import { TItem } from './list-page-types';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';

export const ListPage: React.FC = () => {
  // СТЕЙТЫ
  const [list] = useState(new List(example));
  const [listArr, setListArr] = useState<TItem[]>(list.arr);
  const [disbledbtn, setDisabledBtn] = useState<boolean>(false);
  const [inputState, setInputState] = useState<string>('');
  const [inputIndxState, setInputIndxState] = useState<string>('');
  const [isAddHead, setAddHead] = useState<boolean>(false);
  const [isbottom, setbottom] = useState<boolean>(false);
  const [isAddTail, setAddTail] = useState<boolean>(false);
  const [isRemoveTail, setRemoveTail] = useState<boolean>(false);
  const [isRemoveHead, setRemoveHead] = useState<boolean>(false);
  const [isRemoveIndx, setRemoveIndx] = useState<boolean>(false);
  const [isAddIndx, setAddIndx] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [smallCircle, setSmallCircle] = useState<TItem>({
    value: '',
    color: ElementStates.Changing,
    position: -1,
  });

  // ХЕНДЛЕРЫ
  // Ввод индекса
  const changeIndexInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndxState(evt.target.value);
    const num = Number(evt.target.value);
    if (num > list.arr.length) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  };

  // Ввод значения
  const changeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(evt.target.value);
  };

  // Добавление
  const AnimAdd = async (num: number, end: number) => {
    for (let i = 0; i <= end; i++) {
      setSmallCircle({
        ...smallCircle,
        value: inputState,
        position: i,
      });
      await delay(SHORT_DELAY_IN_MS);
      list.arr[num].color = ElementStates.Changing;
      if (num < end) {
        num++;
      }
      setListArr([...list.arr]);
    }
  };

  // Удаление
  const AnimRemove = async (end: number) => {
    setIsStarted(true);
    for (let i = 0; i <= end; i++) {
      list.arr[i].color = ElementStates.Changing;
      setListArr([...list.arr]);
      await delay(SHORT_DELAY_IN_MS);
    }
    list.arr[end].color = ElementStates.Default;
    setSmallCircle({
      ...smallCircle,
      value: list.arr[end].value,
      position: end,
    });
    await delay(SHORT_DELAY_IN_MS);
    setIsStarted(false);
  };

  return (
    <SolutionLayout title='Связный список'>
      <div className={styles.input_wrapper}>
        <div className={styles.buttons_wrapper}>
          <Input
            maxLength={4}
            isLimitText={true}
            value={inputState}
            onChange={changeInput}
          />
          <Button
            text='Добавить в head'
            onClick={() =>
              addToHead(
                setIsStarted,
                setAddHead,
                setSmallCircle,
                smallCircle,
                inputState,
                list,
                setListArr,
                setInputIndxState,
                setInputState
              )
            }
            disabled={!inputState || isStarted}
            isLoader={isAddHead}
          />
          <Button
            text='Добавить в tail'
            disabled={!inputState || isStarted}
            onClick={() =>
              addToTail(
                setIsStarted,
                setAddTail,
                setSmallCircle,
                smallCircle,
                inputState,
                list,
                setListArr,
                setInputIndxState,
                setInputState
              )
            }
            isLoader={isAddTail}
          />
          <Button
            text='Удалить из head'
            onClick={() =>
              removeFromHead(
                setIsStarted,
                setRemoveHead,
                setbottom,
                setSmallCircle,
                smallCircle,
                list,
                setListArr,
                setInputIndxState,
                setInputState
              )
            }
            isLoader={isRemoveHead}
            disabled={list.isEmpty() || isStarted}
          />
          <Button
            text='Удалить из tail'
            onClick={() =>
              removeTailItem(
                setIsStarted,
                setRemoveTail,
                setbottom,
                setSmallCircle,
                smallCircle,
                list,
                setListArr,
                setInputIndxState,
                setInputState
              )
            }
            isLoader={isRemoveTail}
            disabled={list.isEmpty() || isStarted}
          />
          <Input
            maxLength={4}
            type='number'
            value={inputIndxState}
            onChange={changeIndexInput}
            placeholder='Введите индекс'
          />
          <Button
            extraClass={styles.index_add}
            text='Добавить по индексу'
            disabled={!inputIndxState || !inputState || isStarted}
            onClick={() =>
              addItemIndex(
                setIsStarted,
                setAddIndx,
                setSmallCircle,
                inputState,
                inputIndxState,
                list,
                setListArr,
                setInputIndxState,
                setInputState,
                AnimAdd
              )
            }
            isLoader={isAddIndx}
          />
          <Button
            extraClass={styles.index_remove}
            text='Удалить по индексу'
            disabled={
              !inputIndxState ||
              disbledbtn ||
              isStarted ||
              Number(inputIndxState) > listArr.length - 1 ||
              Number(inputIndxState) < 0
            }
            onClick={() =>
              removeItemIndex(
                setIsStarted,
                setRemoveIndx,
                setbottom,
                setSmallCircle,
                inputIndxState,
                list,
                setListArr,
                setInputIndxState,
                setInputState,
                AnimRemove
              )
            }
            isLoader={isRemoveIndx}
          />
        </div>
      </div>
      <ul className={styles.circle_list}>
        {listArr?.map((item, index) => (
          <li className={styles.circles_box} key={index}>
            {smallCircle.position === index && (
              <Circle
                isSmall={true}
                letter={smallCircle.value}
                state={smallCircle.color}
                extraClass={`${isbottom && styles.bottom_circle}`}
              />
            )}
            <Circle
              extraClass={styles.default_circle}
              letter={item.value}
              state={item.color}
              index={index}
              tail={
                index === list.getTail() && index !== smallCircle.position
                  ? 'tail'
                  : ''
              }
              head={
                index === list.getHead() && index !== smallCircle.position
                  ? 'head'
                  : ''
              }
            />
            {index < listArr.length - 1 && (
              <div className={styles.arrow_box}>
                <ArrowIcon />
              </div>
            )}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
