<template>
  <div id="app">
    <AppHeader />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style>
#app { min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1; }
</style>
