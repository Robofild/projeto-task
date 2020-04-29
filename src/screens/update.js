import React,{Component}from 'react'
import {Modal,View,StyleSheet,TouchableWithoutFeedback,Text,TouchableOpacity,TextInput
,Platform}from 'react-native'
import CommonStyles from '../commonStyles'
import moment from'moment'
import 'moment/locale/pt-br'
import DateTimePicker from '@react-native-community/datetimepicker'



export default props=>{
    
    const initialState={desc:'' ,date:new Date(),showDatePicker:false,combo:''}
    const date=props.doneAt? props.doneAt:props.estimateAt
    const formattedDate=moment(props.estimateAt).locale('pt-br')
    .format('ddd,D [de] MMMM')
    
save=()=>{
    console.log('addtask aciondo o metod salvar')
    const  newTask={
        desc: this.state.desc,
        date: this.state.date

    } 
    
    this.props.onSave && this.props.onSave(newTask)
    this.setState({...initialState})
    console.log('Salvou fronte')
}


 

    return(
        <Modal transparent={true}visible={props.isVisible}
        onRequestClose={props.onCancel}
        animationType='slide'>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}>
                   
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
            <Text style={styles.header}>Alterar uma receita</Text>
            <TextInput style={styles.input} 
            placeholder="Informe a Descrição..."
            >{props.combo[1]}</TextInput>
            <Text style={styles.date}>{formattedDate}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={props.onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onUpdate}> 
                        <Text style={styles.button}>Alterar</Text>
                </TouchableOpacity>

            </View>
            </View>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}>

                </View>
            </TouchableWithoutFeedback>

        </Modal>
    )

}



const styles=StyleSheet.create({
 background:{
     flex:1,
     backgroundColor:'rgba(0,0,0,0.7)'

 },
 container:{
     
     backgroundColor:'#FFF'
     
 },
 header:{
     fontFamily:CommonStyles.fontFamily,
     backgroundColor:CommonStyles.color.update,
     color:CommonStyles.color.secondary,
     textAlign:'center',
     padding:15,
     fontSize:15,

 },
 buttons:{
    flexDirection:'row',
    justifyContent:'flex-end'
 },
 button:{
   margin:20,
   marginRight:30,
   color:CommonStyles.color.today,
 },
 input:{
     fontFamily:CommonStyles.fontFamily,
     
     height:40,
     margin:15,
     backgroundColor:'#fff',
     borderWidth:1,
     borderColor:'#e3e3e3',
     borderRadius:6,

 },
 date:{
     fontFamily:CommonStyles.fontFamily,
     fontSize:20,
     marginLeft:15,
 }   
})