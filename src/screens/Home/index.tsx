import logoImg from '../../assets/pagbanco_logo.png'
import { Text, View, Image } from 'react-native'
import { ButtonComponent, TextField } from '../../components'
import api from '../../services/api'
import ToastManager, { Toast } from 'toastify-react-native'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { styles } from './styles'

export function Home() {
  const { register, setValue, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    const authData = {
      email: data.email,
      password: data.password,
    }

    api
      .post('/sessions', authData)
      .then(() => {
        Toast.success('Login Realizado')
      })
      .catch(() => {
        Toast.error('Verifique seu Email ou Senha')
      })
  }

  useEffect(() => {
    register('email')
    register('password')
  }, [register])

  return (
    <>
      <View style={styles.container}>
        <ToastManager />
        <Image source={logoImg} style={styles.logo} />
        <View style={styles.containerItems}>
          <TextField
            label="Email:"
            onChangeText={(text: any) => setValue('email', text)}
            placeholder="Email"
            autoCorrect={false}
          ></TextField>
          <TextField
            label="Senha:"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={(text: any) => setValue('password', text)}
            placeholder="Senha"
          ></TextField>
          <View style={styles.buttonContainer}>
            <ButtonComponent text="Entrar" onPress={handleSubmit(onSubmit)} />
          </View>
          <Text style={styles.textRegister}>
            Não Possu Conta?{' '}
            <Text style={[styles.textRegister, { color: '#8A8989' }]}>
              Registre-se
            </Text>
          </Text>
        </View>
      </View>
    </>
  )
}
