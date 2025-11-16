<template>
  <div class="product-list-container">
    <div class="container">
      <!-- 搜索筛选 -->
      <div class="search-filter">
        <div class="filter-row">
          <el-input
              v-model="searchParams.keyword"
              placeholder="搜索商品..."
              style="width: 300px"
              @keyup.enter="handleSearch"
              clearable
          >
            <template #append>
              <el-button @click="handleSearch">
                <el-icon><Search /></el-icon>
              </el-button>
            </template>
          </el-input>

          <el-select v-model="searchParams.category" placeholder="全部分类" clearable>
            <el-option
                v-for="cat in categories"
                :key="cat.id"
                :label="cat.name"
                :value="cat.id"
            />
          </el-select>

          <el-select v-model="searchParams.sortBy" placeholder="排序方式">
            <el-option label="最新发布" value="publish_time" />
            <el-option label="价格从低到高" value="price_asc" />
            <el-option label="价格从高到低" value="price_desc" />
            <el-option label="最多浏览" value="view_count" />
          </el-select>

          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </div>

      <!-- 商品网格 -->
      <div class="product-grid" v-loading="loading">
        <template v-if="products.length > 0">
          <ProductCard
              v-for="product in products"
              :key="product.itemid"
              :product="product"
              @click="handleProductClick(product.itemid)"
          />
        </template>
        <div v-else class="empty-state">
          <el-empty description="暂无商品" />
        </div>
      </div>

      <!-- 分页 -->
      <div class="pagination-container" v-if="total > 0">
        <el-pagination
            :current-page="searchParams.page + 1"
            :page-size="searchParams.pageSize"
            :total="total"
            :page-sizes="[20, 40, 60, 80]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import ProductCard from '@/components/product/ProductCard.vue'

const productStore = useProductStore()
const router = useRouter()

const loading = ref(false)
const categories = ref([])
const products = ref([])
const total = ref(0)

const searchParams = reactive({
  keyword: '',
  category: '',
  sortBy: 'publish_time',
  page: 0,
  pageSize: 20
})

onMounted(async () => {
  await loadCategories()
  await handleSearch()
})

const loadCategories = async () => {
  try {
    await productStore.fetchCategories()
    categories.value = productStore.categories
  } catch (error) {
    console.error('加载分类失败:', error)
  }
}

const handleSearch = async () => {
  try {
    loading.value = true
    await productStore.fetchProducts(searchParams)
    products.value = productStore.products
    total.value = productStore.total
  } catch (error) {
    ElMessage.error('搜索商品失败')
    products.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

const handleReset = () => {
  Object.assign(searchParams, {
    keyword: '',
    category: '',
    sortBy: 'publish_time',
    page: 0,
    pageSize: 20
  })
  handleSearch()
}

const handlePageChange = (page) => {
  searchParams.page = page - 1
  handleSearch()
}

const handleSizeChange = (size) => {
  searchParams.pageSize = size
  searchParams.page = 0
  handleSearch()
}

const handleProductClick = (productId) => {
  router.push(`/product/${productId}`)
}

watch(
    () => router.currentRoute.value.query,
    (query) => {
      if (query.category) {
        searchParams.category = query.category
      }
      handleSearch()
    },
    { immediate: true }
)
</script>

<style scoped>
.product-list-container {
  min-height: 100vh;
  padding: 20px 0;
  background: var(--background-color-base);
}

.search-filter {
  background: white;
  padding: 20px;
  border-radius: var(--border-radius-base);
  box-shadow: var(--box-shadow-base);
  margin-bottom: 20px;
}

.filter-row {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: flex-end;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  min-height: 400px;
}

.empty-state {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-row .el-input,
  .filter-row .el-select {
    width: 100% !important;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>