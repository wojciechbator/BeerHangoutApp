/* @flow */
/* eslint jsx-a11y/href-no-hash:"off" */

import React from 'react';
import { Grid } from 'semantic-ui-react';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
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
            ]
        };
    }

    render() {
        return (
            <Grid columns='equal' >
                {this.state.mock_data.map((person, i) => <SidebarRow key={i} data={person}/>)}
            </Grid>
        );
    }
}

class SidebarRow extends React.Component {
    render() {
        return (
            <Grid.Row verticalAlign="center">
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

export default Sidebar;
