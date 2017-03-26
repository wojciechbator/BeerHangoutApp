/* @flow */
/* eslint jsx-a11y/href-no-hash:"off" */

import React from "react";
import {Grid} from "semantic-ui-react";
import {getUsers} from "../../redux/actions";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            users: [],
            mock_data: [
                {
                    "name": "Jan1",
                    "surname": "Kowalski1",
                    "is_active": true
                },
                {
                    "name": "Jan2",
                    "surname": "Kowalski2",
                    "is_active": true
                },
                {
                    "name": "Jan3",
                    "surname": "Kowalski3",
                    "is_active": false
                },
                {
                    "name": "Jan4",
                    "surname": "Kowalski4",
                    "is_active": false
                },
            ],
        };
        this.handleGetUsers = this.handleGetUsers.bind(this);
    }

    handleGetUsers() {
        this.props.dispatch(getUsers());
    }

    componentDidMount(){
        this.props.dispatch(getUsers());
    }

    render() {
        return (
            <Grid columns='equal'>
                {this.state.mock_data.map((person, i) => <SidebarRow key={i} data={person}/>)}
                {this.state.users.map((person, i) => <SidebarRow key={i} data={person}/>)}
                <button onClick={this.handleGetUsers.bind(this)}>odswierz</button>
            </Grid>
        );
    }
}

class SidebarRow extends React.Component {
    render() {
        return (
            <Grid.Row verticalAlign="middle">
                <Grid.Column width={3}>
                    {this.props.data.name}
                </Grid.Column>
                <Grid.Column width={3}>
                    {this.props.data.surname}
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

export default Sidebar;
