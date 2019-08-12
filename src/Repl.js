import React, { Component } from 'react';
import ReplOptions from './ReplOptions';
import CodeMirrorPanel from './CodeMirrorPanel';
import debounce from 'lodash.debounce';
import terser from 'terser';

import styles from './Repl.module.css';

const DEBOUNCE_DELAY = 500;

class Repl extends Component {
  state = {
    code: '// write or paste code here',
    compiled: "// terser's ouput will be shown here",
    errorMessage: null
  };

  options = {
    lineWrapping: true
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
              placeholder="Write or paste code here"
            />
            <CodeMirrorPanel
              className={styles.codeMirrorPanel}
              code={this.state.compiled}
              options={this.options}
              placeholder="Terser output will be shown here"
            />
          </div>
        </div>
      </div>
    );
  }

  _updateCode = code => {
    this.setState({ code });
    this._compileToState(code);
  };

  _compileToState = debounce(
    code => this._compile(code, this._persistState),
    DEBOUNCE_DELAY
  );

  _compile = (code, setStateCallback) => {
    // TODO: put this in a worker to avoid blocking the UI on heavy content
    const result = terser.minify(code);

    if (result.error) {
      this.setState({ errorMessage: result.error });
    } else {
      this.setState({ compiled: result.code });
    }
  };
}

export default Repl;
