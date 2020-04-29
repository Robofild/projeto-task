import React, { useState } from 'react'
import {Animated,StyleSheet,ImageBackground,Text, View} from 'react-native'
import {PanGestureHandler,State} from'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons';
import{Container,Content,CardContent,CardFooter, Card, CardHeader, Title, Description, Annotation} from '../../pages/Main/styles'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { server, showError } from '../../common'
import backgroundImage from '../../../assets/imgs/login.jpg'
import Header from '../../components/Header'
import Tabs from '../../components/Tabs'
import Menu from '../../components/Menu'


export default function Main({navigation}){

  //Saldo geral

  // Resutados parcial aqui trata o total
  const [parcial, setParcial] = useState('')
  // soma Pagar 
  const [contapagar, setContaPagar] = useState('')
  const [contarPagar, setContasAPagar] = useState('0')
  // contas as tarefas 
  const [lercontar, setlerContar] = useState('')
  const [contarTarefas, setContarTarefas] = useState('0')

  // soma os receber
  const [ler, setler] = useState('')
  const [soma, setSoma] = useState('0')







  const [somarec, setSomaRec] = useState('100');
  
 


  axios.defaults.headers.common['nome']=navigation.getParam('nome')
  axios.defaults.headers.common['email']=navigation.getParam('email')
  /*//console.log(navigation.getParam('nome'))
  //console.log(navigation.getParam('email'))
  //console.log('Menu')
  //console.log(axios.defaults.headers.common['nome'])
  //console.log(axios.defaults.headers.common['email'])
  */

   const translateY = new Animated.Value(0);

   const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true },
  );


  const logout=()=>{
        
    delete  axios.defaults.headers.common['nome']
    delete axios.defaults.headers.common['email'] 

delete axios.defaults.headers.common['Authorization']
AsyncStorage.removeItem('userData')
navigation.navigate('AuthOrApp')

}
  
  function onHandlerStateChanged(event) {
    let offset = 0;
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY } = event.nativeEvent;

      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }
  async function transferSoma(valorRec) {
 
    
  
    //console.log('pronto para transferisr' )
  
  
    try {
      let conta 
      //Retorna valores a receber- o recebido
      let soma
      const res = await axios.get(`${server}/totaldisponivel`)
  
      const { receber } = res.data[0]
      soma = JSON.stringify(receber)
      const stateString = await AsyncStorage.setItem('somakeyR', soma)
      setler(await AsyncStorage.getItem('somakeyR'))
      setSoma(receber)
  
  
      //Retorna valores a Pagar- o recebido
      let somaPagar
      const resPay = await axios.post(`${server}/totaldisponivel`)
  
      const { pagar } = resPay.data[0]
      somaPagar = JSON.stringify(pagar)
      const statePagarchama = await AsyncStorage.setItem('somaPagarkeyP', somaPagar)
      setContaPagar(await AsyncStorage.getItem('somaPagarkeyP'))
      setContasAPagar(pagar)
  
  
  
      conta=(ler - (contapagar))
      conta=parseFloat(conta.toFixed(2));
      
      ////console.log(conta)
      setParcial(conta)
      /*////console.log('__________')
      //console.log(contapagar)
      //console.log(parcial)
      */ 
      //fuctio cauculo de saldo
  
  
    } catch (error) {
      showError(error)
  
    }
       
     
  }



    return(
   
      <Container onMagicTap={transferSoma}>
             <ImageBackground source={backgroundImage}
      style={styles.background}>
            <Header/>
            <Content>
               <Menu translateY={translateY}/> 
               <PanGestureHandler onGestureEvent={animatedEvent} onHandlerStateChange={onHandlerStateChanged}>
                <Card style={{
              transform: [{
                translateY: translateY.interpolate({
                  inputRange: [-350, 0, 360],
                  outputRange: [-50, 0, 360],
                  extrapolate: 'clamp',
                }),
              }],
            }}>
                    <CardHeader>
                        <Icon onPress={transferSoma} name="attach-money" size={28} color="#666"/>
                        <Icon onPress={logout} name="lock" size={28} color="#666"/>
                    </CardHeader>
                    <CardContent>
                        <Title>Saldo disponível</Title>
                        <Description>R$ {parcial} </Description>
                          
                    </CardContent>
                    <CardFooter>
                        <Annotation>
                        <Text style={styles.indiceTotalPositivo}>Total a Receber <Text style={styles.indiceTotalPositivo}>   R$ {ler}  </Text> </Text>
               
                        </Annotation>
                        <Annotation>
                        <Text style={styles.indiceTotalNegativo}>Total a Pagar <Text style={styles.indiceTotalNegativo}>       R$ {contapagar} </Text> </Text>
               
                        </Annotation>

                    </CardFooter>
                </Card>
                </PanGestureHandler>
            </Content>
            
    

           
            <Tabs somar={transferSoma} translateY={translateY} navigation={navigation} />
            </ImageBackground>
        </Container>
       
    )
}
const styles = StyleSheet.create({
  background: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
  },
  contener:{
   
  
  color:'blue',
  alignItems:'stretch',
  flexDirection:'column'
  
  },
  indiceTotalPositivo:{
   
 

    color:'green',
    paddingBottom:30,
    marginBottom:30
  },
  indiceTotalNegativo:{
   flex:1,

       marginLeft:50,
    marginEnd:50,
    marginHorizontal:100,
    padding:15,
    paddingLeft:150,
    flexDirection:'column',
    color:'red'
  }

})