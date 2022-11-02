import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from './styles'
import { useState, useEffect } from 'react'
import { ButtonComponent } from '../../components'

export function Home({ navigation }: any) {
  const [userData, setUserData] = useState<any>([])

  useEffect(() => {
    AsyncStorage.getItem('userData', (err, result) => {
      const dataUser: any = result
      setUserData(JSON.parse(dataUser))
    })
  }, [])

  function logout() {
    AsyncStorage.clear()
    setUserData([])

    setTimeout(() => {
      navigation.push('Login')
    }, 500)
  }

  return (
    <View style={styles.container}>
      {userData && (
        <Text style={styles.title}> Bem Vindo, {userData.name} ! </Text>
      )}
      <ButtonComponent text="Logout" onPress={logout} />
    </View>
  )
}
