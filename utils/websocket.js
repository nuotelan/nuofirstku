import { io } from 'socket.io-client'
import { useAuthStore } from '@/stores/auth'

class WebSocketManager {
    constructor() {
        this.socket = null
        this.reconnectAttempts = 0
        this.maxReconnectAttempts = 5
        this.reconnectTimeout = null
    }

    connect(userId) {
        if (this.socket) {
            this.disconnect()
        }

        this.socket = io(import.meta.env.VITE_WS_URL, {
            path: '/chat',
            query: { userId },
            transports: ['websocket']
        })

        this.socket.on('connect', () => {
            console.log('WebSocket connected')
            this.reconnectAttempts = 0
        })

        this.socket.on('disconnect', (reason) => {
            console.log('WebSocket disconnected:', reason)
            if (reason === 'io server disconnect') {
                this.socket.connect()
            } else {
                this.handleReconnect()
            }
        })

        this.socket.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error)
            this.handleReconnect()
        })

        this.socket.on('error', (error) => {
            console.error('WebSocket error:', error)
        })

        return this.socket
    }

    handleReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++
            const delay = 3000 * this.reconnectAttempts

            console.log(`尝试重新连接... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)

            this.reconnectTimeout = setTimeout(() => {
                const authStore = useAuthStore()
                if (authStore.user) {
                    this.connect(authStore.user.userId)
                }
            }, delay)
        } else {
            console.error('WebSocket 重连失败，已达到最大重连次数')
        }
    }

    sendMessage(message) {
        if (this.socket?.connected) {
            this.socket.emit('message', message)
        } else {
            console.error('WebSocket not connected')
            throw new Error('连接已断开，请刷新页面重试')
        }
    }

    on(event, callback) {
        if (this.socket) {
            this.socket.on(event, callback)
        }
    }

    off(event, callback) {
        if (this.socket) {
            this.socket.off(event, callback)
        }
    }

    disconnect() {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout)
        }

        if (this.socket) {
            this.socket.disconnect()
            this.socket = null
        }
    }
}

export const websocketManager = new WebSocketManager()