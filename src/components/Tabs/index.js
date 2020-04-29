import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { server, showError } from '../../common'
import {
  Container, TabsContainer, TabItem, TabText,
} from './styles';




export default function Tabs({ translateY, navigation, somar }) {

 //console.log(suiteIcons(0))
  //Saldo geral
   function suiteIcons(situacao) {
     //console.log(situacao.parcial)
    switch (true) {
      case (situacao.parcial < 0):
        return 'trending-down'
       
        
      case situacao.parcial > 0:
        return 'trending-up'
     
        case situacao.parcial == 0:
       
          return'trending-flat'
        
      
         
        
      
    }
  }
  // Resutados
  const [parcial, setParcial] = useState('')
  // soma Pagar 
  const [contapagar, setContaPagar] = useState(0)
  const [contarPagar, setContasAPagar] = useState('0')
  // contas as tarefas 
  const [lercontar, setlerContar] = useState(0)
  const [contarTarefas, setContarTarefas] = useState('0')

  // soma os receber
  const [ler, setler] = useState('')
  const [soma, setSoma] = useState('0')
  GestaoRec()
  async function LoadTaskHome(event) {
    GestaoRec()
    navigation.navigate('Home')
    navigation.navigate('Taskhome')

  }




    async function LoadReceivedHome(event) {
      GestaoRec()
      somar && somar(ler)
      navigation.navigate('Taskhome')
      navigation.navigate('Received')



    }

    async function LoadPaymentsHome(event) {
      GestaoRec()
      somar && somar(ler)
      navigation.navigate('Taskhome')
      navigation.navigate('Payments')



    }

    async function GestaoRec(event) {

     
      try {
        //Retorna Tarefas a fazer- o recebido
        let conte
        const resConte = await axios.get(`${server}/somaRec`)

        const { conta } = resConte.data[0]
        conte = JSON.stringify(conta)
        const varConte = await AsyncStorage.setItem('contekey', conte)
        setlerContar(await AsyncStorage.getItem('contekey'))
        setContarTarefas(sum)

        //Retorna valores a receber- o recebido
        let soma
        const res = await axios.get(`${server}/gestaoRec`)

        const { sum } = res.data[0]
        if (sum != null) {
          soma = JSON.stringify(sum)
          const stateString = await AsyncStorage.setItem('somakey', soma)
          setler(await AsyncStorage.getItem('somakey'))
          setSoma(sum)
        } else {
          ////////console.log('nao entrou ler   null' + sum)
          setler(0)
        }


        //Retorna valores a Pagar- o recebido
        let somaPagar
        const resPay = await axios.get(`${server}/gestaopay`)

        const { as } = resPay.data[0]
        if (as != null) {
          ////console.log('contas a Pagar null')
          somaPagar = JSON.stringify(as)
          const statePagarchama = await AsyncStorage.setItem('somaPagarkey', somaPagar)
          setContaPagar(await AsyncStorage.getItem('somaPagarkey'))
          setContasAPagar(as)
        } else {
          ////console.log('nao entrou  null' + as)
          setContaPagar(0)
        }



        setParcial((ler - contapagar).toFixed(2))


        //fuctio cauculo de saldo


      } catch (error) {
        showError(error)

      }
    }


    somar && somar(ler)

    return (


      <Container style={{
        transform: [{
          translateY: translateY.interpolate({
            inputRange: [0, 380],
            outputRange: [0, 30],
            extrapolate: 'clamp',
          }),
        }],
        opacity: translateY.interpolate({
          inputRange: [0, 380],
          outputRange: [1, 0.3],
          extrapolate: 'clamp',
        }),
      }}
      >
        <TabsContainer onTouchStart={GestaoRec}>
          <TabItem>
            <Icon name="update" size={24} color="#FFF" />
            <TabText>Atualizar Contas</TabText>
          </TabItem>

          <TouchableOpacity onPress={LoadTaskHome} >

            <TabItem >
              <Icon name="chat-bubble-outline" size={24} color="#FFF" />
              <Text>► {lercontar}</Text>
              <TabText>Tarefas</TabText>
            </TabItem>

          </TouchableOpacity>

          <TouchableOpacity onPress={LoadReceivedHome}>

            <TabItem>
              <Icon name="arrow-downward" style={{ color: 'green' }} size={24} color="#FFF" />
              <Text >+ ► R${ler}</Text>
              <TabText>Receber</TabText>
            </TabItem>

          </TouchableOpacity>

          <TouchableOpacity onPress={LoadPaymentsHome}>
            <TabItem>
              <Icon name="arrow-upward" style={{ color: 'red' }} size={24} color="#FFF" />
              <Text >- ► R${contapagar}</Text>
              <TabText>Pagar</TabText>
            </TabItem>
          </TouchableOpacity>
          <TabItem>
            <Icon name={suiteIcons({parcial})} color={'red'} size={24} color="#FFF" />
            <Text style={parcial >= 0 ? '' : { color: '#8B008B' }} > R${parcial}</Text>
            <TabText>Parcial</TabText>


          </TabItem>

        </TabsContainer>
      </Container>
    );
  }
 
 
  const styles = StyleSheet.create({
    textSuperior: {

    }
  })