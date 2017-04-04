import React, { Component } from 'react';
import { connect } from 'react-redux';

// Możesz pracować tutaj Adam, zrzynaj śmiało z comments containera, tak samo wczytasz userów jak ja kommenty
class FriendsContainer extends Component {
  render() {
    return (
      <div>
        Kontener userów
      </div>
    );
  }
}

FriendsContainer.propTypes = {
  status: React.PropTypes.string,
  user: React.PropTypes.object,
  users: React.PropTypes.array
};

const mapStateToProps = (store) => {
  return {
    status: store.comments.status,
    users: store.users.data
  };
};

export default connect(mapStateToProps)(FriendsContainer);