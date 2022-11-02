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

export function Register({ navigation }: any) {
  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .required('O email não pode ser vazio')
      .email('Digite um email válido'),
    password: yup
      .string()
      .required('A senha não pode ser vazia')
      .min(6, 'A senha deve conter pelo menos 6 dígitos'),

    confirmPassword: yup
      .string()
      .required('A senha é obrigatória')
      .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
  })

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  })
  const onSubmit = async (data: UserInput) => {
    try {
      const { status } = await api.post(
        'users',
        {
          email: data.email,
          password: data.password,
        },
        { validateStatus: () => true }
      )

      if (status === 201 || status === 200) {
        Toast.success('Cadastro criado com sucesso')
      } else if (status === 409) {
        Toast.error('E-mail já cadastrado! Faça Login para continuar')
      }
    } catch (err) {}

    setTimeout(() => {
      navigation.push('Login')
    }, 2500)
  }

  useEffect(() => {
    register('email')
    register('password')
    register('confirmPassword')
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
          <TextField
            label="Confirme sua Senha:"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={(text: any) => setValue('confirmPassword', text)}
            placeholder="Confirme sua senha"
            error={errors.confirmPassword}
          ></TextField>
          <View style={styles.buttonContainer}>
            <ButtonComponent
              text="Cadastrar"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          <Text style={styles.textRegister}>
            Já Possui Conta?{' '}
            <Text
              style={[styles.textRegister, { color: '#8A8989' }]}
              onPress={() => navigation.push('Login')}
            >
              Entre
            </Text>
          </Text>
          <Text style={[styles.textRegister, { color: '#fff' }]}></Text>
        </View>
      </View>
    </>
  )
}
