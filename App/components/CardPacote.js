import React from 'react'
import { Text, View, TouchableWithoutFeedback, PixelRatio, Image, StyleSheet } from 'react-native'
import busImage from '../assets/bus.png'
import moment from  'moment'
import 'moment/locale/pt-br'

export default class CardPacote extends React.Component {
  componentDidMount(){
    moment.locale('ptbr')
  }

  render() {
    const { onPress } = this.props
    const { id, nome, valor, dataInicio, dataFim } = this.props.detalhes

    return (
      <TouchableWithoutFeedback onPress={ onPress }>
        <View style={[styles.container, styles.mainContainer]}>
          <View style={[styles.container, styles.subContainer]}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {nome.toUpperCase()}
              </Text>
            </View>
            <View style={styles.lineBar} />
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={busImage} />
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.timeDurationContainer}>
              <Text style={styles.timeDuration}>
                De {moment(dataInicio).format('YY [de] MMMM')} até {moment(dataFim).format('YY [de] MMMM')}
              </Text>
            </View>
            <View style={styles.details}>
              <View style={styles.timeDurationContainer}>
                <Text style={styles.timeDuration}>
                  {moment.duration(moment(dataInicio).diff(moment(dataFim))).humanize()}
                </Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  {valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  mainContainer: {
    justifyContent: 'space-around',
    height: 130,
    maxHeight: 130,
    alignItems: 'center'
  },
  subContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5
  },
  bordered: {
    borderWidth: 1,
    borderColor: 'red'
  },
  titleContainer: {
    flex: 0.5,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#F6DB54'
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    fontSize: 11 / PixelRatio.getFontScale()
  },
  lineBar: {
    flex: 0.4,
    height: 1,
    backgroundColor: '#FFFFFF'
  },
  imageContainer: {
    flex: 0.1
  },
  image: {
    maxWidth: 178
  },
  content: {
    flex: 0.6,
    backgroundColor: '#4870f6',
    width: '95%',
    height: '100%',
    padding: 15,
    justifyContent: 'space-between',
    borderRadius: 2
  },
  pariodoBetween: {
    color: '#ffffff',
    fontSize: 14 / PixelRatio.getFontScale(),
    fontWeight: 'bold'
  },
  details: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timeDuration: {
    color: '#FFA500',
    fontSize: 17 / PixelRatio.getFontScale(),
    fontWeight: 'bold'
  },
  timeDurationContainer: {
    flex: 0.8,
    flexDirection: 'column'
  },
  priceContainer: {
    flex: 0.2,
    flexDirection: 'column'
  },
  price: {
    color: '#ffffff',
    fontSize: 15 / PixelRatio.getFontScale(),
    fontStyle: 'italic'
  }
})
