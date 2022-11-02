import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter'

import { Loading } from '../components/Loading'
import { Login } from '../screens/Login'
import { Register } from '../screens/Register'
import { Home } from '../screens/Home'

const Stack = createNativeStackNavigator()

export default function Routes() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  })
  return (
    <>
      <NavigationContainer>
        {fontsLoaded ? (
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        ) : (
          <Loading />
        )}
      </NavigationContainer>
    </>
  )
}
