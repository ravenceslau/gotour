import React from 'react'
import { Text, View, Alert, ImageBackground, Linking, StyleSheet, PixelRatio } from 'react-native'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'

export default class DetalhePacote extends React.Component {
  state = {
    dados: undefined
  }

  componentDidMount(){
    const { pacoteId } = this.props.match.params

    fetch( `http://devup.com.br/gotour/api/pacote/${pacoteId}/detalhes` )
      .then(T => T.json())
      .then(dados => this.setState({ dados }))
      .catch(() => Alert.alert('Erro', 'Não foi possivel recuperar os detalhes do pacote'))
  }

  openLink(url){
    Linking.canOpenURL(url)
      .then(supported => supported && Linking.openURL(url))
      .catch(err => console.error('An error occurred', err))
  }

  render() {
    const { dados } = this.state
    if(!dados){
      return(
        <View style={{ paddingTop: 30 }}>
          <Text> Carregando...</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <NavigationBar goBack={() => this.props.history.push('/')} />
        <View style={styles.content}>
          <ImageBackground 
            resizeMode = 'cover'  
            source={{ uri: dados.urlImagem }}
            style = {styles.imageBackground} >
            <View style={ styles.imageContent }>
              <Text style={ styles.title }>
                {dados.pacote.nome.toUpperCase()}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.bodyContainer}>
            <Text style={styles.textDescription}>
              {'Descrição:'.toUpperCase()}
            </Text>
            <Text style={styles.textDescription}>
              {dados.descricao}
            </Text>
            <Text onPress={() => this.openLink(`tel:${dados.telefone}`)} style={styles.textDescription}>
              {dados.telefone}
            </Text>
            <Text onPress={() => this.openLink(`http://${dados.site}`)} style={styles.textDescription}>
              {dados.site}
            </Text>
            <View style={styles.priceConatainer}>
            <Text style={styles.priceValue}>
              {dados.pacote.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}
            </Text>
          </View>
          </View>
          <Text style={{color:'#FFF', paddingLeft: 30}}>Localização: </Text>
          <View style={styles.mapContainer}>
            <View style={styles.map}>

            </View>
          </View>
          <View style={{ flex: 0.1 }}>
            <Footer />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#224AD0'
  },
  content: {
    flex: 1,
    justifyContent: 'space-between'
  },
  imageBackground: {
    flex: 0.3,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    borderBottomColor: '#F6DB54',
    borderBottomWidth: 2
  },
  phoneNumber: {
    color: '#FFF',
    fontSize: 12 / PixelRatio.getFontScale(),
    fontWeight: 'bold',
    marginTop: 5
  },
  imageContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 34,
    flex: 0.7,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1
  },
  title: {
    fontSize: 16 / PixelRatio.getFontScale(),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bodyContainer: {
    flex: 0.4,
    paddingLeft: 30,
    paddingRight: 30
  },
  textDescription: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14 / PixelRatio.getFontScale(),
    paddingBottom: 5,
    marginTop: 5
  },
  priceConatainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 120,
    backgroundColor: '#F6DB54'
  },
  priceValue: {
    fontSize: 14 / PixelRatio.getFontScale(),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  mapContainer: {
    flex: 0.5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5
  },
  map: {
    flex: 1,
    backgroundColor: '#BEBEBE',
    width: 330
  }
})
