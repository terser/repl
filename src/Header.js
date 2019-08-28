import React from 'react';

import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.container}>
      <header>
        <a href="https://terser.org">
          <img
            src="https://terser.org/img/terser-square-logo.png"
            alt="Terser logo"
          />
          <h2>terser</h2>
        </a>
      </header>
    </div>
  );
};

export default Header;
