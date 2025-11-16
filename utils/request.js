import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'

const request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000
})

let loading

request.interceptors.request.use(
    (config) => {
        if (config.loading !== false) {
            loading = ElLoading.service({
                lock: true,
                text: '加载中...',
                background: 'rgba(0, 0, 0, 0.7)'
            })
        }

        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        loading?.close()
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    (response) => {
        loading?.close()

        const data = response.data

        // 适配不同的响应格式
        if (data.status === 'success' || data.code === 200) {
            return data
        } else if (data.msg) {
            // 直接返回数据，不进行统一处理
            return data
        } else {
            // 其他格式的响应
            return data
        }
    },
    (error) => {
        loading?.close()

        if (error.response?.status === 401) {
            ElMessage.error('登录已过期，请重新登录')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        } else if (error.response?.status === 403) {
            ElMessage.error('没有权限访问')
        } else if (error.response?.status === 500) {
            ElMessage.error('服务器内部错误')
        } else if (error.code === 'ECONNABORTED') {
            ElMessage.error('请求超时')
        } else {
            ElMessage.error(error.message || '网络错误')
        }

        return Promise.reject(error)
    }
)

export default request