import React from 'react';

import OptionsSection from './OptionsSection';

import styles from './ReplOptions.module.css';

const ReplOptions = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.expandedContainer}>
        <div className={styles.sectionsWrapper}>
          <div>
            <OptionsSection
              className={styles.section}
              label='Terser Options'
            >
              <label className={styles.label}>
                <input
                      checked={true}
                      className={styles.checkbox}
                      type="checkbox"
                    />
                option 1
              </label>
            </OptionsSection>

            <OptionsSection
              className={styles.section}
              label='REPL Settings'
            >
              <label className={styles.label}>
                <input
                      checked={true}
                      className={styles.checkbox}
                      type="checkbox"
                    />
                setting 1
              </label>
            </OptionsSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplOptions;
