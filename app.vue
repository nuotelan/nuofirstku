<template>
  <div id="app">
    <AppHeader v-if="showHeader" />

    <main class="main-content">
      <router-view />
    </main>

    <AppFooter v-if="showFooter" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const route = useRoute()

const showHeader = computed(() => {
  return !['Login', 'Register'].includes(route.name)
})

const showFooter = computed(() => {
  return !['Login', 'Register', 'Chat'].includes(route.name)
})
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  background: var(--background-color-base);
}
</style>