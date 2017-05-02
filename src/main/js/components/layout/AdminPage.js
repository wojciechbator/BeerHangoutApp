/**
 * Created by wojciech on 30.04.17.
 */
import React from 'react';
import Navbar from '../presentation/Navbar';

import UserContainer from '../containers/UserContainer';

const AdminPage = (props) => (
  <div>
    <Navbar activeItem='Admin'/>
    <br />
    <br />
    <br />
    <UserContainer/>
  </div>
);

export default AdminPage;


