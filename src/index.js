import ReactDOM from 'react-dom';
import socket from './socket.js';
import init from './init.jsx';

const runApp = async () => {
  const vdom = await init(socket);
  const container = document.getElementById('chat');
  ReactDOM.render(vdom, container);
};

runApp();

export default init;
