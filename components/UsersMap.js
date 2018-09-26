import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

const usersMap = props => {
    let userLocationMarker = null;
    if(props.userLocation){
       userLocationMarker = <MapView.Marker coordinate={props.userLocation}  />
    }
    const usersLocationMarker = props.usersLocation.map(userPlace => (
        <MapView.Marker coordinate={userPlace} key={userPlace.id} />
    ));
    return (
        <View style = {styles.mapContainer }>
            <MapView initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0622,
                longitudeDelta: 0.0421
            }}
            style = {styles.map}
            region = {props.userLocation} >

            {userLocationMarker}
            {usersLocationMarker}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer : {
        width : "100%",
        height: 400,
    },
    map : {
        height : "100%",
        width : "100%"
    },
});

export default usersMap;