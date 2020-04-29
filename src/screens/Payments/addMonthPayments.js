import React, { Component } from 'react'
import {
    Modal, View, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity, TextInput
    , Platform
} from 'react-native'
import CommonStyles from '../../commonStyles'
import moment from 'moment'
import 'moment/locale/pt-br'
import DateTimePicker from '@react-native-community/datetimepicker'
//import TaskList from './TaskList'
//import update from './update'

const initialState = { desc: '',value:'', date: new Date(), showDatePicker: false, combo: [] }
let getdataMovi=''
export default class updateTask extends Component {
    
    state = {
        ...initialState
    }

    transporte=()=>{
        const stringIdent=this.props.combo[1].indexOf("+ R$");
        //const quantNumberCaracters =this.props.combo[1].length;
        //var resultado = titulo.substring(5, 15);
        

        getdataMovi=moment(this.props.combo[2]).add({ days: 30  }).format('YYYY-MM-DDT01:00:00.000')
        
     
     this.setState({ desc:this.props.combo[1].substring(0, stringIdent).trim() ,date:new Date(getdataMovi),value:`${this.props.combo[3]}` })
 }



trataValor=()=>{
    this.transporte()
   
    
    this.setState({ valor:'' })
   
}





    save=()=>{
        if (this.state.value){
            let valueRemake=this.state.value.replace(",",".")
            console.log(valueRemake)
            value => this.setState({ value:valueRemake })
            //this.setState({ value: valueRemake })
            }
            let descricao=this.state.desc&&(this.state.value)?this.state.desc+"     + R$"+this.state.value.replace(",","."):this.state.desc
            //console.log(descricao)

        const  newTask={
            desc: descricao,
            date: this.state.date,
            value:this.state.value
    
        } 
        
        this.props.onSaveM && this.props.onSaveM(newTask)
        this.setState({...initialState})
  




    }
   
    getDateTimePicker = () => {
        let datePicker = <DateTimePicker value={this.state.date}
            onChange={(_, date) => this.setState({ date, showDatePicker: false })}
            mode='date' />
            //console.log(this.props.combo[2])
         
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
            <Modal onShow={this.transporte} transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}>

                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Duplicar conta a pagar - para -></Text>
                    <TextInput style={styles.input}
                        
                        placeholder={this.props.combo[1]}
                        onChangeText={desc => this.setState({ desc })}
                        value={this.state.desc} />

                    <Text style={styles.text}>Valor a receber </Text>
                    <TextInput keyboardType='numeric'  style={styles.inputValue}
                        placeholder="0.00"
                        
                        onFocus= {this.trataValor }
                        onChangeText={value => this.setState({ value })}
                        value={this.state.value} />

                        <Text style={styles.text}> Verifique a data </Text>
                    {this.getDateTimePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Duplicar</Text>
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
        backgroundColor: '#CD7054',
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
    },text: {
        fontFamily: CommonStyles.fontFamily,
        color: 'blue',
        margin: 15,
        marginBottom: 0,
        backgroundColor: '#fff',




    },

    inputValue: {
        color: 'blue',
        fontFamily: CommonStyles.fontFamily,
        width: 150,
        height: 40,
        margin: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6,

    },
})