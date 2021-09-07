import React from 'react';

import styles from './styles.scss';

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean;
};

export const Spinner = (props: Props) => {
  const negativeClasses = props.isNegative ? styles.negative : '';
  return (
    <div {...props} data-testid='spinner' className={[styles.spinner, props.className, negativeClasses].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
