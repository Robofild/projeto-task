import React, {Component}from 'react'
import {View,ActivityIndicator,StyleSheet} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

export default class AuthOrApp extends Component{

     componentDidMount= async()=>{
        const userDataJson=await AsyncStorage.getItem('userData')
        let userData=null
        try {
          userData= JSON.parse(userDataJson)  
        } catch (error) {
            userData=null
        }


       if (userData && userData.token){
        axios.defaults.headers.common['Authorization']=`bearer ${userData.token}`
        //axios.defaults.headers.common['nome']=userData.nome
        //axios.defaults.headers.common['email']=userData.email  
        // console.log('autoorapp'+axios.defaults.headers.common['nome'])
        
      

        this.props.navigation.navigate('Home',userData)
       //this.props.navigation.navigate('Menu',userData)
       
        
       }else{
        this.props.navigation.navigate('Auth',userData)
        
      
       }
    }

    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator size='large'/>
            </View>
        )
    }
}
const styles=StyleSheet.create({
container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#000'
}
})