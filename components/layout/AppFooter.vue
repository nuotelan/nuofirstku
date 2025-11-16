<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>校园二手交易平台</h3>
          <p>让闲置物品找到新主人，让校园生活更绿色</p>
        </div>

        <div class="footer-section">
          <h4>快速链接</h4>
          <router-link to="/">首页</router-link>
          <router-link to="/products">商品浏览</router-link>
          <router-link to="/product/publish">发布商品</router-link>
        </div>

        <div class="footer-section">
          <h4>帮助中心</h4>
          <a>交易指南</a>
          <a>常见问题</a>
          <a>联系我们</a>
        </div>

        <div class="footer-section">
          <h4>关注我们</h4>
          <div class="social-links">
            <a>微信</a>
            <a>QQ群</a>
            <a>微博</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 校园二手交易平台. 保留所有权利.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.app-footer {
  background: #2c3e50;
  color: white;
  padding: 40px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 30px;
}

.footer-section h3 {
  color: var(--primary-color);
  margin-bottom: 15px;
  font-size: 20px;
}

.footer-section h4 {
  margin-bottom: 15px;
  font-size: 16px;
}

.footer-section p {
  color: #bdc3c7;
  line-height: 1.6;
}

.footer-section a {
  display: block;
  color: #bdc3c7;
  margin-bottom: 8px;
  transition: color 0.3s;
  cursor: pointer;
}

.footer-section a:hover {
  color: var(--primary-color);
}

.social-links {
  display: flex;
  gap: 15px;
}

.footer-bottom {
  border-top: 1px solid #34495e;
  padding-top: 20px;
  text-align: center;
  color: #bdc3c7;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>