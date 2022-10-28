import { StatusBar } from 'expo-status-bar'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { TextField } from './components/Input'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

export default function App() {
  const { register, setValue, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  useEffect(() => {
    register('email')
  }, [register])

  return (
    <View style={styles.container}>
      <Text>Faça Login</Text>
      <TextField
        label="Label"
        onChangeText={(text: any) => setValue('email', text)}
      />
      <TextInput onChangeText={(text: any) => setValue('email', text)} />
      <Button title="enviar" onPress={handleSubmit(onSubmit)} />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
