import request from '@/utils/request'

export const getChatList = () =>
    request.get('/api/chat/list')

export const getChatHistory = (senderId, receiverId, page, pageSize) =>
    request.get('/api/chat/history', {
        params: { senderId, receiverId, page, pageSize }
    })

export const sendMessage = (data) =>
    request.post('/api/chat/send', data)

export const getUnreadCount = () =>
    request.get('/api/chat/unread-count')