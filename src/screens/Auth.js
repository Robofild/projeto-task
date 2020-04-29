import React, { Component } from 'react'
import { ImageBackground, Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import Authinput from '../components/Authinput'
import { server, showError, showSuccess } from '../common'


import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false
}

export default class Auth extends Component {
    state = {
        ...initialState
    }

    signinOrSignup = () => {
        if (this.state.stageNew) {
            this.signup()
            console.log('signup')
        } else {
            this.signin()
            console.log('signin')
        }

    }

    signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                nome: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })
            showSuccess(`${this.state.name} cadastrado(a) com sucesso`)
            this.setState({ ...initialState })
        } catch (e) {
            showError(e)

        }
    }

    signin = async () => {

        try {
            const res = await axios.post(`${server}/signin`, {
                nome: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
            // console.log(res.data.token)
            AsyncStorage.setItem('userData', JSON.stringify(res.data))
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
           
           
            try {
               // console.log(this.state.name)
                //axios.defaults.headers.common['nome'] = this.state.name
               // axios.defaults.headers.common['email'] = this.state.email
            } catch (error) {
                //console.log("erro auth" + error)

            }

            this.props.navigation.navigate('Home', res.data)



        } catch (e) {
            try {
                //axios.defaults.headers.common['nome'] = this.state.name
                //axios.defaults.headers.common['email'] = this.state.name
            } catch (error) {
                //console.log("erro auth" + error)

            }
            showError(e)

        }

    }
    render() {

        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)

            validations.push(this.state.password === this.state.confirmPassword)

        }
        const validForm = validations.reduce((t, a) => t && a)

        return (
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                <Text style={styles.title}>Robofild</Text>
                <View style={styles.formContainer}>
                    {this.state.stageNew && <Text style={styles.subTitle}>Crie a sua conta</Text> || <Text style={styles.subTitle}>Informe seus dados</Text>}
                    {this.state.stageNew && <Authinput icon='user' placeholder='Nome' value={this.state.name} style={styles.input} onChangeText={name => this.setState({ name })} />}
                    <Authinput icon='at' placeholder='Email' value={this.state.email} style={styles.input} onChangeText={email => this.setState({ email })} />
                    <Authinput icon='lock' placeholder='Senha' value={this.state.password} style={styles.input} secureTextEntry={true} onChangeText={password => this.setState({ password })} />
                    {this.state.stageNew && <Authinput icon='asterisk' placeholder='Confirme a Senha' secureTextEntry={true} value={this.state.confirmPassword} style={styles.input} onChangeText={confirmPassword => this.setState({ confirmPassword })} />}
                    <TouchableOpacity onPress={this.signinOrSignup} disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
                            <Text style={styles.buttonText}>{this.state.stageNew ? 'Registrar' : 'Entrar'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                    <Text style={styles.buttonText}>{this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}</Text>
                </TouchableOpacity>
            </ImageBackground>

        )
    }
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.color.secondary,
        fontSize: 70,
        marginBottom: 10,
    },
    subTitle: {
        color: '#666',
        fontSize: 20,
        textAlign: 'center'
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 20,
        width: '90%',

    },
    input: {
        marginTop: 15,
        backgroundColor: '#fff',


    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10


    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 20,

    },


})