import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { checkAuthStatus } from '../../redux/reducers/authSlice';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch, location]);
};

export default useAuthCheck;
