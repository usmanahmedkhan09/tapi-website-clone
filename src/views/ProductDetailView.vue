<template>
  <div class="detail-page" v-if="product">
    <div class="container">
      <div class="breadcrumb">
        <RouterLink to="/">Home</RouterLink><span>/</span>
        <RouterLink :to="`/products/${product.category}`">{{ categoryLabel }}</RouterLink><span>/</span>
        <span>{{ product.name }}</span>
      </div>

      <div class="detail-layout">
        <!-- Image panel -->
        <div class="detail-image-panel">
          <div class="main-image" :style="{ background: selectedColor }">
            <div class="floor-preview-lg">
              <div v-for="n in 80" :key="n" class="tile-lg"
                :style="{ background: tileColor(n, selectedColor) }"></div>
            </div>
            <div v-if="product.badge" class="badge" :class="`badge--${product.badge.toLowerCase()}`">{{ product.badge }}</div>
          </div>
          <div class="thumb-row">
            <div v-for="(c, i) in product.colors" :key="i"
              class="thumb" :style="{ background: c }"
              :class="{ active: selectedColor === c }"
              @click="selectedColor = c"></div>
          </div>
        </div>

        <!-- Info panel -->
        <div class="detail-info">
          <p class="section-label">{{ categoryLabel }}</p>
          <h1 class="detail-title">{{ product.name }}</h1>

          <div class="rating-row">
            <span class="stars">{{ '★'.repeat(Math.round(product.rating)) }}</span>
            <span class="rating-text">{{ product.rating }} · {{ product.reviews }} reviews</span>
          </div>

          <div class="price-block">
            <span class="price-lg">£{{ product.price.toFixed(2) }}</span>
            <span class="price-unit">per m²</span>
            <span class="price-vat">inc. VAT</span>
          </div>

          <p class="detail-desc">{{ product.desc }}</p>

          <div class="color-select">
            <p class="color-label">Colour: <strong>{{ colorName(selectedColor) }}</strong></p>
            <div class="color-swatches">
              <button v-for="(c, i) in product.colors" :key="i"
                class="swatch-btn" :style="{ background: c }"
                :class="{ active: selectedColor === c }"
                @click="selectedColor = c"></button>
            </div>
          </div>

          <div class="qty-row">
            <label class="qty-label">Area (m²)</label>
            <div class="qty-input">
              <button @click="qty = Math.max(1, qty - 1)">−</button>
              <input type="number" v-model.number="qty" min="1" max="500" />
              <button @click="qty++">+</button>
            </div>
            <p class="qty-total">Total: <strong>£{{ (product.price * qty).toFixed(2) }}</strong></p>
          </div>

          <div class="cta-btns">
            <button class="btn-primary" @click="addToCart">Add to basket</button>
            <button class="btn-secondary" @click="orderSample">Order a free sample</button>
          </div>

          <div class="toast" v-if="toastVisible">✓ Added to basket!</div>

          <div class="detail-perks">
            <div class="perk"><span>📐</span> Free measuring & planning</div>
            <div class="perk"><span>🛡️</span> Wear guarantee included</div>
            <div class="perk"><span>🚚</span> Free delivery over £500</div>
            <div class="perk"><span>💳</span> 0% credit available</div>
          </div>
        </div>
      </div>

      <!-- Related products -->
      <div class="related">
        <h2 class="section-title">You might also like</h2>
        <div class="related-grid">
          <ProductCard v-for="p in relatedProducts" :key="p.id" :product="p" />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="not-found container">
    <h2>Product not found</h2>
    <RouterLink to="/products" class="btn-primary">Browse all products</RouterLink>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { products, categories } from '../data/dummy.js'
import { cart } from '../stores/cart.js'

const route = useRoute()
const qty = ref(1)
const toastVisible = ref(false)

const product = computed(() => products.find(p => p.id === Number(route.params.id)))
const selectedColor = ref('')

watch(product, (p) => {
  if (p) selectedColor.value = p.color
}, { immediate: true })

const categoryLabel = computed(() =>
  categories.find(c => c.id === product.value?.category)?.name || ''
)

const relatedProducts = computed(() =>
  products.filter(p => p.id !== product.value?.id && p.category === product.value?.category).slice(0, 4)
)

function addToCart() {
  cart.add(product.value, qty.value)
  toastVisible.value = true
  setTimeout(() => toastVisible.value = false, 2500)
}

function orderSample() {
  alert('Sample request submitted! We will dispatch it within 2–3 working days.')
}

function colorName(hex) {
  const names = { '#b09870': 'Warm Barley', '#9e9e8a': 'Sage Grey', '#d4c4a8': 'Cream Linen', '#c8a87a': 'Golden Oak', '#a0a098': 'Metro Stone', '#b89060': 'Amber Walnut', '#d4c09a': 'Nordic Birch', '#7a8a7a': 'Forest Velvet', '#9a7a5a': 'Rustic Barn', '#b0b8c0': 'Coastal Grey', '#a06830': 'Dark Walnut', '#c0d0c0': 'Crystal Sage', '#8a8a7a': 'Pewter', '#c4b89c': 'Parchment', '#6b5a48': 'Tobacco', '#8a9e9e': 'Storm', '#a08870': 'Sandstone', '#ede0cc': 'Linen', '#c8c8b4': 'Putty', '#baa07a': 'Dune', '#e0c49a': 'Wheat', '#9c8460': 'Hazel', '#eedfc0': 'Cream' }
  return names[hex] || 'Natural'
}

function tileColor(n, base) {
  const num = parseInt(base.slice(1), 16)
  const v = (n * 23 + 60) % 30 - 15
  const r = Math.min(255, Math.max(0, (num >> 16) + v))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + v))
  const b = Math.min(255, Math.max(0, (num & 0xff) + v))
  return `rgb(${r},${g},${b})`
}
</script>

<style scoped>
.detail-page { padding: 32px 0 64px; }
.breadcrumb { display: flex; gap: 8px; font-size: 13px; color: var(--tapi-muted); margin-bottom: 32px; }
.breadcrumb a:hover { color: var(--tapi-red); }

.detail-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; margin-bottom: 64px; }

.main-image {
  border-radius: var(--radius-lg);
  height: 440px;
  position: relative;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  margin-bottom: 12px;
}
.floor-preview-lg {
  display: grid; grid-template-columns: repeat(10, 1fr);
  gap: 2px; width: 90%; height: 82%; border-radius: 6px; overflow: hidden;
}
.tile-lg { border-radius: 1px; }
.badge {
  position: absolute; top: 14px; left: 14px;
  font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 100px;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.badge--bestseller { background: rgba(0,0,0,0.65); color: white; }
.badge--sale { background: var(--tapi-red); color: white; }
.badge--new { background: #1a7a4a; color: white; }
.badge--premium { background: #7a5a1a; color: white; }

.thumb-row { display: flex; gap: 8px; }
.thumb {
  width: 60px; height: 60px; border-radius: 8px; cursor: pointer;
  border: 2px solid transparent; transition: all var(--transition);
}
.thumb.active { border-color: var(--tapi-red); }
.thumb:hover { opacity: 0.85; }

.detail-title {
  font-family: var(--font-display);
  font-size: 36px; font-weight: 600;
  margin-bottom: 12px; line-height: 1.2;
}
.rating-row { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
.stars { color: #f5a623; font-size: 18px; letter-spacing: 2px; }
.rating-text { font-size: 14px; color: var(--tapi-muted); }

.price-block { display: flex; align-items: baseline; gap: 6px; margin-bottom: 20px; }
.price-lg { font-size: 36px; font-weight: 700; color: var(--tapi-black); }
.price-unit { font-size: 15px; color: var(--tapi-muted); }
.price-vat { font-size: 12px; color: var(--tapi-muted); }

.detail-desc { font-size: 15px; line-height: 1.7; color: var(--tapi-muted); margin-bottom: 24px; }

.color-label { font-size: 13px; color: var(--tapi-muted); margin-bottom: 8px; }
.color-label strong { color: var(--tapi-text); }
.color-swatches { display: flex; gap: 6px; margin-bottom: 24px; }
.swatch-btn {
  width: 30px; height: 30px; border-radius: 50%; cursor: pointer;
  border: 2.5px solid white; outline: 1.5px solid var(--tapi-border);
  transition: all var(--transition);
}
.swatch-btn.active { outline-color: var(--tapi-red); outline-width: 2px; }

.qty-row { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
.qty-label { font-size: 13px; color: var(--tapi-muted); }
.qty-input { display: flex; align-items: center; border: 1.5px solid var(--tapi-border); border-radius: var(--radius); overflow: hidden; }
.qty-input button { padding: 10px 16px; background: var(--tapi-gray); font-size: 18px; border: none; cursor: pointer; transition: background var(--transition); }
.qty-input button:hover { background: var(--tapi-gray-2); }
.qty-input input {
  width: 60px; text-align: center; border: none; outline: none;
  font-size: 15px; font-family: var(--font-body); padding: 10px 0;
}
.qty-total { font-size: 14px; color: var(--tapi-muted); }
.qty-total strong { color: var(--tapi-black); }

.cta-btns { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
.toast {
  background: #1a7a4a; color: white;
  font-size: 13px; font-weight: 500;
  padding: 10px 18px; border-radius: 8px;
  display: inline-block; margin-bottom: 16px;
  animation: fadeIn 0.2s ease;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; } }

.detail-perks { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding-top: 20px; border-top: 1px solid var(--tapi-border); }
.perk { font-size: 13px; color: var(--tapi-muted); display: flex; align-items: center; gap: 6px; }

.related h2 { margin-bottom: 24px; }
.related-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

.not-found { padding: 80px 0; display: flex; flex-direction: column; align-items: center; gap: 20px; }
</style>
