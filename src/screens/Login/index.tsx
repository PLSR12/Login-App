import logoImg from '../../assets/pagbanco_logo.png'
import { Text, View, Image } from 'react-native'
import { ButtonComponent, TextField } from '../../components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../services/api'
import ToastManager, { Toast } from 'toastify-react-native'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { styles } from './styles'

type UserInput = {
  email?: string
  password?: string
}

export function Login({ navigation }: any) {
  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .required('O email não pode ser vazio')
      .email('Digite um email válido'),
    password: yup
      .string()
      .required('A senha não pode ser vazia')
      .min(6, 'A senha deve conter pelo menos 6 dígitos'),
  })

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  })

  const onSubmit = (data: UserInput) => {
    const authData = {
      email: data.email,
      password: data.password,
    }

    api
      .post('sessions', authData)
      .then((response: any) => {
        Toast.success('Login Realizado')
        AsyncStorage.setItem('userData', JSON.stringify(response.data))
        setTimeout(() => {
          navigation.push('Home')
        }, 2500)
      })
      .catch((error) => Toast.error('Verifique seu email e/ou senha'))
  }

  useEffect(() => {
    register('email')
    register('password')
  }, [register])

  return (
    <>
      <View style={styles.container}>
        <ToastManager style={{ width: 320 }} />
        <Image source={logoImg} style={styles.logo} />
        <View style={styles.containerItems}>
          <TextField
            label="Email:"
            onChangeText={(text: any) => setValue('email', text)}
            placeholder="Email"
            autoCorrect={false}
            error={errors.email}
          ></TextField>
          <TextField
            label="Senha:"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={(text: any) => setValue('password', text)}
            placeholder="Senha"
            error={errors.password}
          ></TextField>
          <View style={styles.buttonContainer}>
            <ButtonComponent text="Entrar" onPress={handleSubmit(onSubmit)} />
          </View>
          <Text style={styles.textRegister}>
            Não Possui Conta?{' '}
            <Text
              style={[styles.textRegister, { color: '#8A8989' }]}
              onPress={() => navigation.push('Register')}
            >
              Registre-se
            </Text>
          </Text>
        </View>
      </View>
    </>
  )
}
