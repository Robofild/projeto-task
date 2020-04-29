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
import todayImage from '../../../assets/imgs/Received/Receiver0.jpg'
import tomorrowImage from '../../../assets/imgs/Received/Receiver1.jpg'
import weekImage from '../../../assets/imgs/Received/Receiver7.jpg'
import monthImage from '../../../assets/imgs/Received/Receiver30.jpg'

import Received from '../../components/Received'

import AddReceived from './addReceived'
import UpdateReceived from './updateReceived'
import AddMonthReceived from './addMonthReceived'

import LoadCalendar  from './LoadCalendarReceived'



import { server, showError } from '../../common'


//import Update from './update'



let combo=[]
let comboReceived = []
let informationReceivedread = []
const initialState = {
    showdoneReceiveds: true,
    visibleReceiveds: [],
    showAddReceived: false,
    showUpdateReceived: false,
    showCalendarPicker:false,
    showMoveReceivedMonth:false,

    received: [],
    
    
    date:new Date()
}


//console.log(this.props)
export default class ReceivedValue extends Component {
   
    state = {
        ...initialState
    }

  



    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('taskState')
        const savedState = JSON.parse(stateString) || initialState
        //this.setState(state,this.filterReceiveds)
        this.setState({
            showdoneReceiveds: savedState.showdoneReceiveds
        }, this.filterReceiveds)
        this.loadReceiveds()
    }

    loadReceiveds = async () => {
        console.log('this.loadTasks')
        console.log(this.props.daysHead)

        try {
            if (`${this.props.daysHead}` == 0 || `${this.props.daysHead}` == 1) {
                console.log('0 or 1')
                console.log(this.props.daysHead)

                const maxDate = moment()
                    .add({ days: this.props.daysHead })
                    .format('YYYY-MM-DD 23:59:59')

                { this.filterReceiveds }
                console.log('maxDate')
                console.log(maxDate)
                const res = await axios.get(`${server}/receivedsrec?date=${maxDate}`)
                
                this.setState({ received: res.data }, this.filterReceiveds)
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
                { this.filterReceiveds }


                const res = await axios.get(`${server}/weekMonthrec?params=${this.props.daysHead}`)

                this.setState({ received: res.data }, this.filterReceiveds)
            }


        } catch (error) {
            showError(error)
        }
    }
    
    addReceived = async newReceived => {

        if (!newReceived.desc || !newReceived.desc.trim()) {
           Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return

        }
        try {
           
            await axios.post(`${server}/receivedsrec`, {

                desc: newReceived.desc,
                estimateAt: newReceived.date,
                value:newReceived.value
            })
            //console.log('console==>'+newReceived.date)
            this.setState({ showMoveReceivedMonth:false,showAddReceived: false }, this.loadReceiveds)

        } catch (error) {
            showError(error)
        }
    }
    
    conss = async (receivedId, receivedDesc, receivedEstimatAt,receivedValue) => {
        this.setState({ showUpdateReceived: true })
        try {
            informationReceivedread = [receivedId, receivedDesc, receivedEstimatAt,receivedValue]
            // console.log('tis ponto cosse acionado')
            // console.log(receivedId)
            //await axios.put(`${server}/tasks/${receivedId}/toggle`)
            //await this.loadTasks()
        } catch (error) {
            showError(error)
        }
    }
    deleteReceived = async receivedId => {
        try {
            await axios.delete(`${server}/receivedsrec/${receivedId}`)
            this.loadReceiveds()

        } catch (error) {
            showError(error)

        }
    }

    loadReceivedsfilter = async (loadMoviment) => {
        console.log ('buscando'+loadMoviment.date)
        console.log ('buscando'+loadMoviment.desc)
        if (!loadMoviment.desc){
          try {
              
              const maxDate = loadMoviment.date
                  {this.filterReceiveds}
              //console.log(maxDate)
              const res = await axios.get(`${server}/movimentrec?date=${maxDate}`)
              console.log('retorno'+res.data)
              this.setState({ received: res.data }, this.filterReceiveds)
              this.setState({ showCalendarPicker: false })
          } catch (error) {
              showError(error)
          }
      
        }else{
  
          const res =await axios.post(`${server}/movimentrec`, {
  
              desc: loadMoviment.desc,
              
  
          })
          this.setState({ received: res.data }, this.filterReceiveds)
          this.setState({ showCalendarPicker: false })
        }
      
      
      
      }
  
      toggleFilter = () => {
        this.setState({ showdoneReceiveds: !this.state.showdoneReceiveds }, this.filterReceiveds)
    }
    //alternacia da testk se tive setado coloaca concluido senao !concluido
    tock = async receivedId => {
        try {
            console.log(receivedId)
            await axios.put(`${server}/receivedsrec/${receivedId}/toggle`)
            await this.loadReceiveds()
        } catch (error) {
            showError(error)
        }
    }
    //-------------------------------


    MoveReceivedMonth = async (receivedId, receivedDesc, receivedEstimatAt ,receivedValue) => {
        this.setState({ showMoveReceivedMonth: true })
        try {
            informationReceivedread = [receivedId, receivedDesc, receivedEstimatAt ,receivedValue]
            // console.log('tis ponto cosse acionado')
           
            console.log(combo[2])
            //await axios.put(`${server}/received/${receivedId}/toggle`)
            //await this.loadTasks()
        } catch (error) {
            showError(error)
        }
    }
    recicle=async()=>{
        
        console.log('recicle')
        this.loadReceiveds()
       this.props.navigation.openDrawer()
    }
 

    teste=()=>{
        console.log('------------------------------')
        console.log('{navigate}=this.props.navigate.navigate.openDrawer(')
        

        console.log('------------------------------')
       }




    filterReceiveds = () => {
        let visibleReceiveds = null
        if (this.state.showdoneReceiveds) {
            visibleReceiveds = [...this.state.received]
        } else {
            const pending = task => task.doneAt === null
            visibleReceiveds = this.state.received.filter(pending)
        }
        this.setState({ visibleReceiveds })
        //AsyncStorage.setItem('taskState',JSON.stringify(this.state)) 
        AsyncStorage.setItem('taskState', JSON.stringify({
        showdoneReceiveds: this.state.showdoneReceiveds
        }))
    }
 
  

    


   
    updateReceived = async (newReceived)=> {
      /*
        if (!newReceived.desc || !newReceived.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informadad!')
            return

        }
      */  try {
         //console.log('fala dev'+newReceived.index)

         await axios.put(`${server}/receivedsrec/${newReceived.index}`, {
            desc: newReceived.desc,
            estimateAt: newReceived.date,
            value: newReceived.value

       })

         this.setState({ showUpdateReceived: false },this.loadReceiveds)
        /*
            console.log(props.id)
            console.log(newReceived.date)
            await axios.post(`${server}/received`, {

                desc: newReceived.desc,
                estimateAt: newReceived.date

            })
            //console.log('console==>'+newReceived.date)
            this.setState({ showUpdateReceived: false }, this.loadReceiveds)
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
                    onSaveL={this.loadReceivedsfilter} />

                  <UpdateReceived  combo={informationReceivedread} isVisible={this.state.showUpdateReceived} 
                    onCancel={() => this.setState({ showUpdateReceived: false })}
                    onSaveU={this.updateReceived}/>
                     


                <AddReceived isVisible={this.state.showAddReceived}
                    onCancel={() => this.setState({ showAddReceived: false })}
                    onSave={this.addReceived} />

                 <AddMonthReceived combo={informationReceivedread} isVisible={this.state.showMoveReceivedMonth}
                    onCancel={() => this.setState({ showMoveReceivedMonth: false })}
                    onSaveM={this.addReceived} />

                <ImageBackground style={styles.backgrond} source={this.getImage()}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.recicle}>
                            <Icon name={'bars'}
                                size={20} color={commonStyles.color.secondary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showdoneReceiveds ? 'eye' : 'eye-slash'}
                                size={20} color={commonStyles.color.secondary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                        
                        
                       
                      
                    </View>
                    <View style={styles.ViewIcon}>
                    {//this.getDatePicker()
                    }
                  
                    
                     <Icon  onPress={() => this.setState({ showCalendarPicker: true })} style={styles.icon} name="search" size={20} color='#fff'/>
                    </View>

                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleReceiveds}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) =>
                            <Received{...item}
                                onToggleReceived={this.tock}
                                onDelete={this.deleteReceived}
                                onShowMoveReceived={this.MoveReceivedMonth}
                                onshowupdate={this.conss}
                                onShowMoveReceived={this.MoveReceivedMonth}
                                 />

                        } />


                </View>

                <TouchableOpacity style={[styles.addButton, { backgroundColor: this.getColor() }]} activeOpacity={0.7} onPress={() => this.setState({ showAddReceived: true })}>
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