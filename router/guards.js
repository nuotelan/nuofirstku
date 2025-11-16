import { ElMessage } from 'element-plus'
import { auth } from '@/utils/auth'

export function setupGuards(router) {
    router.beforeEach((to, from, next) => {
        const isLoggedIn = auth.isLoggedIn()

        if (to.meta.requiresAuth && !isLoggedIn) {
            ElMessage.warning('请先登录')
            next('/login')
            return
        }

        if (to.path === '/login' && isLoggedIn) {
            next('/')
            return
        }

        if (to.meta.requiresAdmin) {
            const user = auth.getUser()
            if (user.role !== 'ADMIN') {
                ElMessage.error('无权限访问')
                next('/')
                return
            }
        }

        next()
    })

    router.afterEach((to) => {
        document.title = to.meta.title ? `${to.meta.title} - 校园二手交易平台` : '校园二手交易平台'
        window.scrollTo(0, 0)
    })
}