/* eslint-disable no-undef */
import React from 'react';
import {
    StyleSheet,
    Dimensions,
} from 'react-native';

import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});


class HangoutsMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            },
            markerPosition: {
                latitude: 0,
                longitude: 0,
            }
        };
    }

    watchID: ?number = null

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
                const lat = parseFloat(position.coords.latitude);
                const long = parseFloat(position.coords.longitude);

                const initialRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                };

                this.setState({initialPosition: initialRegion})
                this.setState({markerPosition: initialRegion})
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

        this.watchID = navigator.geolocation.watchPosition((position) => {
                const lat = parseFloat(position.coords.latitude)
                const long = parseFloat(position.coords.longitude)

                let lastRegion = {
                    latitude: lat,
                    longitude: long,
                    longitudeDelta: LONGITUDE_DELTA,
                    latitudeDelta: LATITUDE_DELTA,
                }

                this.setState({ initialPosition: lastRegion })
                this.setState({ markerPosition: lastRegion })
            });
    }


    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID)
    }

    static navigationOptions = {
        title: 'Mapa',
    }

    render() {

        const { goBack } = this.props.navigation;
        return (
            <MapView
                style={styles.container}
                region={this.state.initialPosition}
            >
                <MapView.Marker
                    coordinate={this.state.markerPosition}
                />
            </MapView>
        );
    }
}
export default HangoutsMap;
