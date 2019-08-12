import React, { Component } from 'react';
import ReplOptions from './ReplOptions';
import CodeMirrorPanel from './CodeMirrorPanel';
import debounce from 'lodash.debounce';

import styles from './Repl.module.css';

const DEBOUNCE_DELAY = 500;

class Repl extends Component {
  state = {
    code: '// write or paste code here',
    compiled: '// terser\'s ouput will be shown here'
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
              placeholder='Write or paste code here'
            />
            <CodeMirrorPanel
              className={styles.codeMirrorPanel}
              code={this.state.compiled}
              options={this.options}
              placeholder='Terser output will be shown here'
            />
          </div>
        </div>
      </div>
    );
  }

  _updateCode = (code) => {
    this.setState({ code });
    this._compileToState(code);
  };

  _compileToState = debounce((code) => this._compile(code, this._persistState), DEBOUNCE_DELAY);

  _compile = (code, setStateCallback) => {
    console.log('Compiling ', code);
  };
}

export default Repl;
