import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class App extends Component {
  state = {
    userLocation : null,
    usersLocation : [],
  };
  getLocationHandler=()=>{
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLocation : {
            latitude : position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0421
          }
        });
        fetch('https://finder-cc7d1.firebaseio.com/locations.json', {
          method: "POST",
          body: JSON.stringify({
            latitude : position.coords.latitude,
            longitude: position.coords.longitude
          }),
        }).then(res => console.log(res))
          .catch(err=>console.log(err));
      },
      err => console.log(err)
    );
  };
  getUsersLocationHandler = () => {
    fetch('https://finder-cc7d1.firebaseio.com/locations.json')
    .then((response) => response.json())
    .then((responseJson) => {
      const allUsersLocation = [];
      for (const key in responseJson){
        allUsersLocation.push({
          latitude : responseJson[key].latitude,
          longitude : responseJson[key].longitude,
          id : key
        });
      }
      this.setState({
        usersLocation : allUsersLocation
      });
    }).catch(err => console.log(err));
  };
  render() {
    const {userLocation} = this.state;
    const {usersLocation} = this.state;
    return (
      <View style={styles.container}>
       <UsersMap userLocation={userLocation} usersLocation={usersLocation}  /> 
       <Text style={styles.welcome}> Finder </Text>
       <View style = {{marginBottom:20}}>
        <Button title="Get Users Locations" onPress={this.getUsersLocationHandler} />
       </View>
       <FetchLocation getLocation={this.getLocationHandler}></FetchLocation>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

