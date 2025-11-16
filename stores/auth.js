import { defineStore } from 'pinia'
import { login, register, updateProfile, logout, getUserInfo } from '@/api/auth'
import { auth } from '@/utils/auth'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: auth.getUser(),
        token: auth.getToken(),
        isLoggedIn: auth.isLoggedIn()
    }),

    getters: {
        userInfo: (state) => state.user,
        isAuthenticated: (state) => state.isLoggedIn
    },

    actions: {
        async login(credentials) {
            try {
                const res = await login(credentials)

                // 根据后端响应格式调整
                if (res.status === 'success') {
                    this.token = res.data.token
                    this.user = res.data.userInfo
                } else {
                    // 其他格式的响应
                    this.token = res.token
                    this.user = res.userInfo
                }

                this.isLoggedIn = true

                // 保存到本地存储
                auth.setToken(this.token)
                auth.setUser(this.user)

                return res
            } catch (error) {
                this.logout()
                throw error
            }
        },

        async register(userInfo) {
            const res = await register(userInfo)
            if (res.status === 'success') {
                return res
            } else {
                throw new Error(res.msg || '注册失败')
            }
        },

        async updateProfile(profile) {
            const res = await updateProfile(profile)
            if (res.status === 'success') {
                Object.assign(this.user, profile)
                auth.setUser(this.user)
            }
            return res
        },

        async fetchUserInfo() {
            try {
                const res = await getUserInfo()
                this.user = res.data
                auth.setUser(this.user)
                return res
            } catch (error) {
                this.logout()
                throw error
            }
        },

        logout() {
            logout().catch(() => {
                // 静默处理登出错误
            })

            this.token = null
            this.user = null
            this.isLoggedIn = false

            auth.removeToken()
            auth.removeUser()
        }
    }
})