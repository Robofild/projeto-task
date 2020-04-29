import {createAppContainer}from 'react-navigation';
import{createStackNavigator} from'react-navigation-stack';
import Main from './screens/testes'
import Profile from './screens/indexMenu'
const Routes= createAppContainer(
    createStackNavigator({
        Main:{
            screen:Main,
            navigationOptions:{
                title:'DevRadar',
                headerTitleAlign:"center",
            }

        },
        Profile:{
            screen:Profile,
            navigationOptions:{
                title:'Perfil no Github',
                headerTitleAlign:"center",
            }

        },
    }, {
        defaultNavigationOptions:{
        headerTintColor:'#fff',
        headerStyle:{
            backgroundColor:'#7D40E7'
        }
     }
    })
)
export default Routes;