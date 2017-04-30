/**
 * Created by wojciech on 30.04.17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Chat extends Component {
  render() {
    return (
      <div>
        CZAT ŁIDŻET XDDD
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {

  }
};

export default connect(mapStateToProps)(Chat);