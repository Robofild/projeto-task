import React, { Component } from 'react'
//import DateTimePicker from '@react-native-community/datetimepicker'
import {
    View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform,
    Alert
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'
import 'moment/locale/pt-br'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'




import commonStyles from '../../commonStyles'
import todayImage from '../../../assets/imgs/Payments/Payments0.jpg'
import tomorrowImage from '../../../assets/imgs/Payments/Payments1.jpg'
import weekImage from '../../../assets/imgs/Payments/Payments7.jpg'
import monthImage from '../../../assets/imgs/Payments/Payments30.jpg'

import Payments from '../../components/Payments'

import AddPayments from './addPayments'
import UpdatePayments from './updatePayments'
import AddMonthPayments from './addMonthPayments'

import LoadCalendar  from './LoadCalendarPayments'



import { server, showError } from '../../common'


//import Update from './update'



let combo=[]
let comboPayments = []
let informationPaymentsread = []
const initialState = {
    showdonePayments: true,
    visiblePayments: [],
    showAddPayments: false,
    showUpdatePayments: false,
    showCalendarPicker:false,
    showMovePaymentsMonth:false,

    payment: [],
    
    
    date:new Date()
}


//console.log(this.props)
export default class PaymentsValue extends Component {
   
    state = {
        ...initialState
    }

  



    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('taskState')
        const savedState = JSON.parse(stateString) || initialState
        //this.setState(state,this.filterPayments)
        this.setState({
            showdonePayments: savedState.showdonePayments
        }, this.filterPayments)
        this.loadPayments()
    }

    loadPayments = async () => {
        console.log('this.loadTasks')
        console.log(this.props.daysHead)

        try {
            if (`${this.props.daysHead}` == 0 || `${this.props.daysHead}` == 1) {
                console.log('0 or 1')
                console.log(this.props.daysHead)

                const maxDate = moment()
                    .add({ days: this.props.daysHead })
                    .format('YYYY-MM-DD 23:59:59')

                { this.filterPayments }
                console.log('maxDate')
                console.log(maxDate)
                const res = await axios.get(`${server}/payments?date=${maxDate}`)
                console.log(res.data)
                this.setState({ payment: res.data },  this.filterPayments)
            } else {
                let agora = moment();
                console.log('vazou')
                let inicio = moment().day(0); // domingo desta semana
                let fim = moment().day(6); // sábado desta semana

                // imprimir as datas no formato desejado
                let formato = 'DD/MM/YYYY';
                console.log('agora=', agora.format(formato));
                console.log('início=', inicio.format(formato));
                console.log('fim=', fim.format(formato));



                console.log(moment().startOf('week'))


                const maxDate = this.props.daysHead
                console.log(this.props.daysHead)
                { this.filterPayments }


                const res = await axios.get(`${server}/weekMonthpay?params=${this.props.daysHead}`)

                this.setState({ payment: res.data }, this.filterPayments)
            }


        } catch (error) {
            showError(error)
        }
    }
    
    addPayments = async newPayments => {

        if (!newPayments.desc || !newPayments.desc.trim()) {
           Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return

        }
        try {
           
            await axios.post(`${server}/payments`, {

                desc: newPayments.desc,
                estimateAt: newPayments.date,
                value:newPayments.value
            })
            //console.log('console==>'+newPayments.date)
            this.setState({ showMovePaymentsMonth:false,showAddPayments: false }, this.loadPayments)

        } catch (error) {
            showError(error)
        }
    }
    
    conss = async (paymentId, paymentDesc, paymentEstimatAt,paymentValue) => {
        this.setState({ showUpdatePayments: true })
        try {
            informationPaymentsread = [paymentId, paymentDesc, paymentEstimatAt,paymentValue]
            // console.log('tis ponto cosse acionado')
            // console.log(paymentId)
            //await axios.put(`${server}/tasks/${paymentId}/toggle`)
            //await this.loadTasks()
        } catch (error) {
            showError(error)
        }
    }
    deletePayments = async paymentId => {
        try {
            await axios.delete(`${server}/paymentspay/${paymentId}`)
            this.loadPayments()

        } catch (error) {
            showError(error)

        }
    }

    loadPaymentsfilter = async (loadMoviment) => {
        console.log ('buscando'+loadMoviment.date)
        console.log ('buscando'+loadMoviment.desc)
        if (!loadMoviment.desc){
          try {
              
              const maxDate = loadMoviment.date
                  {this.filterPayments}
              //console.log(maxDate)
              const res = await axios.get(`${server}/movimentpay?date=${maxDate}`)
              console.log('retorno'+res.data)
              this.setState({ payment: res.data }, this.filterPayments)
              this.setState({ showCalendarPicker: false })
          } catch (error) {
              showError(error)
          }
      
        }else{
  
          const res =await axios.post(`${server}/movimentpay`, {
  
              desc: loadMoviment.desc,
              
  
          })
          this.setState({ payments: res.data }, this.filterPayments)
          this.setState({ showCalendarPicker: false })
        }
      
      
      
      }
  
      toggleFilter = () => {
        this.setState({ showdonePayments: !this.state.showdonePayments }, this.filterPayments)
    }
    //alternacia da testk se tive setado coloaca concluido senao !concluido
    tock = async paymentId => {
        try {
            console.log(paymentId)
            await axios.put(`${server}/paymentsspay/${paymentId}/toggle`)
            await this.loadPayments()
        } catch (error) {
            showError(error)
        }
    }
    //-------------------------------


    MovePaymentsMonth = async (paymentId, paymentDesc, paymentEstimatAt ,paymentValue) => {
        this.setState({ showMovePaymentsMonth: true })
        try {
            informationPaymentsread = [paymentId, paymentDesc, paymentEstimatAt ,paymentValue]
            // console.log('tis ponto cosse acionado')
           
            console.log(combo[2])
            //await axios.put(`${server}/payment/${paymentId}/toggle`)
            //await this.loadTasks()
        } catch (error) {
            showError(error)
        }
    }
    recicle=async()=>{
        
        console.log('recicle')
        this.loadPayments()
       this.props.navigation.openDrawer()
    }
 

    teste=()=>{
        console.log('------------------------------')
        console.log('{navigate}=this.props.navigate.navigate.openDrawer(')
        

        console.log('------------------------------')
       }




    filterPayments = () => {
        console.log('filter paramer')
        let visiblePayments = null
        if (this.state.showdonePayments) {
            visiblePayments = [...this.state.payment]
        } else {
            const pending = task => task.doneAt === null
            visiblePayments = this.state.payment.filter(pending)
        }
        this.setState({ visiblePayments })
        //AsyncStorage.setItem('taskState',JSON.stringify(this.state)) 
        AsyncStorage.setItem('taskState', JSON.stringify({
        showdonePayments: this.state.showdonePayments
        }))
    }
 
  

    


   
    updatePayments = async (newPayments)=> {
      /*
        if (!newPayments.desc || !newPayments.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informadad!')
            return

        }
      */  try {
         //console.log('fala dev'+newPayments.index)

         await axios.put(`${server}/paymentspay/${newPayments .index}`, {
            desc: newPayments .desc,
            estimateAt: newPayments .date,
            value: newPayments .value

       })

         this.setState({ showUpdatePayments : false },this.loadPayments)
        /*
            console.log(props.id)
            console.log(newPayments .date)
            await axios.post(`${server}/payment`, {

                desc: newPayments .desc,
                estimateAt: newPayments .date

            })
            //console.log('console==>'+newPayments .date)
            this.setState({ showUpdatePayments : false }, this.loadPayments s)
*/

        } catch (error) {
            showError(error)
        }
    }

 




    getImage = () => {
        switch (this.props.daysHead) {
            case 0: return todayImage
            case 1: return tomorrowImage
            case 7: return weekImage
            default: return monthImage
        }

    }
    getColor = () => {
        switch (this.props.daysHead) {
            case 0: return commonStyles.color.today
            case 1: return commonStyles.color.tomorrow
            case 7: return commonStyles.color.week
            default: return commonStyles.color.month
        }

    }


    render() {
        
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>

                  <LoadCalendar isVisible={this.state.showCalendarPicker}
                    onCancel={() => this.setState({ showCalendarPicker: false })}
                    onSaveL={this.loadPaymentsfilter} />

                  <UpdatePayments  combo={informationPaymentsread} isVisible={this.state.showUpdatePayments} 
                    onCancel={() => this.setState({ showUpdatePayments: false })}
                    onSaveU={this.updatePayments}/>
                     


                <AddPayments isVisible={this.state.showAddPayments}
                    onCancel={() => this.setState({ showAddPayments: false })}
                    onSave={this.addPayments} />

                 <AddMonthPayments combo={informationPaymentsread} isVisible={this.state.showMovePaymentsMonth}
                    onCancel={() => this.setState({ showMovePaymentsMonth: false })}
                    onSaveM={this.addPayments} />

                <ImageBackground style={styles.backgrond} source={this.getImage()}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.recicle}>
                            <Icon name={'bars'}
                                size={20} color={commonStyles.color.secondary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showdonePayments ? 'eye' : 'eye-slash'}
                                size={20} color={commonStyles.color.secondary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                        
                        
                       
                      
                    </View>
                    <View style={styles.ViewIcon}>
                    
                
                     
                     <Icon  onPress={() => this.setState({ showCalendarPicker: true })} style={styles.icon} name="search" size={20} color='#fff'/>
                    </View>

                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visiblePayments}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) =>
                            <Payments{...item}
                                onTogglePayments={this.tock}
                                onDelete={this.deletePayments}
                                onShowMovePayments={this.MovePaymentsMonth}
                                onshowupdate={this.conss}
                                
                                 />

                        } />


                </View>

                <TouchableOpacity style={[styles.addButton, { backgroundColor: this.getColor() }]} activeOpacity={0.7} onPress={() => this.setState({ showAddPayments: true })}>
                    <Icon name="plus" size={20} color={commonStyles.color.secondary} />
                </TouchableOpacity>

            </View>


        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgrond: {
        flex: 3,
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.color.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 5,

    },buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.color.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 0
    }, ViewIcon:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
       
        marginRight:5,
        marginBottom:5,
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: Platform.Os === 'ios' ? 40 : 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    }

})