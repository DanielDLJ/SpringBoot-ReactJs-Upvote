import React, { useContext } from 'react';
import AuthContext from '../context/auth.js';

import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

function Routes() {
  const { signed } = useContext(AuthContext);

  return signed ? <MainRoutes /> : <LoginRoutes />;
};

export default Routes;