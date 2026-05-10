<template>
  <RouterLink :to="`/product/${product.id}`" class="product-card">
    <div class="card-image" :style="{ background: product.color }">
      <div class="floor-preview">
        <div v-for="n in 24" :key="n" class="tile"
          :style="{ background: tileColor(n, product.color) }"></div>
      </div>
      <div v-if="product.badge" class="badge" :class="badgeClass(product.badge)">{{ product.badge }}</div>
      <button class="wishlist-btn" @click.prevent="toggleWishlist" :class="{ active: wishlisted }">
        <svg width="16" height="16" viewBox="0 0 24 24" :fill="wishlisted ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>

    <div class="card-body">
      <div class="color-swatches">
        <div v-for="(c, i) in product.colors.slice(0, 4)" :key="i"
          class="swatch" :style="{ background: c }"></div>
        <span v-if="product.colors.length > 4" class="swatch-more">+{{ product.colors.length - 4 }}</span>
      </div>
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-cat">{{ categoryLabel }}</p>
      <div class="card-footer">
        <div class="price">
          <span class="price-amount">£{{ product.price.toFixed(2) }}</span>
          <span class="price-unit">/ {{ product.unit }}</span>
        </div>
        <div class="rating">
          <span class="stars">★</span>
          <span>{{ product.rating }} ({{ product.reviews }})</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { ref, computed } from 'vue'
import { categories } from '../data/dummy.js'

const props = defineProps({ product: Object })
const wishlisted = ref(false)

const categoryLabel = computed(() =>
  categories.find(c => c.id === props.product.category)?.name || ''
)

function toggleWishlist(e) {
  wishlisted.value = !wishlisted.value
}

function tileColor(n, base) {
  const variants = [base, lighten(base, 20), darken(base, 15)]
  return variants[n % 3]
}

function lighten(hex, amt) {
  const num = parseInt(hex.slice(1), 16)
  const r = Math.min(255, (num >> 16) + amt)
  const g = Math.min(255, ((num >> 8) & 0xff) + amt)
  const b = Math.min(255, (num & 0xff) + amt)
  return `rgb(${r},${g},${b})`
}

function darken(hex, amt) {
  const num = parseInt(hex.slice(1), 16)
  const r = Math.max(0, (num >> 16) - amt)
  const g = Math.max(0, ((num >> 8) & 0xff) - amt)
  const b = Math.max(0, (num & 0xff) - amt)
  return `rgb(${r},${g},${b})`
}

function badgeClass(badge) {
  if (badge === 'Sale') return 'badge--sale'
  if (badge === 'New') return 'badge--new'
  if (badge === 'Premium') return 'badge--premium'
  return 'badge--default'
}
</script>

<style scoped>
.product-card {
  display: block;
  background: white;
  border: 1px solid var(--tapi-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition);
  text-decoration: none;
  color: inherit;
}
.product-card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transform: translateY(-3px);
  border-color: transparent;
}

.card-image {
  height: 200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.floor-preview {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2px;
  width: 90%;
  height: 80%;
  border-radius: 4px;
  overflow: hidden;
}
.tile { border-radius: 1px; }

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 100px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.badge--default { background: rgba(0,0,0,0.6); color: white; }
.badge--sale { background: var(--tapi-red); color: white; }
.badge--new { background: #1a7a4a; color: white; }
.badge--premium { background: #7a5a1a; color: white; }

.wishlist-btn {
  position: absolute;
  top: 10px; right: 10px;
  background: white;
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--tapi-muted);
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  transition: all var(--transition);
  opacity: 0;
}
.product-card:hover .wishlist-btn { opacity: 1; }
.wishlist-btn.active { color: var(--tapi-red); opacity: 1; }
.wishlist-btn:hover { transform: scale(1.1); }

.card-body { padding: 16px; }

.color-swatches {
  display: flex; align-items: center; gap: 4px;
  margin-bottom: 10px;
}
.swatch {
  width: 16px; height: 16px;
  border-radius: 50%;
  border: 1.5px solid white;
  outline: 1px solid var(--tapi-border);
}
.swatch-more {
  font-size: 10px;
  color: var(--tapi-muted);
  margin-left: 2px;
}

.product-name { font-size: 15px; font-weight: 500; margin-bottom: 2px; }
.product-cat { font-size: 12px; color: var(--tapi-muted); margin-bottom: 12px; }

.card-footer { display: flex; justify-content: space-between; align-items: flex-end; }
.price-amount { font-size: 18px; font-weight: 600; color: var(--tapi-black); }
.price-unit { font-size: 12px; color: var(--tapi-muted); }
.rating { font-size: 12px; color: var(--tapi-muted); display: flex; align-items: center; gap: 3px; }
.stars { color: #f5a623; font-size: 13px; }
</style>
