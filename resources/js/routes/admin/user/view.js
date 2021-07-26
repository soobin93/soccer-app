import React from 'react';
import UserProfile from "components/UserProfile";

const AdminUserView = () => {
  return(
    <UserProfile isAdminView={true} />
  )
};

export default AdminUserView;
