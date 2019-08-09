import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './OptionsSection.module.css';

const OptionsSection = (props) => {
  const containerClass = cx(styles.container, props.className);

  return (
    <div className={containerClass}>
      <div className={styles.headerRow}>
          <div className={styles.label}>{props.label}</div>
        </div>
        <div className={styles.content}>{props.children}</div>
      </div>
  );
};

OptionsSection.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.object
};

OptionsSection.defaultProps = {
  className: '',
  label: '',
  children: null
};

export default OptionsSection;
