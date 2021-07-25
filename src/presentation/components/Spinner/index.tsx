import React from 'react';
import styles from './styles.scss';

type Props = React.HTMLAttributes<HTMLElement>;

export const Spinner = (props: Props) => (
  <div {...props} className={[styles.spinner, props.className].join(' ')}>
    <div />
    <div />
    <div />
    <div />
  </div>
);
