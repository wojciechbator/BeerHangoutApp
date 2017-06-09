import React from "react";

import { Marker, Popup} from "react-leaflet";

const SingleVenue = (props) => {
    return (
            <Marker position={props.location}>
                <Popup>
                    <span>props.name</span>
                </Popup>

            </Marker>

    );
};

SingleVenue.PropTypes = {
    location: React.PropTypes.location,
    name: React.PropTypes.string,
};

SingleVenue.defaultProps = {
    location:'',
    name:'',

};


export default SingleVenue;