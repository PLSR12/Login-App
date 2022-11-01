import { View, Text, TextInput, TextInputProps } from 'react-native'
import { styles } from './styles'

interface InputComponentProps extends TextInputProps {
  label: string
  error: any
}

export const TextField = ({
  label,
  error,
  ...inputProps
}: InputComponentProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      {...inputProps}
      placeholderTextColor="#8A8989"
    />

    {!!error && <Text style={styles.errorMessage}>{error.message}</Text>}
  </View>
)
