<template>
  <header class="header">
    <div class="topbar">
      <span>🎉 Up to 4 years Interest Free Credit — 0% APR, no deposit.</span>
      <a href="#">T&Cs apply →</a>
    </div>

    <nav class="nav">
      <div class="container nav-inner">
        <RouterLink to="/" class="logo">tapi<span>.</span></RouterLink>

        <div class="nav-links">
          <RouterLink v-for="cat in categories" :key="cat.id"
            :to="`/products/${cat.id}`" class="nav-link">
            {{ cat.name }}
          </RouterLink>
          <RouterLink to="/products" class="nav-link nav-link--offers">Offers</RouterLink>
          <RouterLink to="/ideas" class="nav-link">Ideas Hub</RouterLink>
        </div>

        <div class="nav-actions">
          <button class="icon-btn" @click="toggleSearch" title="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          <RouterLink to="/stores" class="icon-btn" title="Find a store">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </RouterLink>
          <RouterLink to="/cart" class="icon-btn cart-btn" title="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span v-if="cart.count > 0" class="cart-badge">{{ cart.count }}</span>
          </RouterLink>
        </div>
      </div>
    </nav>

    <div v-if="searchOpen" class="search-bar">
      <div class="container">
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          placeholder="Search for carpets, vinyl, laminate..."
          @keydown.enter="doSearch"
          @keydown.esc="toggleSearch"
        />
        <button class="btn-primary" @click="doSearch">Search</button>
        <button class="close-btn" @click="toggleSearch">✕</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { categories } from '../data/dummy.js'
import { cart } from '../stores/cart.js'

const router = useRouter()
const searchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

async function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    await nextTick()
    searchInput.value?.focus()
  }
}

function doSearch() {
  if (searchQuery.value.trim()) {
    router.push(`/products?q=${searchQuery.value}`)
    searchOpen.value = false
    searchQuery.value = ''
  }
}
</script>

<style scoped>
.header { position: sticky; top: 0; z-index: 100; background: var(--tapi-black); }

.topbar {
  background: var(--tapi-red);
  color: white;
  text-align: center;
  font-size: 12px;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.topbar a { color: white; font-weight: 500; text-decoration: underline; }

.nav { border-bottom: 1px solid rgba(255,255,255,0.08); }
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 24px;
}

.logo {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  color: white;
  letter-spacing: 1px;
  flex-shrink: 0;
}
.logo span { color: var(--tapi-red); }

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  justify-content: center;
}
.nav-link {
  color: rgba(255,255,255,0.75);
  font-size: 13px;
  font-weight: 400;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all var(--transition);
}
.nav-link:hover, .nav-link.router-link-active { color: white; background: rgba(255,255,255,0.08); }
.nav-link--offers { color: #ffd0d6; }

.nav-actions { display: flex; align-items: center; gap: 8px; }
.icon-btn {
  background: none;
  color: rgba(255,255,255,0.75);
  width: 36px; height: 36px;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  transition: all var(--transition);
  position: relative;
}
.icon-btn:hover { color: white; background: rgba(255,255,255,0.1); }

.cart-badge {
  position: absolute;
  top: 2px; right: 2px;
  background: var(--tapi-red);
  color: white;
  font-size: 9px;
  font-weight: 700;
  width: 16px; height: 16px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}

.search-bar {
  background: white;
  padding: 14px 0;
  border-bottom: 1px solid var(--tapi-border);
  animation: slideDown 0.2s ease;
}
.search-bar .container {
  display: flex; align-items: center; gap: 10px;
}
.search-bar input {
  flex: 1;
  border: 1.5px solid var(--tapi-border);
  border-radius: var(--radius);
  padding: 10px 16px;
  font-size: 15px;
  font-family: var(--font-body);
  outline: none;
  transition: border-color var(--transition);
}
.search-bar input:focus { border-color: var(--tapi-red); }
.close-btn {
  background: none;
  color: var(--tapi-muted);
  font-size: 16px;
  padding: 8px;
  border-radius: 6px;
  transition: color var(--transition);
}
.close-btn:hover { color: var(--tapi-text); }

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
