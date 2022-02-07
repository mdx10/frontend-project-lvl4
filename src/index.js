import { render } from 'react-dom';
import socket from './socket.js';
import init from './init.jsx';

const vdom = init(socket);

render(vdom, document.getElementById('chat'));

export default init;
