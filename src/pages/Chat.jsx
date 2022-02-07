import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setChannels } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice.js';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';
import getModal from '../components/modals';
import Header from '../components/Header.jsx';

const getAuthHeader = (user) => {
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const renderModal = (modalInfo) => {
  if (!modalInfo.type) return null;

  const Modal = getModal(modalInfo.type);
  return <Modal />;
};

const Chat = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { modalInfo } = useSelector((state) => state.modalReducer);

  const notify = () => toast.error(t('feedback.errors.networkProblem'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader(user) });
        dispatch(setChannels(data.channels));
        dispatch(setMessages(data.messages));
        dispatch(setCurrentChannelId(data.currentChannelId));
        console.log(data);
      } catch (err) {
        notify();
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white">
          <Col className="border-end pt-5 px-0 bg-light" xs={4} md={2}>
            <Channels />
          </Col>
          <Col className="h-100 p-0">
            <Messages />
          </Col>
        </Row>
      </Container>
      {renderModal(modalInfo)}
    </div>
  );
};

export default Chat;
