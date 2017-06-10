/* eslint jsx-a11y/href-no-hash:"off" */

import React, { Component } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";

import Venue from "../presentation/Venue";
import { refreshVenuesByLocation } from "../../redux/venues/venuesActions";
import { universalStyles, userStyle } from "../styles/styles";


class Sidebar extends Component {
    componentDidUpdate() {
        const usersListDiv = document.getElementById('usersList');
        usersListDiv.scrollTop = usersListDiv.scrollHeight;
    }

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            venues: [],
        };
    }

    componentDidMount() {
        this.setState({
            venues: this.props.venues
        });
    }

    render() {
        return (
            <div style={userStyle.usersSidebarDiv} id="usersList">
                <Header as="h3" style={universalStyles.header}>Miejsca: </Header>
                <hr style={userStyle.hr_style} />

                <Grid style={userStyle.userBox} columns='equal' >

                    {this.props.venues.map((venue, i) => <Venue key={i}
                        name={venue.name}
                        city={venue.city}
                        visits={venue.stats.checkinsCount}
                        address={venue.location.address} />)}


                </Grid>
                <Button onClick={this.handleGetUsers} color="green" content="Odśwież"
                    style={userStyle.refreshButton} />
            </div>
        );
    }

}

const mapStateToProps = (store) => {
    return {
        venues: store.venues.data,
    };
};

export default connect(mapStateToProps)(Sidebar);
