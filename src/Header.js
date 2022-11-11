import React from 'react';

import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.container}>
      <header>
        <a href="https://terser.org">
          <img
            src="https://terser.org/img/terser-square-logo.png"
            alt=""
            role="presentation"
          />
          <h1>Terser REPL</h1>
        </a>
        <p>Try Terser in your browser</p>
      </header>
    </div>
  );
};

export default Header;
