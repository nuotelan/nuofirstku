import { defineStore } from 'pinia'
import {
    getChatList,
    getChatHistory,
    sendMessage,
    getUnreadCount
} from '@/api/chat'

export const useChatStore = defineStore('chat', {
    state: () => ({
        chatList: [],
        currentChat: null,
        messages: [],
        unreadCount: 0,
        pagination: {
            page: 1,
            pageSize: 50,
            hasMore: true
        }
    }),

    getters: {
        chatSessions: (state) => state.chatList,
        currentMessages: (state) => state.messages
    },

    actions: {
        async fetchChatList() {
            const res = await getChatList()
            this.chatList = res.data
            return res
        },

        async fetchHistory(senderId, receiverId, page = 1, pageSize = 50) {
            const res = await getChatHistory(senderId, receiverId, page, pageSize)

            if (page === 1) {
                this.messages = res.data.messages
            } else {
                this.messages = [...res.data.messages, ...this.messages]
            }

            this.pagination.hasMore = res.data.messages.length === pageSize
            this.pagination.page = page

            return res.data
        },

        async sendMessage(message) {
            const res = await sendMessage(message)
            return res
        },

        addMessage(message) {
            this.messages.push(message)
        },

        async fetchUnreadCount() {
            const res = await getUnreadCount()
            this.unreadCount = res.data.count
            return res
        },

        clearMessages() {
            this.messages = []
        },

        setCurrentChat(chat) {
            this.currentChat = chat
        }
    }
})