<template>
  <header class="header">
    <div class="topbar">
      <span class="topbar-text">Supply & fitting available — Specialists in carpet, laminate, LVT & vinyl.</span>
      <a href="#">T&Cs apply →</a>
    </div>

    <nav class="nav">
      <div class="container nav-inner">
        <RouterLink to="/" class="logo" @click="closeMenu">
          <span class="logo-az">AZ</span>
          <span class="logo-name">Carpet's & Flooring</span>
        </RouterLink>

        <div class="nav-links" :class="{ open: menuOpen }">
          <RouterLink v-for="cat in categories" :key="cat.id"
            :to="`/products/${cat.id}`" class="nav-link" @click="closeMenu">
            {{ cat.name }}
          </RouterLink>
          <RouterLink to="/products" class="nav-link nav-link--offers" @click="closeMenu">Offers</RouterLink>
          <RouterLink to="/ideas" class="nav-link" @click="closeMenu">Ideas Hub</RouterLink>
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
          <button class="icon-btn menu-toggle" @click="toggleMenu" :aria-expanded="menuOpen" aria-label="Toggle menu">
            <svg v-if="!menuOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </nav>

    <div v-if="menuOpen" class="menu-backdrop" @click="closeMenu"></div>

    <div v-if="searchOpen" class="search-bar">
      <div class="container search-inner">
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
import { ref, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { categories } from '../data/dummy.js'
import { cart } from '../stores/cart.js'

const router = useRouter()
const searchOpen = ref(false)
const menuOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) searchOpen.value = false
}

function closeMenu() {
  menuOpen.value = false
}

async function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    menuOpen.value = false
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

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<style scoped>
.header { position: sticky; top: 0; z-index: 100; background: var(--tapi-black); }

.topbar {
  background: var(--tapi-red);
  color: white;
  text-align: center;
  font-size: 11px;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
.topbar a { color: white; font-weight: 500; text-decoration: underline; white-space: nowrap; }
.topbar-text { line-height: 1.4; }

@media (min-width: 768px) {
  .topbar { font-size: 12px; padding: 8px 24px; gap: 12px; }
}

.nav { border-bottom: 1px solid rgba(255,255,255,0.08); }
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  gap: 12px;
}

@media (min-width: 768px) {
  .nav-inner { height: 64px; gap: 24px; }
}

.logo {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-shrink: 1;
  min-width: 0;
  line-height: 1.1;
}
.logo-az {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  color: var(--tapi-red);
  letter-spacing: 1px;
  flex-shrink: 0;
}
.logo-name {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 480px) {
  .logo-name { font-size: 15px; }
}

@media (min-width: 768px) {
  .logo-az { font-size: 30px; }
  .logo-name { font-size: 17px; }
}

/* Mobile nav drawer */
.nav-links {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: min(300px, 85vw);
  height: 100vh;
  height: 100dvh;
  background: var(--tapi-black);
  flex-direction: column;
  align-items: stretch;
  padding: 80px 24px 32px;
  gap: 4px;
  z-index: 200;
  overflow-y: auto;
  box-shadow: -8px 0 32px rgba(0,0,0,0.3);
}
.nav-links.open { display: flex; }

.menu-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 150;
}

.menu-toggle { display: flex; }

@media (min-width: 1024px) {
  .menu-toggle { display: none; }
  .menu-backdrop { display: none; }

  .nav-links {
    display: flex;
    position: static;
    width: auto;
    height: auto;
    background: transparent;
    flex-direction: row;
    align-items: center;
    padding: 0;
    gap: 4px;
    flex: 1;
    justify-content: center;
    box-shadow: none;
    overflow: visible;
  }
}

.nav-link {
  color: rgba(255,255,255,0.75);
  font-size: 15px;
  font-weight: 400;
  padding: 12px 10px;
  border-radius: 6px;
  transition: all var(--transition);
}
.nav-link:hover, .nav-link.router-link-active { color: white; background: rgba(255,255,255,0.08); }
.nav-link--offers { color: #e8d48a; }

@media (min-width: 1024px) {
  .nav-link { font-size: 13px; padding: 6px 10px; }
}

.nav-actions { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }

@media (min-width: 768px) {
  .nav-actions { gap: 8px; }
}

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
  padding: 12px 0;
  border-bottom: 1px solid var(--tapi-border);
  animation: slideDown 0.2s ease;
}
.search-inner {
  display: flex; align-items: center; gap: 8px;
}
.search-inner input {
  flex: 1;
  min-width: 0;
  border: 1.5px solid var(--tapi-border);
  border-radius: var(--radius);
  padding: 10px 14px;
  font-size: 14px;
  font-family: var(--font-body);
  outline: none;
  transition: border-color var(--transition);
}
.search-inner input:focus { border-color: var(--tapi-red); }

@media (min-width: 768px) {
  .search-bar { padding: 14px 0; }
  .search-inner { gap: 10px; }
  .search-inner input { padding: 10px 16px; font-size: 15px; }
}

.close-btn {
  background: none;
  color: var(--tapi-muted);
  font-size: 16px;
  padding: 8px;
  border-radius: 6px;
  transition: color var(--transition);
  flex-shrink: 0;
}
.close-btn:hover { color: var(--tapi-text); }

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
