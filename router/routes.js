export const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页', requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/auth/Login.vue'),
        meta: { title: '登录' }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/auth/Register.vue'),
        meta: { title: '注册' }
    },
    {
        path: '/products',
        name: 'ProductList',
        component: () => import('@/views/product/List.vue'),
        meta: { title: '商品列表', requiresAuth: true }
    },
    {
        path: '/product/publish',
        name: 'ProductPublish',
        component: () => import('@/views/product/Publish.vue'),
        meta: { title: '发布商品', requiresAuth: true }
    },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: () => import('@/views/product/Detail.vue'),
        meta: { title: '商品详情', requiresAuth: true }
    },
    {
        path: '/chat/:userId',
        name: 'Chat',
        component: () => import('@/views/chat/ChatWindow.vue'),
        meta: { title: '聊天', requiresAuth: true }
    },
    {
        path: '/order/create/:itemId',
        name: 'OrderCreate',
        component: () => import('@/views/order/Create.vue'),
        meta: { title: '创建订单', requiresAuth: true }
    },
    {
        path: '/orders',
        name: 'OrderList',
        component: () => import('@/views/order/List.vue'),
        meta: { title: '我的订单', requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
        meta: { title: '页面未找到' }
    }
]