import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';


export default class Transaction extends React.Component{

    constructor(){
        super();
        this.state={
            buttonState:'normal',
            hasCameraPermission:null,
            scanned:false,
            scannedData:'',
            scannedSID:'',
            scannedBID:'',
            
        }
    }

    getCamerPermission= async(id) =>{
        var {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            buttonState: id,
            hasCameraPermission:status === 'granted',
            scanned:false,

        })
    }

    handleBarCodeScanner = async({data})=>{
        if(this.state.buttonState==="BookId"){
            this.setState({
                buttonState:'normal',
                scannedBID:data,
                scanned:true,
    
            })
        }
        else   if(this.state.buttonState==="StudentId"){
            this.setState({
                buttonState:'normal',
                scannedSID:data,
                scanned:true,
    
            })
        }
       
    }


    render(){
        var hasCameraPermission = this.state.hasCameraPermission;
        var buttonState = this.state.buttonState;
        var scanned = this.state.scanned;
        if(buttonState!== 'normal' && hasCameraPermission){
            return(
                <BarCodeScanner style = {StyleSheet.absoluteFillObject } onBarCodeScanned={ scanned ? undefined : this.handleBarCodeScanner}></BarCodeScanner>
            )
        }
        else{
            return(

                <View>
                    <Image 
                source={require("../assets/booklogo.jpg")}
                style={{width:200,height:200}}
                />
                <TextInput  placeholder="Book ID" value={this.state.scannedBID} />
                <TouchableOpacity onPress={()=>{this.getCamerPermission("BookId")}} >
                   <Text>SCAN</Text> </TouchableOpacity>
                   
                <TextInput  placeholder="Student ID" value={this.state.scannedSID}  />
                <TouchableOpacity onPress={()=>{this.getCamerPermission("StudentId")}}>
                   <Text>SCAN</Text> </TouchableOpacity>
               {/*} <View>
                    <Text>TransactionScreens</Text>
                <TouchableOpacity onPress={this.getCamerPermission}>
                    <Text>Scan QR Code</Text></TouchableOpacity>
                <Text>{hasCameraPermission ? this.state.scannedData : 'Require camera permission'}</Text></View>
            */}
                            </View>
            )
        }
      
    }
    
}