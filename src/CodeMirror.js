import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';

require('codemirror/lib/codemirror.css');
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/keymap/sublime');

const DEFAULT_CODE_MIRROR_OPTIONS = {
  autoCloseBrackets: true,
  keyMap: 'sublime',
  lineNumbers: true,
  matchBrackets: true,
  mode: 'javascript',
  showCursorWhenSelecting: true,
  styleActiveLine: true,
  tabWidth: 2
};

class CodeMirrorReact extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    preserveScrollPosition: PropTypes.bool,
    options: PropTypes.object,
    placeholder: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    autoFocus: false,
    preserveScrollPosition: false,
    onChange: null,
    options: {},
    placeholder: null,
    value: null
  };

  state = {
    isFocused: false
  };

  _codeMirror = null;
  _textAreaRef = null;

  componentDidMount() {
    this._codeMirror = CodeMirror.fromTextArea(this._textAreaRef, {
      ...DEFAULT_CODE_MIRROR_OPTIONS,
      ...this.props.options
    });

    this._codeMirror.on('change', this._onChange);
    this._codeMirror.setValue(this.props.value || '');
  }

  // TODO: refactor this with the new lyfecycle methods
  UNSAFE_componentWillMount() {
    if (this._codeMirror) {
      this._codeMirror.toTextArea();
    }
  }

  // TODO: refactor this with the new lyfecycle methods
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.value &&
      nextProps.value !== this.props.value &&
      this._codeMirror.getValue() !== nextProps.value
    ) {
      if (nextProps.preserveScrollPosition) {
        const prevScrollPosition = this._codeMirror.getScrollInfo();

        this._codeMirror.setValue(nextProps.value);
        this._codeMirror.scrollTo(
          prevScrollPosition.left,
          prevScrollPosition.top
        );
      } else {
        this._codeMirror.setValue(nextProps.value);
      }
    } else if (!nextProps.value) {
      this._codeMirror.setValue('');
    }

    for (const optionName in nextProps.options) {
      if (nextProps.options.hasOwnProperty(optionName)) {
        this._updateOption(optionName, nextProps.options[optionName]);
      }
    }
  }

  focus() {
    this._codeMirror && this._codeMirror.focus();
  }

  render() {
    return (
      <textarea
        autoComplete="off"
        autoFocus={this.props.autoFocus}
        defaultValue={this.props.value}
        ref={this._setTextAreaRef}
        placeholder={this.props.placeholder}
      />
    );
  }

  _updateOption(optionName, newValue) {
    const oldValue = this._codeMirror.getOption(optionName);

    if (oldValue !== newValue) {
      this._codeMirror.setOption(optionName, newValue);
    }
  }

  _onChange = (doc, change) => {
    if (change.origin !== 'setValue') {
      this.props.onChange(doc.getValue());
    }
  };

  _setTextAreaRef = (ref = null) => {
    this._textAreaRef = ref;
  };
}

export default CodeMirrorReact;
