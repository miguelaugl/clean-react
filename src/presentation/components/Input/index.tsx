import React, { useRef } from 'react';

import { useForm } from '@/presentation/contexts';

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
    <div data-testid={`${props.name}-wrap`} className={styles.inputWrap} data-status={error ? 'invalid' : 'valid'}>
      <input
        {...props}
        ref={inputRef}
        placeholder=' '
        title={error}
        data-testid={props.name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <label data-testid={`${props.name}-label`} onClick={() => inputRef.current.focus()} htmlFor={props.id} aria-hidden='true' title={error}>
        {props.placeholder}
      </label>
    </div>
  );
};
