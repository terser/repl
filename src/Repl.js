import React, { useState } from 'react';
import ReplOptions from './ReplOptions';
import CodeMirrorPanel from './CodeMirrorPanel';

import styles from './Repl.module.css';

const Repl = () => {
  return (
    <div className={styles.container}>
      <ReplOptions />

      <div className={styles.wrapperPanels}>
        <div className={styles.panels}>
          <CodeMirrorPanel />
          <CodeMirrorPanel />
        </div>
      </div>
    </div>
  );
}

export default Repl;
