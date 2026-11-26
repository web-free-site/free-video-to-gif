/* @refresh reload */
import { render } from 'solid-js/web';
import 'virtual:uno.css';
import './index.scss';
import App from './App';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error('Root element not found');
}

document.documentElement.classList.add('app-ready');

render(() => <App />, root!);