import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import terser from 'terser';

import ReplOptions from './ReplOptions';
import CodeMirrorPanel from './CodeMirrorPanel';
import { getCodeSizeInBytes } from './lib/helpers';

import styles from './Repl.module.css';

const DEBOUNCE_DELAY = 500;

class Repl extends Component {
  state = {
    code: '// write or paste code here',
    minified: "// terser's ouput will be shown here",
    errorMessage: null,
    rawSize: 0,
    minifiedSize: 0
  };

  options = {
    lineWrapping: true,
    fileSize: true
  };

  render() {
    return (
      <div className={styles.container}>
        <ReplOptions />

        <div className={styles.wrapperPanels}>
          <div className={styles.panels}>
            <CodeMirrorPanel
              className={styles.codeMirrorPanel}
              code={this.state.code}
              onChange={this._updateCode}
              options={this.options}
              fileSize={this.state.rawSize}
              placeholder="Write or paste code here"
            />
            <CodeMirrorPanel
              className={styles.codeMirrorPanel}
              code={this.state.minified}
              options={this.options}
              fileSize={this.state.minifiedSize}
              placeholder="Terser output will be shown here"
            />
          </div>
        </div>
      </div>
    );
  }

  _updateCode = code => {
    this.setState({
      code,
      rawSize: getCodeSizeInBytes(code)
    });
    this._minifyToState(code);
  };

  _minifyToState = debounce(
    code => this._minify(code, this._persistState),
    DEBOUNCE_DELAY
  );

  _minify = (code, setStateCallback) => {
    // TODO: put this in a worker to avoid blocking the UI on heavy content
    const result = terser.minify(code);

    if (result.error) {
      this.setState({ errorMessage: result.error });
    } else {
      this.setState({
        minified: result.code,
        minifiedSize: getCodeSizeInBytes(result.code)
      });
    }
  };
}

export default Repl;
