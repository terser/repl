import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import terser from 'terser';
import cloneDeep from 'lodash.clonedeep';

import CodeMirrorPanel from './CodeMirrorPanel';
import { getCodeSizeInBytes } from './lib/helpers';
import terserOptions, { evalOptions } from './lib/terser-options';

import styles from './Repl.module.css';

const DEBOUNCE_DELAY = 500;

class Repl extends Component {
  state = {
    optionsCode: terserOptions,
    code: '// write or paste code here',
    minified: "// terser's ouput will be shown here",
    terserOptions: evalOptions(),
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
        <div className={styles.wrapperPanels}>
          <div className={styles.panels}>
            <div className={styles.verticalSplit}>
              <CodeMirrorPanel
                className={styles.codeMirrorPanelOptions}
                code={this.state.optionsCode}
                onChange={this._updateTerserOptions}
                options={{ lineWrapping: true }}
                errorMessage={this.state.optionsErrorMessage}
                placeholder="Edit terser config here"
              />
              <CodeMirrorPanel
                className={styles.codeMirrorPanelInput}
                code={this.state.code}
                onChange={this._updateCode}
                options={this.options}
                fileSize={this.state.rawSize}
                errorMessage={this.state.errorMessage}
                placeholder="Write or paste code here"
              />
            </div>
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

  _updateTerserOptions = options => {
    try {
      const parsedOptions = evalOptions(options);

      this.setState({
        terserOptions: parsedOptions,
        optionsErrorMessage: null
      });
    } catch (e) {
      this.setState({ optionsErrorMessage: e.message });
    }

    this._minify(this.state.code);
  };

  _minifyToState = debounce(
    code => this._minify(code, this._persistState),
    DEBOUNCE_DELAY
  );

  _minify = (code, setStateCallback) => {
    // we need to clone this because terser mutates the options object :(
    const terserOpts = cloneDeep(this.state.terserOptions);

    // TODO: put this in a worker to avoid blocking the UI on heavy content
    try {
      const result = terser.minify(code, terserOpts);

      if (result.error) {
        this.setState({ errorMessage: result.error.message });
      } else {
        this.setState({
          minified: result.code,
          minifiedSize: getCodeSizeInBytes(result.code),
          errorMessage: null
        });
      }
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
  };
}

export default Repl;
