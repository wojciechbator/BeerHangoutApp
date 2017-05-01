import React, { Component } from 'react';
import { connect } from 'react-redux';

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