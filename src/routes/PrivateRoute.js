import React from 'react'
import { Route } from 'react-router-dom'

const PrivateRoute = ({ children, ...rest }) => {
  console.log('private');
  return (
    <Route {...rest}>{children}</Route>
  )
}

export default PrivateRoute;