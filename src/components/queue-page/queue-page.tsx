import React from 'react';
import styles from './queue-page.module.css';
import { ElementStates } from '../../types/element-states';
import { userQueue } from './class-queue';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { timeDelay } from '../../utils/time-delay';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const QueuePage: React.FC = () => {
  // СТЕЙТЫ
  const [inputValue, setInputValue] = React.useState<string>('');
  const [array, setArray] = React.useState<string[]>([]);
  const [isLoadingAdd, setIsLoadingAdd] = React.useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);
  const [animationColor, setAnimationColor] = React.useState(
    ElementStates.Default
  );
  const [actionType, setActionType] = React.useState<string>('');

  // ИНИЦИАЛИЗАЦИЯ КОМПОНЕНТА
  React.useEffect(() => {
    setArray([...userQueue.getElements()]);
    return () => {
      userQueue.deleteElements();
      setArray([...userQueue.getElements()]);
    };
  }, []);

  // Утилитарная смена цвета
  const changeAnimationColor = async () => {
    setAnimationColor(ElementStates.Changing);
    await timeDelay(SHORT_DELAY_IN_MS);
    setAnimationColor(ElementStates.Default);
  };

  // ХЕНДЛЕРЫ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const doAction = async (type: string) => {
    switch (type) {
      case 'add':
        setIsLoadingAdd(true);
        setActionType('push');
        await changeAnimationColor();
        userQueue.enqueue(inputValue);
        setArray([...userQueue.getElements()]);
        setInputValue('');
        setIsLoadingAdd(false);
        break;

      case 'remove':
        setIsLoadingDelete(true);
        setActionType('');
        await changeAnimationColor();
        userQueue.dequeue();
        setArray([...userQueue.getElements()]);
        setIsLoadingDelete(false);
        break;

      case 'reset':
        userQueue.deleteElements();
        setArray([...userQueue.getElements()]);
        setInputValue('');
        break;

      default:
        break;
    }
  };

  // ВЫВОД
  return (
    <SolutionLayout title='Очередь'>
      <form className={styles.form}>
        <Input
          extraClass={styles.input}
          type='text'
          isLimitText={true}
          maxLength={4}
          value={`${inputValue}`}
          onChange={handleChange}
        />
        <Button
          text='Добавить'
          isLoader={isLoadingAdd}
          disabled={isLoadingDelete || !inputValue || userQueue.isFull()}
          onClick={() => {
            doAction('add');
          }}
          type='submit'
        />
        <Button
          text='Удалить'
          isLoader={isLoadingDelete}
          disabled={isLoadingAdd || !!userQueue.isEmpty()}
          onClick={() => {
            doAction('remove');
          }}
          type='button'
        />
        <Button
          extraClass={styles.button_type_reset}
          text='Очистить'
          disabled={isLoadingAdd || isLoadingDelete || !!userQueue.isEmpty()}
          onClick={() => {
            doAction('reset');
          }}
          type='reset'
        />
      </form>
      <div className={styles.list}>
        {array.map((letter, i) => (
          <Circle
            head={i === userQueue.head && letter ? 'head' : ''}
            tail={i === userQueue.tail - 1 && letter ? 'tail' : ''}
            letter={letter}
            key={i}
            index={i}
            state={
              actionType === 'push'
                ? i === userQueue.tail
                  ? animationColor
                  : ElementStates.Default
                : i === userQueue.head
                ? animationColor
                : ElementStates.Default
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
