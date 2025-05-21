import React from 'react';
import ProtectedRoutes from '../../components/ProtectedRoutes';

const AccountLayout = ({ children }) => {
  return (
    <ProtectedRoutes>
      <div>{children}</div>
    </ProtectedRoutes>
  );
};

export default AccountLayout;
