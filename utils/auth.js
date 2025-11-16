import { storage } from './storage'

export const auth = {
    getToken() {
        return storage.get('token')
    },

    setToken(token) {
        storage.set('token', token)
    },

    removeToken() {
        storage.remove('token')
    },

    getUser() {
        return storage.get('user')
    },

    setUser(user) {
        storage.set('user', user)
    },

    removeUser() {
        storage.remove('user')
    },

    isLoggedIn() {
        return !!this.getToken()
    },

    logout() {
        this.removeToken()
        this.removeUser()
        window.location.href = '/login'
    }
}