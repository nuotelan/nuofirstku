import request from '@/utils/request'

// 创建订单
export const createOrder = (data) =>
    request.post('/api/order/add', data)

// 获取订单列表
export const getOrderList = (params = {}) =>
    request.get('/api/order', { params })

// 获取当前用户订单
export const getMyOrders = () =>
    request.get('/api/order/my')

// 获取订单详情
export const getOrderDetail = (id) =>
    request.get(`/api/order/${id}`)

// 更新订单
export const updateOrder = (id, data) =>
    request.put(`/api/order/${id}`, data)