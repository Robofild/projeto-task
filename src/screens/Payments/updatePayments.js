import React, { Component } from 'react'
import {
    Modal, View, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity, TextInput
    , Platform
} from 'react-native'
import CommonStyles from '../../commonStyles'
import moment from 'moment'
import 'moment/locale/pt-br'
import DateTimePicker from '@react-native-community/datetimepicker'
import { number } from 'prop-types'


const initialState = { desc: '',value:'', date: new Date(), showDatePicker: false, combo: [] }
let getdataMovi=''
export default class updateTask extends Component {
   
    
    state = {
        ...initialState
    }
    transporte=()=>{
        getdataMovi=moment(this.props.combo[2]).format('YYYY-MM-DDT18:19:37.619')
     
        this.setState({ desc:this.props.combo[1],date:new Date(getdataMovi) })

        const stringIdent=this.props.combo[1].indexOf("+ R$");
      
        this.setState({ desc:this.props.combo[1].substring(0, stringIdent).trim(),value:`${this.props.combo[3]}`})
       console.log('acionado')
       
    }
    trataValor=()=>{
        this.transporte()
       
        
        //this.setState({ valor:'' })
       
    }

    save=()=>{
        if (this.state.value){
            let valueRemake=this.state.value.replace(",",".")
            console.log(valueRemake)
            value => this.setState({ value:valueRemake })
            //this.setState({ value: valueRemake })
            }
            let descricao=this.state.desc&&(this.state.value)?this.state.desc+"     + R$"+this.state.value.replace(",","."):this.state.desc
            console.log(descricao)
            console.log('ºdesc')
            
          
        const indice=this.props.combo[0]
       // console.log('Clicou para alterar')
        //console.log(indice)
        //console.log('-----> aciondo o metod salvar  indice'+this.props.combo[0]+'**'+descricao)
        const  newTask={
            index:this.props.combo[0],
            desc:descricao,
            date: this.state.date,
            value:this.state.value
        } 
       this.props.onSaveU && this.props.onSaveU(newTask)
       this.setState({...initialState})





    }
   
    getDateTimePicker = () => {
        let datePicker = <DateTimePicker value={this.state.date}
            onChange={(_, date) => this.setState({ date, showDatePicker: false })}
            mode='date' />

        const dateString = moment(this.state.date).format('ddd,D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
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
        const validations = []
        validations.push(this.state.value && this.state.value.includes(','))
        validations.push(this.state.value && this.state.value.includes('.'))

        if (this.state.stageNew) {
            validations.push(this.state.value && this.state.value.trim().length >= 3)

            //validations.push(this.state.password === this.state.confirmPassword)

        }
        const validForm = validations.reduce((t, a) => t || a)
        
    
        console.log(validForm)
      /*  console.log('---render-------')
        console.log(this.props.combo)
        console.log('----------')*/
        return (
            <Modal onShow={this.transporte} transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}>

                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Alterar Conta à Pagar
                     
                     
                     </Text>
                    <TextInput style={styles.input}
                        
                        placeholder={this.props.combo[1]||'transferir'}
                        onChangeText={desc => this.setState({ desc })}
                        value={this.state.desc}/>
                    <Text style={styles.text}>Valor a receber </Text>
                    
                    <TextInput keyboardType='numeric'  style={styles.inputValue}
                        placeholder="0.00"
                       
                        onChangeText={value => this.setState({ value })}
                        value={this.state.value} />


                    {this.getDateTimePicker()}  
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={validForm ? this.save :this.props.onCancel }>
                            <Text style={styles.button}>{validForm ? 'Alterar' : ''}</Text>
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
    text: {
        fontFamily: CommonStyles.fontFamily,
        color: 'blue',
        margin: 15,
        marginBottom: 0,
        backgroundColor: '#fff',




    },
    date: {
        color:'red',
        fontFamily: CommonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15,
    }
})