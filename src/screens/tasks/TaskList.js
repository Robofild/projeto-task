import React, { Component } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
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
import Task from '../../components/Task'
import todayImage from '../../../assets/imgs/today.jpg'
import tomorrowImage from '../../../assets/imgs/tomorrow.jpg'
import weekImage from '../../../assets/imgs/week.jpg'
import monthImage from '../../../assets/imgs/month.jpg'
import AddTask from './addTask'
import UpdateTask from './updateTask'
import AddMonthTask from './addMonthTask'
import LoadCalendar from './LoadCalendar'
import { server, showError } from '../../common'

let informationTaskread = []
let combo = []
const initialState = {
    showdoneTasks: true,
    visibleTasks: [],
    showAddTask: false,
    showUpdateTask: false,
    showMoveTaskMonth: false,
    showCalendarPicker: false,


    tasks: [],

    date: new Date()
}



export default class TaskList extends Component {

    state = {
        ...initialState
    }
    recicle = async () => {
        console.log('recicle')
        this.loadTasks()
        this.props.navigation.openDrawer()
    }
    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('ReceivedState')
        const savedState = JSON.parse(stateString) || initialState
        //this.setState(state,this.filterTasks)
        this.setState({
            showdoneTasks: savedState.showdoneTasks
        }, this.filterTasks)
        this.loadTasks()
    }

    getDatePicker = () => {
        console.log('------------------------------')
        console.log('entrou em tesc')

        console.log('------------------------------')
    }


    loadTasks = async () => {
        console.log('this.loadTasks')
        console.log(this.props.daysHead)
        try {
            if (this.props.daysHead == 0 || this.props.daysHead == 1) {


                const maxDate = moment()
                    .add({ days: this.props.daysHead })
                    .format('YYYY-MM-DD 23:59:59')

                { this.filterTasks }

                const res = await axios.get(`${server}/tasks?date=${maxDate}`)

                this.setState({ tasks: res.data }, this.filterTasks)
            } else {
                let agora = moment();

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
                { this.filterTasks }


                const res = await axios.get(`${server}/weekMonth?params=${maxDate}`)

                this.setState({ tasks: res.data }, this.filterTasks)
            }


        } catch (error) {
            showError(error)
        }
    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showdoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({ visibleTasks })
        //AsyncStorage.setItem('ReceivedState',JSON.stringify(this.state)) 
        AsyncStorage.setItem('ReceivedState', JSON.stringify({
            showdoneTasks: this.state.showdoneTasks
        }))
    }

    toggleFilter = () => {
        this.setState({ showdoneTasks: !this.state.showdoneTasks }, this.filterTasks)
    }
    //alternacia da testk se tive setado coloaca concluido senao !concluido
    tock = async taskId => {
        try {
            //console.log(server)
            await axios.put(`${server}/tasks/${taskId}/toggle`)
            await this.loadTasks()
        } catch (error) {
            showError(error)
        }
    }
    conss = async (taskId, taskDesc, taskEstimatAt) => {
        this.setState({ showUpdateTask: true })
        try {
            informationTaskread = [taskId, taskDesc, taskEstimatAt]
            // console.log('tis ponto cosse acionado')
            // console.log(taskId)
            //await axios.put(`${server}/tasks/${taskId}/toggle`)
            //await this.loadTasks()
        } catch (error) {
            showError(error)
        }
    }
    MoveTaskMonth = async (taskId, taskDesc, taskEstimatAt) => {
        this.setState({ showMoveTaskMonth: true })
        try {
            informationTaskread = [taskId]
            // console.log('tis ponto cosse acionado')
            combo = [taskId, taskDesc, taskEstimatAt]
            console.log(combo[2])
            //await axios.put(`${server}/tasks/${taskId}/toggle`)
            //await this.loadTasks()
        } catch (error) {
            showError(error)
        }
    }


    addTask = async newTask => {

        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informadaa!')
            return

        }
        try {

            await axios.post(`${server}/tasks`, {

                desc: newTask.desc,
                estimateAt: newTask.date

            })
            //console.log('console==>'+newTask.date)
            this.setState({ showAddTask: false, showMoveTaskMonth: false }, this.loadTasks)

        } catch (error) {
            showError(error)
        }
    }
    updateTask = async (newTask) => {
      /*
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informadad!')
            return

        }
      */  try {
            //console.log('fala dev'+newTask.index)

            await axios.put(`${server}/tasks/${newTask.index}`, {
                desc: newTask.desc,
                estimateAt: newTask.date

            })

            this.setState({ showUpdateTask: false }, this.loadTasks)
            /*
                console.log(props.id)
                console.log(newTask.date)
                await axios.post(`${server}/tasks`, {
    
                    desc: newTask.desc,
                    estimateAt: newTask.date
    
                })
                //console.log('console==>'+newTask.date)
                this.setState({ showUpdateTask: false }, this.loadTasks)
    */

        } catch (error) {
            showError(error)
        }
    }
    deleteTask = async taskId => {
        try {
            await axios.delete(`${server}/tasks/${taskId}`)
            this.loadTasks()

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

    loadTasksfilter = async (loadMoviment) => {
        console.log('buscando' + loadMoviment.date)
        // console.log ('buscando'+loadMoviment.desc)
        if (!loadMoviment.desc) {
            try {

                const maxDate = loadMoviment.date
                { this.filterTasks }
                //console.log(maxDate)
                const res = await axios.get(`${server}/moviment?date=${maxDate}`)
                console.log('retorno' + res.data)
                this.setState({ tasks: res.data }, this.filterTasks)
                this.setState({ showCalendarPicker: false })
            } catch (error) {
                showError(error)
            }

        } else {

            const res = await axios.post(`${server}/moviment`, {

                desc: loadMoviment.desc,


            })
            this.setState({ tasks: res.data }, this.filterTasks)
            this.setState({ showCalendarPicker: false })
        }



    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>

                <LoadCalendar isVisible={this.state.showCalendarPicker} Reload={this.loadTasksfilter}
                    onCancel={() => this.setState({ showCalendarPicker: false })}
                    onSaveL={this.loadTasksfilter} />

                <UpdateTask combo={informationTaskread} isVisible={this.state.showUpdateTask}
                    onCancel={() => this.setState({ showUpdateTask: false })}
                    onSaveU={this.updateTask} />


                <AddMonthTask combo={combo} isVisible={this.state.showMoveTaskMonth}
                    onCancel={() => this.setState({ showMoveTaskMonth: false })}
                    onSaveM={this.addTask} />



                <AddTask isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({ showAddTask: false })}
                    onSave={this.addTask} />

                <ImageBackground style={styles.backgrond} source={this.getImage()}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.recicle}>
                            <Icon name={'bars'}
                                size={20} color={commonStyles.color.secondary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showdoneTasks ? 'eye' : 'eye-slash'}
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


                        <Icon onPress={() => this.setState({ showCalendarPicker: true })} style={styles.icon} name="search" size={20} color='#fff' />
                    </View>

                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) =>
                            <Task{...item}
                                onToggleTask={this.tock}
                                onDelete={this.deleteTask}

                                onshowupdate={this.conss}
                                onShowMoveTask={this.MoveTaskMonth}
                            />

                        } />


                </View>

                <TouchableOpacity style={[styles.addButton, { backgroundColor: this.getColor() }]} activeOpacity={0.7} onPress={() => this.setState({ showAddTask: true })}>
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

    }, buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.color.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 0
    }, ViewIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',

        marginRight: 5,
        marginBottom: 5,
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