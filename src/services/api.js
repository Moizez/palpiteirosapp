import AsyncStorage from '@react-native-async-storage/async-storage'

const CEP_API = 'https://viacep.com.br/ws'
//const API = 'http://192.168.1.128:8080/api'
const API = 'https://palpiteirosapi.herokuapp.com/api'


const apiFetchPost = async (endpoint, body, token) => {

    const headers = new Headers();
    headers.append("Content-Type", "application/json")
    headers.append("Accept", 'application/json')

    const response = await fetch(API + endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })

    if (response.status >= 200 && response.status <= 299) {
        const json = await response.json()
        if (json) {
            return {
                data: json,
                status: response.status
            }
        } else {
            return {
                data: null,
                status: response.status
            }
        }
    } else {
        return {
            data: null,
            status: response.status,
        }
    }
}

const apiFetchGet = async (endpoint) => {

    const response = await fetch(API + endpoint)
    if (response.status >= 200 && response.status <= 299) {
        const json = await response.json()
        if (json) {
            return {
                data: json,
                status: response.status
            }
        } else {
            return {
                data: null,
                status: response.status
            }
        }
    } else {
        return {
            data: null,
            status: response.status,
        }
    }
}

const apiFetchPut = async (endpoint, body) => {

    const headers = new Headers();
    headers.append("Content-Type", "application/json")
    headers.append("Accept", 'application/json')

    const response = await fetch(API + endpoint, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
    })

    if (response.status >= 200 && response.status <= 299) {
        const json = await response.json()
        if (json) {
            return {
                data: json,
                status: response.status
            }
        } else {
            return {
                data: null,
                status: response.status
            }
        }
    } else {
        return {
            data: null,
            status: response.status,
        }
    }
}

const apiFetchDelete = async (endpoint) => {

    const response = await fetch(`${API + endpoint}`, { method: 'DELETE' })
    if (response.status >= 200 && response.status <= 299) {
        return {
            status: response.status
        }
    } else {
        return {
            status: response.status,
        }
    }
}

export default {

    onSignIn: async (email, password) => {
        const data = { email: email, password: password }
        const request = await apiFetchPost('/login', data)
        return request
    },



}