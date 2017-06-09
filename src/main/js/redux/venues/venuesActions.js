/**
 * Created by pelek on 07.06.17.
 */
import axios from "axios";

export const REFRESH_VENUES = 'REFRESH_VENUES';


export const venuesRefreshed = (venues) => {
    return {
        type: REFRESH_VENUES,
        venues
    };
};


export const refreshVenuesByLocation = (location) => {
    return dispatch => {
        axios.get(`/api/premises/location/${location}`).then(
            success => dispatch(venuesRefreshed(success.data)),
            failure => console.log('Failure when trying to refresh comments, reason: ' + failure)
        );
    };
};


