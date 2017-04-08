/* @flow */
/* eslint jsx-a11y/href-no-hash:"off" */

import React from "react";
import {Grid, Button, Header} from "semantic-ui-react";
import styles from "../styles/styles";
import {refreshUsers} from "../../redux/users/usersActions";
import {connect} from "react-redux";


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            users: [],
        };
        this.handleGetUsers = this.handleGetUsers.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(refreshUsers());
        this.setState({
            users: this.props.users
        })
    }

    handleGetUsers() {
        this.props.dispatch(refreshUsers());
    }

    render() {
        return (
            <div style={styles.users.usersSidebar}>
                <Header as="h3" style={styles.comment.header}>Uzytkownicy: </Header>
                <Grid columns='equal'>
                    {this.props.users.map((person, i) => <SidebarRow key={i} data={person}/>)}
                </Grid>
                <Button onClick={this.handleGetUsers} color="green" content="Odswierz" style={styles.users.refreshButton}/>
            </div>
        );
    }

}

const mapStateToProps = (store) => {
    return {
        users: store.users.data,
    };
};

export default connect(mapStateToProps)(Sidebar);


class SidebarRow extends React.Component {
    render() {
        return (
            <Grid.Row verticalAlign="middle">
                <Grid.Column width={3}>
                    {this.props.data.username}
                </Grid.Column>
                <Grid.Column width={3}>
                    {this.props.data.lastName}
                </Grid.Column>
                <Grid.Column width={1}>
                    {this.props.data.is_active ? "aktywny" : "nie aktywny"}
                </Grid.Column>
            </Grid.Row>
        )
    }
}
SidebarRow.propTypes = {
    data: React.PropTypes.object.isRequired
};
