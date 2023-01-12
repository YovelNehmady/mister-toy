import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'userDB'
const BASE_URL = 'user/'

export const userService = {
    login,
    logout,
    signup,
    getById,
}

window.us = userService

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

async function login(credentials) {
    try {
        return await httpService.post(BASE_URL + 'login', credentials)

    } catch (err) {
        console.log('err:', err)
        throw new Error('Invalid login')
    }
}

async function signup({ username, password, fullname }) {
    try {
        const user = { username, password, fullname, score: 10000 }
        return await httpService.post(BASE_URL + 'signup', user)
    } catch (err) {
        console.log('err:', err)
        throw new Error('Invalid login')
    }
}

function logout() {
    return httpService.post(BASE_URL + 'logout')
}