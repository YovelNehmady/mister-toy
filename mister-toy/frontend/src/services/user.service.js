import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'userDB'
const BASE_URL = 'user/'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getEmptyCredentials,
}

window.us = userService

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

async function login(credentials) {
    console.log(credentials)
    try {
        return await httpService.post('auth/login', credentials)
    } catch (err) {
        console.log('err:', err)
        throw new Error('Invalid login')
    }
}

async function signup({ username, password, fullname, isAdmin }) {
    try {
        const user = { username, password, fullname, isAdmin }
        return await httpService.post('auth/signup', user)
    } catch (err) {
        console.log('err:', err)
        throw new Error('Invalid login')
    }
}

function logout() {
    return httpService.post(BASE_URL + 'logout')
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}