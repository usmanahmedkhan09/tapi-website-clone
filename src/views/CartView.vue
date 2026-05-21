<template>
  <div class="cart-page">
    <div class="container">
      <h1 class="section-title">Your basket</h1>

      <div v-if="cart.items.length === 0" class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h2>Your basket is empty</h2>
        <p>Add some beautiful flooring to get started</p>
        <RouterLink to="/products" class="btn-primary">Browse flooring →</RouterLink>
      </div>

      <div v-else class="cart-layout">
        <div class="cart-items">
          <div v-for="item in cart.items" :key="item.id" class="cart-item">
            <div class="item-swatch" :style="{ background: item.color }">
              <div class="mini-grid">
                <div v-for="n in 9" :key="n" class="mini-tile"
                  :style="{ background: tileColor(n, item.color) }"></div>
              </div>
            </div>
            <div class="item-info">
              <RouterLink :to="`/product/${item.id}`" class="item-name">{{ item.name }}</RouterLink>
              <p class="item-meta">£{{ item.price.toFixed(2) }} per m²</p>
            </div>
            <div class="item-qty">
              <button @click="cart.updateQty(item.id, Math.max(1, item.qty - 1))">−</button>
              <span>{{ item.qty }} m²</span>
              <button @click="cart.updateQty(item.id, item.qty + 1)">+</button>
            </div>
            <div class="item-total">£{{ (item.price * item.qty).toFixed(2) }}</div>
            <button class="remove-btn" @click="cart.remove(item.id)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </button>
          </div>
        </div>

        <div class="cart-summary">
          <h3>Order summary</h3>
          <div class="summary-row"><span>Subtotal</span><span>£{{ cart.total.toFixed(2) }}</span></div>
          <div class="summary-row"><span>Delivery</span><span>{{ cart.total >= 500 ? 'Free' : '£39.99' }}</span></div>
          <div v-if="cart.total >= 500" class="summary-row free-delivery"><span>🎉 Free delivery unlocked!</span></div>
          <div class="summary-divider"></div>
          <div class="summary-row summary-total"><span>Total</span><span>£{{ grandTotal.toFixed(2) }}</span></div>
          <button class="btn-primary checkout-btn" @click="checkout">Proceed to checkout →</button>
          <div class="summary-perks">
            <div>✓ Free measuring included</div>
            <div>✓ Wear guarantee on all floors</div>
            <div>✓ 0% credit available</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { cart } from '../stores/cart.js'

const grandTotal = computed(() => cart.total + (cart.total >= 500 ? 0 : 39.99))

function checkout() {
  alert('Checkout coming soon — backend integration required!')
}

function tileColor(n, base) {
  const num = parseInt(base.slice(1), 16)
  const v = (n * 19) % 20 - 10
  const r = Math.min(255, Math.max(0, (num >> 16) + v))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + v))
  const b = Math.min(255, Math.max(0, (num & 0xff) + v))
  return `rgb(${r},${g},${b})`
}
</script>

<style scoped>
.cart-page { padding: 28px 0 48px; }

@media (min-width: 768px) {
  .cart-page { padding: 40px 0 80px; }
}
.section-title { margin-bottom: 32px; }

.empty-cart {
  text-align: center; padding: 80px 0;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
}
.empty-icon { font-size: 56px; }
.empty-cart h2 { font-size: 24px; font-weight: 500; }
.empty-cart p { color: var(--tapi-muted); }

.cart-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: start;
}

@media (min-width: 768px) {
  .cart-layout { grid-template-columns: 1fr 300px; gap: 32px; }
}

@media (min-width: 1024px) {
  .cart-layout { grid-template-columns: 1fr 340px; gap: 40px; }
}

.cart-item {
  display: grid;
  grid-template-columns: 64px 1fr auto;
  grid-template-rows: auto auto;
  gap: 12px 16px;
  padding: 20px 0;
  border-bottom: 1px solid var(--tapi-border);
  align-items: center;
}

@media (min-width: 640px) {
  .cart-item {
    display: flex;
    gap: 20px;
    grid-template-columns: unset;
    grid-template-rows: unset;
  }
}
.item-swatch {
  width: 64px; height: 64px;
  border-radius: 10px;
  flex-shrink: 0;
  overflow: hidden;
  grid-row: span 2;
}

@media (min-width: 640px) {
  .item-swatch { width: 80px; height: 80px; grid-row: auto; }
}
.mini-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; width: 100%; height: 100%; }
.mini-tile {}
.item-info { flex: 1; }
.item-name { font-size: 15px; font-weight: 500; color: var(--tapi-text); }
.item-name:hover { color: var(--tapi-red); }
.item-meta { font-size: 13px; color: var(--tapi-muted); margin-top: 4px; }

.item-qty {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid var(--tapi-border);
  border-radius: 8px;
  overflow: hidden;
  grid-column: 2;
}
.item-qty button { padding: 8px 14px; background: var(--tapi-gray); font-size: 16px; cursor: pointer; }
.item-qty span { min-width: 50px; text-align: center; font-size: 14px; }

.item-total {
  font-size: 16px;
  font-weight: 600;
  text-align: right;
  grid-column: 3;
  grid-row: 1;
}

@media (min-width: 640px) {
  .item-total { min-width: 80px; grid-column: auto; grid-row: auto; }
}

.remove-btn {
  background: none;
  color: var(--tapi-muted);
  padding: 8px;
  border-radius: 8px;
  transition: all var(--transition);
  grid-column: 3;
  grid-row: 2;
  justify-self: end;
}

@media (min-width: 640px) {
  .remove-btn { grid-column: auto; grid-row: auto; }
}

.remove-btn:hover { color: var(--tapi-red); background: #f5edd4; }

.cart-summary {
  background: var(--tapi-gray);
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 1px solid var(--tapi-border);
}

@media (min-width: 768px) {
  .cart-summary { position: sticky; top: 80px; }
}
.cart-summary h3 { font-size: 16px; font-weight: 600; margin-bottom: 20px; }
.summary-row { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 12px; }
.summary-row span:last-child { font-weight: 500; }
.free-delivery { color: #1a7a4a; font-size: 13px; }
.summary-divider { border-top: 1px solid var(--tapi-border); margin: 16px 0; }
.summary-total { font-size: 16px; font-weight: 600; margin-bottom: 20px; }
.checkout-btn { width: 100%; justify-content: center; margin-bottom: 16px; padding: 14px; font-size: 15px; }
.summary-perks { font-size: 12px; color: var(--tapi-muted); display: flex; flex-direction: column; gap: 6px; }
</style>
