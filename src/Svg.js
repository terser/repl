import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Svg.module.css';

const Svg = ({ className, path, ...rest }) => {
  const svgClass = cx(styles.container, className);

  return (
    <svg className={svgClass} viewBox="0 0 24 24" {...rest}>
      <path className={styles.path} d={path} />
    </svg>
  )
};

Svg.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string
};

Svg.defaultProps = {
  className: '',
  path: ''
};

export default Svg;
