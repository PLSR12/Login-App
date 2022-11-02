import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from './styles'
import { useState, useEffect } from 'react'

export function Home() {
  const [userData, setUserData] = useState<any>({})

  useEffect(() => {
    AsyncStorage.getItem('userData', (err, result) => {
      const dataUser: any = result
      setUserData(JSON.parse(dataUser))
    })
  }, [])

  console.log(userData)

  return (
    <View style={styles.container}>
      {Object.keys(userData).length > 0 && (
        <Text style={styles.title}> Bem Vindo, {userData.name} ! </Text>
      )}
    </View>
  )
}
