<template>
  <div class="container">
    <div class="publish-header">
      <h1>发布商品</h1>
      <p>填写商品信息，让更多同学看到你的宝贝</p>
    </div>

    <div class="publish-form-container">
      <el-form :model="form" :rules="rules" ref="productForm" label-width="100px">
        <el-form-item label="商品标题" prop="title">
          <el-input
              v-model="form.title"
              maxlength="100"
              show-word-limit
              placeholder="请输入商品标题，如：九成新笔记本电脑"
          />
        </el-form-item>

        <el-form-item label="商品描述" prop="description">
          <el-input
              v-model="form.description"
              type="textarea"
              :rows="4"
              placeholder="详细描述商品的状况、规格、使用情况等"
          />
        </el-form-item>

        <el-form-item label="价格" prop="price">
          <el-input-number
              v-model="form.price"
              :min="0"
              :precision="2"
              :controls="false"
              placeholder="0.00"
              style="width: 200px;"
          />
          <span style="margin-left: 10px; color: var(--text-secondary);">元</span>
        </el-form-item>

        <el-form-item label="商品图片" prop="images">
          <BaseUpload v-model="form.images" :limit="5" />
          <div class="upload-tips">
            最多上传5张图片，第一张将作为主图展示
          </div>
        </el-form-item>

        <el-form-item label="商品分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择分类" style="width: 300px;">
            <el-option
                v-for="cat in categories"
                :key="cat.id"
                :label="cat.name"
                :value="cat.id"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <div class="form-actions">
        <el-button @click="$router.back()" size="large">取消</el-button>
        <el-button
            type="primary"
            @click="handlePublish"
            :loading="loading"
            size="large"
        >
          {{ loading ? '发布中...' : '发布商品' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { ElMessage } from 'element-plus'
import BaseUpload from '@/components/common/BaseUpload.vue'

const productStore = useProductStore()
const router = useRouter()
const productForm = ref()
const loading = ref(false)

const form = reactive({
  title: '',
  description: '',
  price: 0,
  images: [],
  category: ''
})

const rules = {
  title: [
    { required: true, message: '请输入商品标题', trigger: 'blur' },
    { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入商品描述', trigger: 'blur' }
  ],
  price: [
    { required: true, message: '请输入商品价格', trigger: 'blur' }
  ],
  images: [
    { required: true, message: '请上传商品图片', trigger: 'change' }
  ],
  category: [
    { required: true, message: '请选择商品分类', trigger: 'change' }
  ]
}

const categories = ref([])

onMounted(async () => {
  await productStore.fetchCategories()
  categories.value = productStore.categories
})

const handlePublish = async () => {
  try {
    await productForm.value.validate()
    loading.value = true

    const productData = {
      title: form.title,
      description: form.description,
      price: form.price,
      category: form.category,
      images: form.images
    }

    await productStore.addProduct(productData)
    ElMessage.success('商品发布成功')
    router.push('/products')
  } catch (error) {
    ElMessage.error(error.message || '发布失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.publish-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
}

.publish-header h1 {
  font-size: 28px;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.publish-header p {
  color: var(--text-secondary);
  font-size: 16px;
}

.publish-form-container {
  background: white;
  padding: 40px;
  border-radius: var(--border-radius-base);
  box-shadow: var(--box-shadow-base);
  max-width: 800px;
  margin: 0 auto;
}

.upload-tips {
  color: var(--text-secondary);
  font-size: var(--font-size-small);
  margin-top: 8px;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid var(--border-color-light);
}
</style>