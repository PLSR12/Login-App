import { Text, Pressable, Button, PressableProps } from 'react-native'
import { styles } from './styles'

interface ButtonProps extends PressableProps {
  text: string
}

export const ButtonComponent = ({ text, ...PressableProps }: ButtonProps) => {
  return (
    <Pressable style={styles.button} {...PressableProps}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}
