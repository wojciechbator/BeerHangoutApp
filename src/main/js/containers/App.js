/* @flow */
import React from 'react';
import { Match, Miss } from 'react-router';
import AppMeta from './AppMeta';

import MatchWhenAuthorized from './MatchWhenAuthorized';
import { AddComment, CommentList, Errors, Navigation, SignIn, Sidebar } from '../components';

const App = () => (
  <div>
    <AppMeta />
    <Navigation />
    <div style={{ display: 'flex', height: '100%', position: 'absolute', width: '100%' }}>
      <Sidebar />
      <div className="container">
        <Match exactly pattern="/" component={CommentList} />
        <MatchWhenAuthorized pattern="/add" component={AddComment} />
        <Match pattern="/signin" component={SignIn} />
        <Miss component={Errors} />
      </div>
    </div>
  </div>
);

export default App;
