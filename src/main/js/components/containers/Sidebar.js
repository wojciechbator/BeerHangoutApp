/* @flow */
/* eslint jsx-a11y/href-no-hash:"off" */

import React from "react";
import {Grid, Button, Header} from "semantic-ui-react";
import {connect} from "react-redux";

import SidebarRow from '../presentation/SidebarRow';
import styles from "../styles/styles";
import {refreshUsers} from "../../redux/users/usersActions";


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
            <div style={styles.users.usersSidebarDiv}>
                <Header as="h3" style={styles.universal.header}>Użytkownicy: </Header>
                <hr style={styles.users.hr_style}/>
                <Grid columns='equal'>
                    {this.props.users.map((person, i) => <SidebarRow key={i} data={person}/>)}
                </Grid>
                <Button onClick={this.handleGetUsers} color="green" content="Odśwież"
                        style={styles.users.refreshButton}/>
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
