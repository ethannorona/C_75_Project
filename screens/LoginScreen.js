import * as React from 'react';
import { Text, View, Image, Alert, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends React.Component{

  constructor(){
    super();

    this.state = {
      emailId: '',
      passWord: ''
    }
  }

  login = async(email, password) =>{
    if(email && password){
      try{
        const response = await firebase.auth().signInWithEmailAndPassword(email, password)
        if(response){
          this.props.navigation.navigate('WriteStory')
        }
      }
      catch(error){
        switch(error.code){
          case 'auth/user-not-found': Alert.alert("User Does Not Exist")
            console.log("Doesn't Exist");
            break;
          case 'auth/invaild-email': Alert.alert("Incorrect Email or Password")
            console.log("Invaild");
            break;
        }
      }
    }
    else{
      Alert.alert("Enter Email and Password")
    }
  }

  render(){
    return(
      <KeyboardAvoidingView style = {{alignItems: 'center', marginTop: 100}}>
        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 30}}>Bedtime Stories</Text>
          <Image
            source={require("../assets/icon.png")}
            style={{width:200, height: 200}}
          />  
        </View>
        <View>
          <TextInput 
            style = {styles.loginBox}
            placeholder = "abc@example.com"
            keyboardType = 'email-address'
            onChangeText = {(text)=>{
              this.setState({
                emailId: text
              })
            }}
          />
          <TextInput
            style = {styles.loginBox}
            secureTextEntry = {true} 
            placeholder = "Enter Password"
            onChangeText = {(text)=>{
              this.setState({
                passWord: text
             })
           }}
          />
        </View>
        <View>
          <TouchableOpacity 
            style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7}}
            onPress = {()=>{this.login(this.state.emailId, this.state.passWord)}}
          >
            <Text style = {{textAlign: 'center'}}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  loginBox: {
    width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10
  }
})