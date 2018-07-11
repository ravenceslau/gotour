import React from 'react'
import { Text, View, Alert, ScrollView, StyleSheet, PixelRatio } from 'react-native'
import CardPacote from '../components/CardPacote'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import ImageTitle from '../components/ImageTitle'

export default class ListaPacotes extends React.Component {
  state = {
    pacotes: undefined
  }

  componentDidMount(){
    fetch('http://devup.com.br/gotour/api/pacotes')
      .then(T => {
        if(T.status === 405){
          throw new Error(T.statusText)
        }

        return T.json()
      })
      .then(pacotes => this.setState({ pacotes }))
      .catch(error => {
        if(error.message === '405'){
          Alert.alert('Erro', 'Erro interno do servidor da api')
        }else{
          Alert.alert('Erro', 'Não foi possível recuperar os pacotes')
        }
      })
  }

  render() {
    const { pacotes } = this.state

    if(!pacotes){
      return (
        <View />
      )
    }

    return (
      <View style={styles.container}>
        <NavigationBar />
          <ScrollView style={styles.content}>
            <ImageTitle style={{ marginBottom: 30 }}/> 
            { pacotes.map((pacote, key) => (
              <CardPacote 
                key={key} 
                detalhes={pacote} 
                onPress={() => this.props.history.push(`${pacote.id  }`)} 
              />
            ))}
            {pacotes.length === 0 && (
              <Text style={styles.textWithoutItems}>
                Nenhum pacote encontrado
              </Text>
            )}
          </ScrollView>
          <View style={{ flex: 0.1 }} >
            <Footer />
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  content:{
    flex: 0.8,
    flexDirection: 'column',
    backgroundColor: '#224AD0'
  },
  textWithoutItems:{
    fontSize: 15 / PixelRatio.getFontScale(),
    textAlign: 'center',
    color: '#FFF'
  },
  footer:{
    flex: 0.1
  }
})
