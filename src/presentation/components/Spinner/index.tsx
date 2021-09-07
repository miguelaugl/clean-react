import React from 'react';

import styles from './styles.scss';

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean;
};

export const Spinner = ({ isNegative, ...props }: Props) => {
  const negativeClasses = isNegative ? styles.negative : '';
  return (
    <div {...props} data-testid='spinner' className={[styles.spinner, props.className, negativeClasses].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
