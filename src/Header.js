import React, { useCallback, useState } from 'react';

import styles from './Header.module.css';

const Header = ({ shareUrl = '' }) => {
  const [buttonText, setButtonText] = useState('Share');

  const handleShareButtonClick = useCallback(async () => {
    // update addressbar with shareUrl
    window.history.replaceState(null, '', shareUrl)

    if (!navigator.clipboard) {
      prompt('Clipboard API is not supported in your environment. Please manually copy the following URL', shareUrl);
    } else {
      await navigator.clipboard.writeText(shareUrl)
      setButtonText('URL is copied to clipboard!')

      setTimeout(() => {
        setButtonText('Share')
      }, 3000)
    }
  }, [shareUrl]);

  return (
    <div className={styles.container}>
      <header>
        <div>
          <a href="https://terser.org">
            <img
              src="https://terser.org/img/terser-square-logo.png"
              alt=""
              role="presentation"
            />
            <h1>Terser REPL</h1>
          </a>
          <p>Try Terser on this page</p>
        </div>
        <button onClick={handleShareButtonClick}>{buttonText}</button>
      </header>
    </div>
  );
};

export default Header;
