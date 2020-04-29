import React from 'react'
import{createAppContainer,createSwitchNavigator} from 'react-navigation'
import{createDrawerNavigator} from'react-navigation-drawer'

//import {createStackNavigator} from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/FontAwesome'
import Menu from './screens/Menu'
import commonStyles from './commonStyles'
import IndexMenu from './screens/MenuPrincipal/indexMenu'
import TaskList from'./screens/tasks/TaskList'
import ReceivedValue from'./screens/received/receivedValue'
import PaymentsValue from'./screens/Payments/PaymentsValue'
import Auth from './screens/Auth'
import AuthOrApp from './screens/AuthOrApp'



const menuConfig={
    initialRouteName:'Today',
    contentComponent:Menu,
    contentOptions:{
        labelStyle:{
          fontFamily:commonStyles.fontFamily,
          fontWeight:'normal',
          fontSize:20,
        },
        activeLabelStyle:{
            color:'#080',
            fontWeight:'bold',


        }
    }

}




const menuRoutes={
   

    IndexM:{
        name:'IndexM',
        screen:props=><IndexMenu  {...props}  />,
        navigationOptions:{
            title:'Início',
            
            icon: ({ tintColor }) => (
          <Icon name="users" size={30} color="#900" />
        )
        }
    },
    Today:{
        name:'Today',
        screen:props=><TaskList title='Hoje'daysHead={0} {...props}/>,
        navigationOptions:{
            title:'Hoje',
        }

    },
    Tomorrow:{
        name:'Tomorrow',
        screen:props=><TaskList title='Amanha'daysHead={1} {...props}/>,
        navigationOptions:{
            title:'Amanhã',
        }

    },
    week:{
        name:'week',
        screen:props=><TaskList title='Semana'daysHead={7} {...props}/>,
        navigationOptions:{
            title:'Semana',
        }

    },
    Month:{
        name:'Month',
        screen:props=><TaskList title='Mês'daysHead={30} {...props}/>,
        navigationOptions:{
            title:'Mês',
        }

    },

}

const menuRoutes2={
    
   
    IndexM:{
        name:'IndexM',
        screen:props=><IndexMenu title='Hoje'daysHead={0} {...props} />,
        navigationOptions:{
            title:'Início',
        }
    },
    Today:{
        name:'Today',
        screen:props=><ReceivedValue title='Hoje'daysHead={0} {...props}/>,
        navigationOptions:{
            title:'Hoje',
        }

    },
    Tomorrow:{
        name:'Tomorrow',
        screen:props=><ReceivedValue title='Amanha'daysHead={1} {...props}/>,
        navigationOptions:{
            title:'Amanhã',
        }

    },
    week:{
        name:'week',
        screen:props=><ReceivedValue title='Semana'daysHead={7} {...props}/>,
        navigationOptions:{
            title:'Semana',
        }

    },
    Month:{
        name:'Month',
        screen:props=><ReceivedValue title='Mês'daysHead={30} {...props}/>,
        navigationOptions:{
            title:'Mês',
        }

    },

}

const menuRoutes3={
    
   
    IndexM:{
        name:'IndexM',
        screen:props=><IndexMenu title='Hoje'daysHead={0} {...props} />,
        navigationOptions:{
            title:'Início',
        }
    },
    Today:{
        name:'Today',
        screen:props=><PaymentsValue title='Hoje'daysHead={0} {...props}/>,
        navigationOptions:{
            title:'Hoje',
        }

    },
    Tomorrow:{
        name:'Tomorrow',
        screen:props=><PaymentsValue title='Amanha'daysHead={1} {...props}/>,
        navigationOptions:{
            title:'Amanhã',
        }

    },
    week:{
        name:'week',
        screen:props=><PaymentsValue title='Semana'daysHead={7} {...props}/>,
        navigationOptions:{
            title:'Semana',
        }

    },
    Month:{
        name:'Month',
        screen:props=><PaymentsValue title='Mês'daysHead={30} {...props}/>,
        navigationOptions:{
            title:'Mês',
        }

    },

}


const menuNavigator=createDrawerNavigator(menuRoutes,menuConfig)
const menuNavigator2=createDrawerNavigator(menuRoutes2,menuConfig)
const menuNavigator3=createDrawerNavigator(menuRoutes3,menuConfig)


const mainRoutes={
    AuthOrApp:{
        name:'AuthOrApp',
        screen:AuthOrApp
    },
    Auth:{
        name:'Auth',
        screen:Auth
    },
    
    Home:{
        name:'Home',
        screen:IndexMenu,
        
    }, 
    
    Taskhome:{
        name:'Taskhome',
        screen:menuNavigator,
        }, 

    Received:{
        name:'Received',
        screen:menuNavigator2,
     

    },
    Payments:{
        name:'Payments',
        screen:menuNavigator3,
     

    },
   


 

}

const mainNavigator= createSwitchNavigator(mainRoutes,{initialRouteName:'AuthOrApp'})



export default createAppContainer(mainNavigator)