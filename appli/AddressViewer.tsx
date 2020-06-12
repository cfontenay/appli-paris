import React, { Component } from "react";
import { View , Text, ActivityIndicator, StyleSheet} from "react-native";
import { Button } from 'react-native-elements';
import Address from "./Address";
import ApiManager from "./ApiManager";
import Geolocation from '@react-native-community/geolocation';
import { thisExpression } from "@babel/types";


export default class AddressViewer extends Component{
    constructor (props: any) {
        super(props);
        this.state = {address: '', isWaitingForResult:false, position: []};
        
    }
    componentDidMount() {
        this.reloadAddress();
    }
    render() {
        return (
            <View  style={{justifyContent:'center', alignItems:'center', top:'50%'}} >
                <Button large icon={{name: 'cached'}} title={'Refresh'} onPress={() => this.reloadAddress()}></Button>
                <Text>{`lat: ${this.state.position[0]} ; lng: ${this.state.position[1]}`}</Text>
                <DrawAddress isWaitingForResult={this.state.isWaitingForResult} address={this.state.address}></DrawAddress>
            </View>
        );
    }
    reloadAddress() {
        this.state.position = [];
        if (this.state.isWaitingForResult) {
            return;
        }
        this.setState({
            isWaitingForResult:true
        })  
        Geolocation.getCurrentPosition(position =>{
            this.state.position = [position.coords.latitude, position.coords.longitude];
            new ApiManager().requestForAddress(position.coords.latitude, position.coords.longitude)
            .then(res => {
                this.setState({
                    address:res.toString(),
                    isWaitingForResult:false
                })
            });
        }, error => this.setState({address:'gps error', isWaitingForResult:false}), { enableHighAccuracy: true, timeout: 15000 });
    }
    
}
function DrawAddress(props) {
    const isWaitingForResult = props.isWaitingForResult;
    if (isWaitingForResult){
        return <ActivityIndicator size="large" color="#0000ff" />
    }
    return <Text style={styles.titleText}>{props.address}</Text>
}
const styles = StyleSheet.create({
    titleText: {
        fontFamily: 'Cochin',
      fontSize: 26,
      fontWeight: 'bold',
    },
  });