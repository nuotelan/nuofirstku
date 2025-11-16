import request from '@/utils/request'

// 获取商品列表
export const getProductList = (params) =>
    request.get('/api/product/list', { params })

// 获取商品详情
export const getProductDetail = (id) =>
    request.get(`/api/product/search/${id}`)

// 添加商品
export const addProduct = (data) => {
    const formData = new FormData()

    // 添加商品信息
    const productData = {
        title: data.title,
        description: data.description,
        price: data.price,
        categoryid: data.category
    }
    formData.append('Product', JSON.stringify(productData))

    // 添加图片文件
    data.images.forEach((file, index) => {
        formData.append('File', file)
    })

    return request.post('/api/product/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

// 更新商品
export const updateProduct = (id, data) =>
    request.post('/api/product/update', { itemid: id, ...data })

// 删除商品
export const deleteProduct = (id) =>
    request.post('/api/product/delete', { itemid: id })

// 获取分类列表（模拟数据）
export const getCategories = () =>
    Promise.resolve({
        data: [
            { id: '1', name: '电子产品' },
            { id: '2', name: '图书资料' },
            { id: '3', name: '生活用品' },
            { id: '4', name: '服装鞋帽' },
            { id: '5', name: '运动户外' },
            { id: '6', name: '其他' }
        ]
    })