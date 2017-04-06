import React, {PropTypes} from "react";
import {Match, Redirect} from "react-router";
import {connect} from "react-redux";

const MatchWhenAuthorized = ({component: Component, signedIn, ...rest}) => {
  const onComponentRender = props => (
    signedIn
      ? <Component {...props} />
      : (<Redirect to={{
      pathname: '/signin',
      state: {from: props.location}
    }}/>)
  );
  return <Match {...rest} render={onComponentRender}/>;
};

MatchWhenAuthorized.propTypes = {
  component: PropTypes.func,
  signedIn: PropTypes.bool
};

function mapStateToProps(state) {
  return {signedIn: state.auth.signedIn};
}

export default connect(mapStateToProps)(MatchWhenAuthorized);