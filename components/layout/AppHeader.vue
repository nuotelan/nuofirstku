<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <h1>校园二手交易</h1>
        </router-link>

        <nav class="nav-menu">
          <router-link to="/" class="nav-item">首页</router-link>
          <router-link to="/products" class="nav-item">商品</router-link>
          <router-link to="/orders" class="nav-item">订单</router-link>
        </nav>

        <div class="user-actions">
          <el-button
              type="primary"
              @click="goToPublish"
              class="publish-btn"
          >
            <el-icon><Plus /></el-icon>
            发布商品
          </el-button>

          <el-dropdown v-if="isLoggedIn" @command="handleCommand">
            <span class="user-info">
              <el-avatar :size="32" :src="user?.avatar" />
              <span class="username">{{ user?.username }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人资料</el-dropdown-item>
                <el-dropdown-item command="myProducts">我的商品</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <div v-else class="auth-buttons">
            <router-link to="/login">
              <el-button type="text">登录</el-button>
            </router-link>
            <router-link to="/register">
              <el-button type="primary">注册</el-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()
const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)
const user = computed(() => authStore.user)

const goToPublish = () => {
  if (!isLoggedIn.value) {
    ElMessage.warning('请先登录')
    router.push('/login')
    return
  }
  router.push('/product/publish')
}

const handleCommand = async (command) => {
  switch (command) {
    case 'profile':
      break
    case 'myProducts':
      router.push('/products?my=1')
      break
    case 'logout':
      try {
        await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
          type: 'warning'
        })
        authStore.logout()
        ElMessage.success('已退出登录')
        router.push('/login')
      } catch {
        // 用户取消
      }
      break
  }
}
</script>

<style scoped>
.app-header {
  background: white;
  box-shadow: var(--box-shadow-base);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
}

.logo h1 {
  color: var(--primary-color);
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.nav-menu {
  display: flex;
  gap: 30px;
}

.nav-item {
  color: var(--text-regular);
  font-weight: 500;
  padding: 8px 0;
  position: relative;
  transition: color 0.3s;
}

.nav-item:hover,
.nav-item.router-link-active {
  color: var(--primary-color);
}

.nav-item.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary-color);
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.publish-btn {
  display: flex;
  align-items: center;
  gap: 5px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 5px;
  border-radius: var(--border-radius-base);
  transition: background-color 0.3s;
}

.user-info:hover {
  background: var(--background-color-base);
}

.username {
  font-weight: 500;
  color: var(--text-primary);
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

@media (max-width: 768px) {
  .nav-menu {
    gap: 15px;
  }

  .username {
    display: none;
  }
}

@media (max-width: 480px) {
  .nav-menu {
    display: none;
  }

  .publish-btn span {
    display: none;
  }
}
</style>