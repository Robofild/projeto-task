import React, { Component } from 'react'
import {
    Modal, View, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity, TextInput
    , Platform
} from 'react-native'
import CommonStyles from '../../commonStyles'
import moment from 'moment'
import 'moment/locale/pt-br'
import DateTimePicker from '@react-native-community/datetimepicker'


const initialState = { desc: '', date: new Date(), showDatePicker: false, combo: [] }
let getdataMovi=''
export default class updateTask extends Component {
    
    state = {
        ...initialState
    }
    transporte=()=>{
   
        getdataMovi=moment(this.props.combo[2]).format('YYYY-MM-DDT18:19:37.619')
     
     this.setState({ desc:this.props.combo[1],date:new Date(getdataMovi) })
 }
    save=()=>{
        const indice=this.props.combo
       
        const  newTask={
            index:this.props.combo[0],
            desc: this.state.desc,
            date: this.state.date
    
        } 
       this.props.onSaveU && this.props.onSaveU(newTask)
       this.setState({...initialState})





    }
   
    getDateTimePicker = () => {
        
        let datePicker= <DateTimePicker  value={this.state.date}
        onChange={(_,date)=>this.setState({date,showDatePicker:false})}
        mode='date'/>
        
       const dateString=moment(this.state.date).format('ddd,D [de] MMMM [de] YYYY')
   
        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={this.transporte,()=>this.setState({showDatePicker:true})} >
                        <Text style={styles.date}>
                            {dateString}

                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker
    }
    
    render() {
       // console.log('----------')
        //console.log(this.props)
        //console.log('----------')
        return (
            <Modal  onShow={this.transporte} transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}>

                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Alterar Tarefa</Text>
                    <TextInput style={styles.input}
                        
                        onChangeText={desc => this.setState({ desc })}
                        value={this.state.desc} />
                    {this.getDateTimePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Alterar</Text>
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
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'

    },
    container: {

        backgroundColor: '#FFF'

    },
    header: {
        fontFamily: '#000',
        backgroundColor: '#000',
        color: CommonStyles.color.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 15,

    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: CommonStyles.color.today,
    },
    input: {
        fontFamily: CommonStyles.fontFamily,

        height: 40,
        margin: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6,

    },
    date: {
        color:'red',
        fontFamily: CommonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15,
    }
})