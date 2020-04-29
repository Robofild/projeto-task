import React from 'react'
import {ScrollView,View,Text,StyleSheet,Platform,TouchableOpacity} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import {Gravatar}from'react-native-gravatar'
import commonStyles from '../commonStyles'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'


export default props =>{
    
    console.log('Menu')
    console.log(axios.defaults.headers.common['nome'])
    console.log(axios.defaults.headers.common['email'])
   
    const logout=()=>{
        
            delete  axios.defaults.headers.common['nome']
            delete axios.defaults.headers.common['email'] 
       
       delete axios.defaults.headers.common['Authorization']
       AsyncStorage.removeItem('userData')
       props.navigation.navigate('AuthOrApp')
        
    }
  
    return(
      <ScrollView >
          <View style={styles.header}>
              <Text style={styles.title}> © Robofild</Text>
            <Gravatar style={styles.avatar}
            options={{
                email:props.navigation.getParam('email'),
                secure:true,

            }}/>
         
          <View style={styles.userInfo}>
              <Text style={styles.name}>{axios.defaults.headers.common['nome']}</Text>
              <Text style={styles.email}>{axios.defaults.headers.common['email']}</Text>
          </View>
         

          </View>
          <DrawerItems{...props}/>
      </ScrollView>  
    )
}
const styles=StyleSheet.create({
   header:{
       borderBottomWidth:1,
       borderColor:'#ddd'
   },
   title:{
        color:"#000",
        fontFamily: commonStyles.fontFamily,
        fontSize:30,
        padding:10,
        marginTop:Platform.OS==='ios'?70: 30
   },
   avatar:{
       width:60,
       height:60,
       borderWidth:3,
       borderRadius:30,
       margin:10,
      

   },
   userInfo:{
    marginLeft:10,

   },
   name:{
       fontFamily:commonStyles.fontFamily,
       fontSize:20,
       marginBottom:5,
       
   },
   email:{
       fontFamily:commonStyles.fontFamily,
       fontSize:15,
       color:'#666'
   },
   logoutIcon:{
      marginLeft:10,
      marginBottom:10, 
   }

})