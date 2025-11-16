<template>
  <div class="home-container">
    <!-- 顶部横幅 -->
    <div class="banner">
      <div class="banner-content">
        <h1>校园二手交易平台</h1>
        <p>让闲置物品找到新主人，让校园生活更绿色</p>
        <el-button type="primary" size="large" @click="goToPublish">
          <el-icon><Plus /></el-icon>
          发布商品
        </el-button>
      </div>
    </div>

    <!-- 热门分类 -->
    <div class="section">
      <div class="section-header">
        <h2>热门分类</h2>
        <router-link to="/products">查看全部</router-link>
      </div>
      <div class="categories">
        <div
            v-for="category in categories"
            :key="category.id"
            class="category-item"
            @click="handleCategoryClick(category.id)"
        >
          <div class="category-icon">
            <el-icon :size="32"><component :is="category.icon" /></el-icon>
          </div>
          <span class="category-name">{{ category.name }}</span>
        </div>
      </div>
    </div>

    <!-- 推荐商品 -->
    <div class="section">
      <div class="section-header">
        <h2>推荐商品</h2>
        <router-link to="/products">更多推荐</router-link>
      </div>
      <div class="product-grid">
        <ProductCard
            v-for="product in recommendedProducts"
            :key="product.itemid"
            :product="product"
            @click="handleProductClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { ElMessage } from 'element-plus'
import {
  Plus,
  Iphone,
  Reading,
  Box,
  TShirt,
  Basketball,
  More
} from '@element-plus/icons-vue'
import ProductCard from '@/components/product/ProductCard.vue'

const router = useRouter()
const productStore = useProductStore()

const categories = ref([
  { id: '1', name: '电子产品', icon: 'Iphone' },
  { id: '2', name: '图书资料', icon: 'Reading' },
  { id: '3', name: '生活用品', icon: 'Box' },
  { id: '4', name: '服装鞋帽', icon: 'TShirt' },
  { id: '5', name: '运动户外', icon: 'Basketball' },
  { id: '6', name: '其他', icon: 'More' }
])

const recommendedProducts = ref([])

onMounted(async () => {
  try {
    await loadRecommendedProducts()
  } catch (error) {
    ElMessage.error('加载推荐商品失败')
  }
})

const loadRecommendedProducts = async () => {
  const res = await productStore.fetchProducts({
    page: 0,
    pageSize: 8,
    sortBy: 'view_count'
  })
  recommendedProducts.value = productStore.products
}

const goToPublish = () => {
  router.push('/product/publish')
}

const handleCategoryClick = (categoryId) => {
  router.push(`/products?category=${categoryId}`)
}

const handleProductClick = (productId) => {
  router.push(`/product/${productId}`)
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
}

.banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.banner-content h1 {
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 700;
}

.banner-content p {
  font-size: 18px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.section {
  padding: 60px 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-header h2 {
  font-size: 28px;
  color: var(--text-primary);
}

.section-header a {
  color: var(--primary-color);
  font-size: 16px;
}

.categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: var(--border-radius-base);
  box-shadow: var(--box-shadow-base);
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow-light);
}

.category-icon {
  margin-bottom: 10px;
  color: var(--primary-color);
}

.category-name {
  font-size: 14px;
  font-weight: 500;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .banner-content h1 {
    font-size: 36px;
  }

  .categories {
    grid-template-columns: repeat(3, 1fr);
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .categories {
    grid-template-columns: repeat(2, 1fr);
  }

  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>