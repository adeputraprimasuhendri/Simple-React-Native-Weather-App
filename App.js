import React, {Component} from 'react';
import {
  KeyboardAvoidingView, 
  StyleSheet, 
  Text, 
  Platform, 
  View,
  Image
} from 'react-native';
import CariLokasi from './components/CariLokasi';

export default class Cuaca extends Component {
  constructor(props) {
    super(props);
    this.state={
      location:'Jakarta',
      description: '',
      temp:'0',
      icon:'https://openweathermap.org/img/wn/'
    };
    }
    handleUpdateLocation = city => {
      fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=b5bedb63d4f648d38784f1b284518479&units=metric")
      .then(response => response.json())
      .then(data => {
        console.log(data.weather[0].description);
        this.setState({
          location: data.name,
          description: data.weather[0].description,
          temp: data.main.temp,
          icon:'https://openweathermap.org/img/wn/'+data.weather[0].icon+'.png'
        });
      })
      .catch(error => console.log(error))
    };
  render() {
    const{ location }=this.state;
    const{ description }=this.state;
    const{ temp }=this.state;
    const{ icon }=this.state;
    return (
        <KeyboardAvoidingView 
          style={styles.container} 
          behavior="padding">            
          <View style={styles.detailsContainer}>
            <Text style={styles.textStyle, styles.largeText}>{location}</Text>
            <Text style={styles.textStyle, styles.smallText}>{description}</Text>
            <Image
              style={{width: 50, height: 50}}
              source={{uri:icon}}
            />
            <Text style={styles.textStyle, styles.largeText}>{temp}°</Text>
            <CariLokasi 
              placeholder="Cari kota anda" 
              onSubmit={this.handleUpdateLocation}
            />
          </View>
        </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  textInput:{
    backgroundColor:'#666',
    color:'white',
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf:'center',
    borderRadius:8,
  },
  detailsContainer:{
    flex: 1,
    alignItems:"center",
    justifyContent:'center',
    paddingHorizontal: 20,
    backgroundColor:'#f8f8f8',
  },
});
