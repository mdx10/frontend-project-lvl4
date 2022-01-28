import { useContext } from 'react';
import { AutnContext } from '../contexts/authContext.jsx';

const useAuth = () => useContext(AutnContext);

export default useAuth;
