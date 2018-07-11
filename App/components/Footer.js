import React from 'react'
import { StyleSheet, Text, View, PixelRatio } from 'react-native'

export default class Footer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text syle={styles.text}>
          Projeto do Curso React Native - DevMedia - Robson 
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E42BA',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    color: '#FFFFFF',
    fontSize: 14 / PixelRatio.getFontScale(),
    opacity: 0.8
  }
})