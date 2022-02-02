import AddChannel from './AddChannel.jsx';

const modals = {
  addChannel: AddChannel,
};

export default (modalName) => modals[modalName];
