import request from '@/utils/request'

export const login = (data) =>
    request.post('/api/user/login', data)

export const register = (data) =>
    request.post('/api/user/register', data)

export const updateProfile = (data) =>
    request.post('/api/user/profile/update', data)

export const logout = () =>
    request.post('/api/user/logout')

export const getUserInfo = () =>
    request.get('/api/user/info')