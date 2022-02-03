import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';

const modals = {
  addChannel: AddChannel,
  removeChannel: RemoveChannel,
};

export default (modalName) => modals[modalName];
