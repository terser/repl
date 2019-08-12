import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import CodeMirror from './CodeMirror';

import styles from './CodeMirrorPanel.module.css';

const CodeMirrorPanel = props => {
  const {
    className,
    onChange,
    options,
    placeholder,
    code,
    info,
    errorMessage
  } = props;

  const containerClass = cx(styles.container, className);
  const infoClass = cx(styles.info, styles.sharedBox);
  const errorClass = cx(styles.error, styles.sharedBox);

  return (
    <div className={containerClass}>
      <div className={styles.codeMirror}>
        <CodeMirror
          onChange={onChange}
          options={{
            ...options,
            readOnly: onChange == null
          }}
          placeholder={placeholder}
          preserveScrollPosition={onChange == null}
          value={code}
        />
      </div>
      {info && <pre className={infoClass}>{info}</pre>}
      {errorMessage && <pre className={errorClass}>{errorMessage}</pre>}
    </div>
  );
};

CodeMirrorPanel.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.object,
  placeholder: PropTypes.string,
  code: PropTypes.string
};

CodeMirrorPanel.defaultProps = {
  className: null,
  onChange: null,
  options: {},
  placeholder: null,
  code: null
};

export default CodeMirrorPanel;
