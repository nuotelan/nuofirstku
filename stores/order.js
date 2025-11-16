import { defineStore } from 'pinia'
import {
    createOrder,
    getOrderList,
    getMyOrders,
    getOrderDetail,
    updateOrder
} from '@/api/order'

export const useOrderStore = defineStore('order', {
    state: () => ({
        orders: [],
        currentOrder: null,
        total: 0
    }),

    getters: {
        orderList: (state) => state.orders,
        orderDetail: (state) => state.currentOrder
    },

    actions: {
        async fetchOrders(params = {}) {
            const res = await getOrderList(params)

            if (Array.isArray(res)) {
                this.orders = res
                this.total = res.length
            } else if (res.data) {
                this.orders = res.data
                this.total = res.data.length
            } else {
                this.orders = []
                this.total = 0
            }

            return res
        },

        async fetchMyOrders() {
            const res = await getMyOrders()

            if (Array.isArray(res)) {
                this.orders = res
                this.total = res.length
            } else if (res.data) {
                this.orders = res.data
                this.total = res.data.length
            }

            return res
        },

        async createOrder(orderData) {
            const res = await createOrder(orderData)

            if (res.status === 'success') {
                return res.data
            } else {
                throw new Error('创建订单失败')
            }
        },

        async getOrderDetail(orderId) {
            const res = await getOrderDetail(orderId)

            if (res.status === 'success') {
                this.currentOrder = res.data
                return res.data
            } else {
                throw new Error('获取订单详情失败')
            }
        },

        async updateOrder(orderId, data) {
            const res = await updateOrder(orderId, data)

            if (res.status === 'success') {
                return res.data
            } else {
                throw new Error('更新订单失败')
            }
        },

        clearCurrentOrder() {
            this.currentOrder = null
        }
    }
})