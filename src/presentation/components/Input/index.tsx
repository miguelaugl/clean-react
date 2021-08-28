import React, { useRef } from 'react';

import { useForm } from '@/presentation/contexts/form';

import styles from './styles.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = (props: Props) => {
  const { state, setState } = useForm();
  const error = state[`${props.name}Error`];
  const inputRef = useRef<HTMLInputElement>();

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <div className={styles.inputWrap}>
      <input
        {...props}
        ref={inputRef}
        placeholder=' '
        data-testid={props.name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <label onClick={() => inputRef.current.focus()} htmlFor={props.id} aria-hidden='true'>
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}-status`}
        title={error || 'Tudo certo'}
        className={styles.status}
      >
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  );
};
