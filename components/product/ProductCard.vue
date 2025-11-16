<template>
  <div class="product-card" @click="handleClick">
    <div class="product-image-container">
      <el-image
          :src="product.imageUrls && product.imageUrls[0] ? product.imageUrls[0] : '/placeholder.jpg'"
          fit="cover"
          class="product-image"
          :preview-src-list="product.imageUrls || []"
          lazy
      >
        <template #error>
          <div class="image-error">
            <el-icon><Picture /></el-icon>
            <span>图片加载失败</span>
          </div>
        </template>
        <template #placeholder>
          <div class="image-loading">
            <el-icon class="loading-icon"><Loading /></el-icon>
          </div>
        </template>
      </el-image>
      <div class="product-status" v-if="product.status !== 'AVAILABLE'">
        <el-tag v-if="product.status === 'SOLD'" type="danger" size="small">已售出</el-tag>
        <el-tag v-else type="info" size="small">已下架</el-tag>
      </div>
    </div>

    <div class="product-info">
      <h3 class="product-title">{{ product.title }}</h3>
      <div class="product-price">¥{{ product.price }}</div>
      <div class="product-meta">
        <span class="publish-time">{{ formatTime(product.publishTime) }}</span>
        <span class="view-count">
          <el-icon><View /></el-icon>
          {{ product.viewCount || 0 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Picture, View, Loading } from '@element-plus/icons-vue'
import dayjs from 'dayjs'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click', props.product.itemid || props.product.itemId)
}

const formatTime = (time) => {
  if (!time) return ''
  return dayjs(time).format('MM-DD HH:mm')
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.product-image-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);
  background: var(--background-color-base);
}

.image-error .el-icon {
  font-size: 40px;
  margin-bottom: 8px;
}

.image-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: var(--background-color-base);
}

.loading-icon {
  font-size: 24px;
  color: var(--text-secondary);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.product-status {
  position: absolute;
  top: 10px;
  right: 10px;
}

.product-info {
  padding: 16px;
}

.product-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 44px;
}

.product-price {
  color: #ff4757;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
  font-size: 12px;
}

.publish-time {
  color: var(--text-secondary);
}

.view-count {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>