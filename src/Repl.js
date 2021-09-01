import React, { Component } from 'react';
import { debounce, cloneDeep } from 'lodash-es';

import CodeMirrorPanel from './CodeMirrorPanel';
import { getCodeSizeInBytes, loadState, saveState } from './lib/helpers';
import terserOptions, { evalOptions } from './lib/terser-options';

import styles from './Repl.module.css';

const DEBOUNCE_DELAY = 500;

const defaultState = {
  optionsCode: terserOptions,
  code: '',
  minified: '',
  terserOptions: evalOptions(),
  rawSize: 0,
  minifiedSize: 0,
};

class Repl extends Component {
  state = loadState() || defaultState;

  _minifyId = 0;
  _options = {
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
                theme="paraiso-light"
                errorMessage={this.state.optionsErrorMessage}
                placeholder="// Edit terser config here"
              />
              <CodeMirrorPanel
                className={styles.codeMirrorPanelInput}
                code={this.state.code}
                onChange={this._updateCode}
                options={this._options}
                fileSize={this.state.rawSize}
                theme="paraiso-light"
                errorMessage={this.state.errorMessage}
                placeholder="// Write or paste code here"
              />
            </div>
            <CodeMirrorPanel
              className={styles.codeMirrorPanel}
              code={this.state.minified}
              options={this._options}
              fileSize={this.state.minifiedSize}
              theme="paraiso-dark"
              placeholder="// Terser output will be shown here"
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

    this._minifyToState(this.state.code);
  };

  _minifyToState = debounce(code => this._minify(code), DEBOUNCE_DELAY);

  _minify = async (code, setStateCallback) => {
    // we need to clone this because terser mutates the options object :(
    const terserOpts = cloneDeep(this.state.terserOptions);

    const minifyId = ++this._minifyId;
    // TODO: put this in a worker to avoid blocking the UI on heavy content
    try {
      const result = await this.props.terser.minify(code, terserOpts);
      if (this._minifyId !== minifyId) return;

      if (result.error) {
        this.setState({ errorMessage: result.error.message });
      } else {
        this.setState({
          minified: result.code,
          minifiedSize: getCodeSizeInBytes(result.code),
          errorMessage: null
        });
        saveState(this.state);
      }
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
  };
}

export default Repl;
