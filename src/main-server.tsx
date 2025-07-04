import './index.css';

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import i18n from './i18n/config';

export function render() {
  i18n.changeLanguage('ru');
  return renderToString(createElement(App));
}
