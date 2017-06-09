import React from "react";

import { Marker, Popup} from "react-leaflet";

const SingleVenue = (props) => {
    return (
            <Marker position={{lat: 32.421,
                            lng:32.244}}>
                <Popup>
                    <span>props.name</span>
                </Popup>

            </Marker>

    );
};

SingleVenue.PropTypes = {
    lng: React.PropTypes.string,
    lat: React.PropTypes.string,
    name: React.PropTypes.string,
};

SingleVenue.defaultProps = {
    lng:'',
    lat:'',
    name:'',

};


export default SingleVenue;