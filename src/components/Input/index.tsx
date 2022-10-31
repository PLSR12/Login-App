import { View, Text, TextInput, TextInputProps } from 'react-native'
import { styles } from './styles'

interface InputComponentProps extends TextInputProps {
  label: string
}

export const TextField = ({ label, ...inputProps }: InputComponentProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      {...inputProps}
      placeholderTextColor="#8A8989"
    />
  </View>
)
