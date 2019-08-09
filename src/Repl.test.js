import React from 'react';
import ReactDOM from 'react-dom';
import Repl from './Repl';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Repl />, div);
  ReactDOM.unmountComponentAtNode(div);
});
