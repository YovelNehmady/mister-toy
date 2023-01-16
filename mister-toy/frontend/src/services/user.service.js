import { httpService } from './http.service.js'

const BASE_URL = 'auth/'

export const userService = {
    login,
    logout,
    signup,
    getEmptyCredentials,
}

window.us = userService

async function login(credentials) {
    try {
        return await httpService.post(BASE_URL + 'login', credentials)
    } catch (err) {
        console.log('err:', err)
        throw new Error('Invalid login')
    }
}

async function signup({ username, password, fullname, isAdmin }) {
    try {
        const user = { username, password, fullname, isAdmin }
        return await httpService.post(BASE_URL + 'signup', user)
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