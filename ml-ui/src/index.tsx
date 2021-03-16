import React, { StrictMode } from 'react';
import {render, hydrate} from 'react-dom';
import { Main } from './Main/Main';

const rootElement = document.getElementById("root");
if (rootElement?.hasChildNodes()) {
  hydrate(<StrictMode><Main /></StrictMode>, rootElement);
} else {
  render(<StrictMode><Main /></StrictMode>, rootElement);
}