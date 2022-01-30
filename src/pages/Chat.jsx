import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setChannels } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';
import routes from '../routes.js';

const Chat = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        routes.dataPath(),
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      dispatch(setChannels(data.channels));
      dispatch(setMessages(data.messages));
      console.log(data);
    };
    fetchData();
  });

  return (
    <h1>Main page</h1>
  );
};

export default Chat;
