import React, { Component } from 'react'
import {
    Modal, View, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity, TextInput
    , Platform
} from 'react-native'

import moment from 'moment'
import 'moment/locale/pt-br'
import DateTimePicker from '@react-native-community/datetimepicker'
    
import CommonStyles from '../../commonStyles'



const initialState = { desc: '',value:'', date: new Date(), showDatePicker: false, stageNew: false }

export default class AddTask extends Component {
    state = {
        ...initialState
    }
    
    save = () => {
        if (this.state.value){
        let valueRemake=this.state.value.replace(",",".")
        console.log(valueRemake)
        value => this.setState({ value:valueRemake })
        //this.setState({ value: valueRemake })
        }
        let descricao=this.state.desc&&(this.state.value)?this.state.desc+"     + R$"+this.state.value.replace(",","."):this.state.desc
        //console.log(descricao)
        
        const newTask = {
            desc: descricao,
            date: this.state.date,
           value:this.state.value

        }

        this.props.onSave && this.props.onSave(newTask)
        this.setState({ ...initialState })
        //console.log('Salvou fronte')
    }

    getDatePicker = () => {
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
        

        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}>

                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Contas a Pagar</Text>
                    <TextInput style={styles.input} onFocus= { desc => this.setState({ desc:""}) }
                        placeholder="Informe a Descrição..."
                        onChangeText={desc => this.setState({ desc })}
                        
                        value={this.state.desc} />

                    <Text style={styles.text}>Valor a pagar </Text>
                    <TextInput keyboardType='numeric'  style={styles.inputValue}
                        placeholder="0.00"
                        onFocus= { value => this.setState({ value:""}) }
                        onChangeText={value => this.setState({ value })}
                        value={this.state.value} />

                    {this.getDatePicker()}

                    <View style={styles.buttons}>

                 

                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={validForm ? this.save :this.props.onCancel }>
                            <Text style={styles.button}>{validForm ? 'Salvar' : ''}</Text>
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
        fontFamily: CommonStyles.fontFamily,
        backgroundColor:CommonStyles.color.today,
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
    text: {
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
    date: {
        fontFamily: CommonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15,
    }
})