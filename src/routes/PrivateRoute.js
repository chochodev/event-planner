import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from 'context/authStatusContext';
import { useContext } from 'react';

const Protected = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log('auth status: ', isAuthenticated);
  // const token = localStorage.getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/unauthenticated" />;
};

export default Protected;