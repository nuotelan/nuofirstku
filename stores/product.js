import { defineStore } from 'pinia'
import {
    addProduct,
    getProductList,
    getProductDetail,
    updateProduct,
    deleteProduct,
    getCategories
} from '@/api/product'

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
        currentProduct: null,
        categories: [],
        total: 0,
        searchParams: {
            keyword: '',
            category: '',
            sortBy: 'publish_time',
            page: 0,
            pageSize: 20
        }
    }),

    getters: {
        productList: (state) => state.products,
        productDetail: (state) => state.currentProduct,
        categoryList: (state) => state.categories
    },

    actions: {
        async fetchProducts(params = null) {
            if (params) {
                this.searchParams = { ...this.searchParams, ...params }
            }

            const res = await getProductList(this.searchParams)

            // 适配不同的响应格式
            if (res.result) {
                this.products = res.result.content || []
                this.total = res.result.totalElements || 0
            } else if (res.items) {
                this.products = res.items
                this.total = res.total || 0
            } else {
                this.products = []
                this.total = 0
            }

            return res
        },

        async fetchProductDetail(id) {
            const res = await getProductDetail(id)

            if (res.status === 'success') {
                this.currentProduct = res.product
            } else {
                throw new Error(res.msg || '获取商品详情失败')
            }

            return res
        },

        async addProduct(productData) {
            const res = await addProduct(productData)

            if (res.status === 'success') {
                return res
            } else {
                throw new Error(res.msg || '发布商品失败')
            }
        },

        async updateProduct(id, data) {
            const res = await updateProduct(id, data)

            if (res.msg && res.msg.includes('成功')) {
                if (this.currentProduct?.itemid === id) {
                    Object.assign(this.currentProduct, data)
                }
                return res
            } else {
                throw new Error(res.msg || '更新商品失败')
            }
        },

        async deleteProduct(id) {
            const res = await deleteProduct(id)

            if (res.status === 'success') {
                await this.fetchProducts()
                return res
            } else {
                throw new Error(res.msg || '删除商品失败')
            }
        },

        async fetchCategories() {
            try {
                const res = await getCategories()
                this.categories = res.data
            } catch (error) {
                console.error('获取分类失败:', error)
                this.categories = [
                    { id: '1', name: '电子产品' },
                    { id: '2', name: '图书资料' },
                    { id: '3', name: '生活用品' },
                    { id: '4', name: '服装鞋帽' },
                    { id: '5', name: '运动户外' },
                    { id: '6', name: '其他' }
                ]
            }
        },

        clearCurrentProduct() {
            this.currentProduct = null
        }
    }
})