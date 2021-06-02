import api_fetch from './api_fetch'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default {

    onSignIn: async (email, password) => {
        const data = { email, password }
        const request = await api_fetch.post('/users/signin', data)
        return request
    },

    onSignUp: async (values) => {
        const data = {
            name: values.name,
            cpf: values.cpf,
            phone: values.phone,
            email: values.email,
            password: values.password
        }
        const request = await api_fetch.post('/users', data)
        return request
    },

    onJackpotRegister: async (jackpotId) => {
        const user = await JSON.parse(await AsyncStorage.getItem('@palpiteiros:user')) || []
        console.log(user)
        const data = {
            user: {
                id: user.id
            },
            jackpot: {
                id: jackpotId
            }
        }
        const request = await api_fetch.post('/registers', data)
        return request
    }

}