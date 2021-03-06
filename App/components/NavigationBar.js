import React from 'react'
import { Text, View } from 'react-native'
import { DefaultTheme, Toolbar, ToolbarBackAction, ToolbarContent } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#224AD0',
    accent: '#f1c40f'
  }
}

export default class NavigationBar extends React.Component {
  render() {
    const { goBack } = this.props
    return (
      <Toolbar theme={theme}>
        { goBack && (
          <ToolbarBackAction onPress={goBack} />
        )}
        <ToolbarContent title='GoTour' />
      </Toolbar>
    )
  }
}
