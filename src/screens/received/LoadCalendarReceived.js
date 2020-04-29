import React,{Component}from 'react'
import {Modal,View,StyleSheet,TouchableWithoutFeedback,Text,TouchableOpacity,TextInput
,Platform}from 'react-native'
import CommonStyles from '../../commonStyles'
import moment from'moment'
import 'moment/locale/pt-br'
import DateTimePicker from '@react-native-community/datetimepicker'

const initialState={desc:'' ,date:new Date(),showDatePicker:false}

export default class LoadCalendar extends Component{
    state={
     ...initialState
    }
 save=()=>{
   // console.log('addtask aciondo o metod salvar')
    const  loadMoviment={
        desc: this.state.desc,
        date:moment(this.state.date).format('YYYY-MM-DD HH:MM:ss')

    } 
    
    this.props.onSaveL && this.props.onSaveL(loadMoviment)
    this.setState({...initialState})
    console.log('Salvou fronte'+loadMoviment.date)
}

 getDatePicker=()=>{
     let datePicker= <DateTimePicker value={this.state.date}
      onChange={(_,date)=>this.setState({date,showDatePicker:false})}
      mode='date'/>

     const dateString=moment(this.state.date).format('YYYY-MM-DD HH:MM:ss')
      if (Platform.OS==='android'){
          datePicker=(
              <View>
                  <TouchableOpacity onPress={()=>this.setState({showDatePicker:true})}>
                      <Text style={styles.date}>
                          {dateString}

                      </Text>
                  </TouchableOpacity>
                  {this.state.showDatePicker&&datePicker}
              </View>
          )
      }

      return datePicker
 }   
render(){
    return(
        <Modal transparent={true}visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType='slide'>
            <TouchableWithoutFeedback onPress={this.props.onCancel}>
                <View style={styles.background}>
                   
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
            <Text style={styles.header}>Buscar Contas a receber</Text>
            <TextInput style={styles.input} 
            placeholder="Informe a Descrição..."
            onChangeText={desc=>this.setState({desc})}
            value={this.state.desc}/>
            {this.getDatePicker()}
            <View style={styles.buttons}>
                <TouchableOpacity onPress={this.props.onCancel}>
                    <Text style={styles.button}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.save}>
                <Text style={styles.button}>Buscar</Text>
                </TouchableOpacity>

            </View>
            </View>
            <TouchableWithoutFeedback onPress={this.props.onCancel}>
                <View style={styles.background}>

                </View>
            </TouchableWithoutFeedback>

        </Modal>
    )

}


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
     backgroundColor:'#8470FF',
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