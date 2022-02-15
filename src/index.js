import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import init from './init.jsx';

const runApp = async () => {
  const socket = io.connect();
  const vdom = await init(socket);
  const container = document.getElementById('chat');
  ReactDOM.render(vdom, container);
};

runApp();
