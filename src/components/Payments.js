import React from 'react'
import{View,Text,StyleSheet, TouchableWithoutFeedback} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from '../commonStyles'
import Swipeable from'react-native-gesture-handler/Swipeable'

import moment from'moment'
import 'moment/locale/pt-br'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default props=>{
   
    const doneOrnotStyle=props.doneAt !=null?
    {textDecorationLine:'line-through'}:{}
    const date=props.doneAt? props.doneAt:props.estimateAt
    const formattedDate=moment(props.estimateAt).locale('pt-br')
    .format('ddd,D [de] MMMM')
    
    const getRightContent=()=>{
        
        return(
            
            <TouchableOpacity style={styles.right}  >
                <Icon onPress={()=>props.onShowMovePayments && props.onShowMovePayments(props.id,props.desc,props.estimateAt,props.value)} style={styles.icon} name="clone" size={40} color='#fff'/> 
                <Icon onPress={()=>props.onshowupdate && props.onshowupdate(props.id,props.desc,props.estimateAt,props.value)} style={styles.icon} name="edit" size={40} color='#fff'/>  
                
            </TouchableOpacity>
        )

    }
    const getLeftContent=()=>{
       
        return(
            
            <View style={styles.left}>
                <Icon name="trash" size={20} color='#fff'
                style={styles.excludeIcon}/>
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )

    }
 
    return(
        <Swipeable renderRightActions={getRightContent} 
        renderLeftActions={getLeftContent }
        onSwipeableLeftOpen={()=>props.onDelete && props.onDelete(props.id)}>
        <View style={styles.container}>
            
            <TouchableWithoutFeedback onPress={()=>props.onTogglePayments(props.id)}>
                <View style={styles.checkContaner}>
                {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>

            
            <View>
            <Text style={[styles.desc,doneOrnotStyle]}>{props.desc}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
            
            </View>
            
            
        </View>
        </Swipeable>
    )
}
function getCheckView(doneAt){//3
    if (doneAt!=null){
    return(
        <View style={styles.done}>
             <Icon name='check' size={20} color='#FFF'></Icon>
        </View>
    )
    }else{
        return(
            <View style={styles.pending}>
                
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        borderColor:'#AAA',
        borderBottomWidth:1,
        alignItems:'center',
        paddingVertical:5,
        backgroundColor:'#fff'


    },
    checkContaner:{
        width:'20%',
        alignItems:'center',
        justifyContent:'center'
    },
    pending:{
     height:25,
     width:25,
     borderRadius:13,
     borderColor:'#555',
     borderWidth:1

    },

    done:{
        height:25,
        width:25,
        borderRadius:13,
        borderColor:'#555',
        borderWidth:1,
        backgroundColor:'#4d7031',
        alignItems:'center',
        justifyContent:'center'
       },
    desc:{
        fontFamily:commonStyles.fontFamily,
        color:commonStyles.color.mainText,
        fontSize:12,
        fontWeight:'bold',
    },
    date:{
        fontFamily:commonStyles.fontFamily,
        color:'red',
        fontSize:10,
        fontWeight:'bold',
        
    }, right:{
        backgroundColor:'#666',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingHorizontal:25,
        marginBottom:5,
    }, icon:{
        paddingLeft:15,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:5,
    },iconEdit:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom:5,
    },left:{
        flex:1,
       backgroundColor:'red',
       flexDirection:'row',
       alignItems:'center',
    },excludeText:{
        fontFamily:commonStyles.fontFamily,
        color:'#FFF',
        fontSize:20,
        margin:10

    },excludeIcon:{
        marginLeft:10,
    }



})