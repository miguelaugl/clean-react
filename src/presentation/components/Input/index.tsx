import { useForm } from '@/presentation/contexts/form';
import React from 'react';
import styles from './styles.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = (props: Props) => {
  const { state, setState } = useForm();
  const errorTitle = state[`${props.name}Error`];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const getStatus = (): string => '🔴';

  const getTitle = (): string => errorTitle;

  return (
    <div className={styles.inputWrap}>
      <input
        {...props}
        data-testid={props.name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <span data-testid={`${props.name}-status`} title={getTitle()} className={styles.status}>
        {getStatus()}
      </span>
    </div>
  );
};
