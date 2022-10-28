import { View, Text, TextInput, TextInputProps } from 'react-native'
import { styles } from './styles'

interface InputComponentProps extends TextInputProps {
  label: string
  inputProps?: any
}

export const TextField = ({ label, ...inputProps }: InputComponentProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} {...inputProps} />
  </View>
)
