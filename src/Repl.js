import React, { Component } from 'react';
import { debounce, cloneDeep } from 'lodash-es';

import CodeMirrorPanel from './CodeMirrorPanel';
import { getCodeSizeInBytes } from './lib/helpers';
import terserOptions, { evalOptions } from './lib/terser-options';

import { gzip, ungzip } from 'pako'
import { Base64 } from 'js-base64'

import styles from './Repl.module.css';

const DEBOUNCE_DELAY = 500;

class Repl extends Component {
  state = {
    optionsCode: terserOptions,
    code: '// write or paste code here\n\n',
    minified: "// terser's output will be shown here",
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
                theme="paraiso-light"
                errorMessage={this.state.optionsErrorMessage}
                placeholder="Edit terser config here"
              />
              <CodeMirrorPanel
                className={styles.codeMirrorPanelInput}
                code={this.state.code}
                onChange={this._updateCode}
                options={this.options}
                fileSize={this.state.rawSize}
                theme="paraiso-light"
                errorMessage={this.state.errorMessage}
                placeholder="Write or paste code here"
              />
            </div>
            <CodeMirrorPanel
              className={styles.codeMirrorPanel}
              code={this.state.minified}
              options={this.options}
              fileSize={this.state.minifiedSize}
              theme="paraiso-dark"
              placeholder="Terser output will be shown here"
            />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const url = new URL(window.location.href)
    const encodedInput = url.searchParams.get('code')
    const encodedOptionsCode = url.searchParams.get('options')

    if (encodedOptionsCode) {
      const decodedOptionsCode = evalOptions(ungzip(Base64.toUint8Array(encodedOptionsCode), { to: 'string' }));
      this.setState({
        optionsCode: decodedOptionsCode
      })
      this._updateTerserOptions(decodedOptionsCode);
    }

    if (encodedInput) {
      const decodedCode = ungzip(Base64.toUint8Array(encodedInput), { to: 'string' });
      this._updateCode(decodedCode);
      this._minify();
    }
  }

  _getShareUrl = (code, optionsCode) => {
    const url = new URL(window.location.href)
    const encodedInput = Base64.fromUint8Array(gzip(code))
    url.searchParams.set('code', encodedInput)
    const encodedConfig = Base64.fromUint8Array(gzip(JSON.stringify(optionsCode)))
    url.searchParams.set('options', encodedConfig)
    return url.toString()
  }

  _updateCode = code => {
    this.setState({
      code,
      rawSize: getCodeSizeInBytes(code)
    });
    this._minifyToState(code);
    this.props.onReplShareUrlChange(this._getShareUrl(code, this.state.optionsCode))
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

    this.props.onReplShareUrlChange(this._getShareUrl(this.state.code, options))
    this._minify(this.state.code);
  };

  _minifyToState = debounce(
    code => this._minify(code, this._persistState),
    DEBOUNCE_DELAY
  );

  _minify = async (code, setStateCallback) => {
    // we need to clone this because terser mutates the options object :(
    const terserOpts = cloneDeep(this.state.terserOptions);

    // TODO: put this in a worker to avoid blocking the UI on heavy content
    try {
      const result = await this.props.terser.minify(code, terserOpts);

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
      console.error(e);
      console.log(terserOpts);
      this.setState({ errorMessage: e.message });
    }
  };
}

export default Repl;
