import React, { memo } from 'react';
import styles from './styles.scss';

const FooterComponent = () => <footer className={styles.footer} />;

export const Footer = memo(FooterComponent);
