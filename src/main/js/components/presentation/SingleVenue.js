import React from "react";

import { Marker, Popup} from "react-leaflet";

const SingleVenue = (props) => {
    return (
        <div>
                <Popup>
                    <span>{props.name}</span>
                </Popup>

        </div>
    );
};

SingleVenue.PropTypes = {
    longitude: React.PropTypes.float,
    latitude: React.PropTypes.float,
    name: React.PropTypes.string,
};

SingleVenue.defaultProps = {
    lng:'',
    lat:'',
    name:'',

};

export default SingleVenue;