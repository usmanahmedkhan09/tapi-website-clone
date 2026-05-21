<template>
  <div class="stores-page">
    <div class="stores-hero">
      <div class="container">
        <h1 class="section-title">Find a store near you</h1>
        <p class="section-sub">220+ showrooms nationwide. Or book a home visit — we'll bring the samples to you.</p>
        <div class="search-box">
          <input v-model="searchQuery" type="text" placeholder="Enter your postcode or town..." />
          <button class="btn-primary">Search</button>
        </div>
      </div>
    </div>

    <div class="container stores-layout">
      <div class="store-list">
        <div class="list-header">
          <p><strong>{{ stores.length }}</strong> stores found</p>
          <button class="btn-secondary" @click="showBooking = true">Book home visit</button>
        </div>
        <div v-for="store in stores" :key="store.id" class="store-card"
          :class="{ active: selectedStore?.id === store.id }"
          @click="selectedStore = store">
          <div class="store-icon">🏪</div>
          <div class="store-info">
            <h3>{{ store.name }}</h3>
            <p class="store-address">{{ store.address }}</p>
            <p class="store-hours">{{ store.hours }}</p>
            <div class="store-actions">
              <a :href="`tel:${store.phone}`" class="store-link">📞 {{ store.phone }}</a>
              <a href="#" class="store-link">Get directions →</a>
            </div>
          </div>
          <div class="store-dist">{{ store.distance }}</div>
        </div>
      </div>

      <!-- Map placeholder -->
      <div class="map-panel">
        <div class="map-placeholder">
          <div class="map-grid">
            <div v-for="n in 100" :key="n" class="map-cell"></div>
          </div>
          <div class="map-pins">
            <div v-for="store in stores" :key="store.id"
              class="map-pin"
              :class="{ active: selectedStore?.id === store.id }"
              :style="{ left: `${20 + store.id * 18}%`, top: `${25 + (store.id % 3) * 20}%` }"
              @click="selectedStore = store">
              📍
              <div class="pin-label">{{ store.name.split(' ').slice(1).join(' ') }}</div>
            </div>
          </div>
          <div class="map-overlay">
            <p>Interactive map</p>
            <small>Connect Google Maps API for live map</small>
          </div>
        </div>
        <div v-if="selectedStore" class="store-detail-panel">
          <h3>{{ selectedStore.name }}</h3>
          <p>{{ selectedStore.address }}</p>
          <p>{{ selectedStore.hours }}</p>
          <div class="detail-btns">
            <a :href="`tel:${selectedStore.phone}`" class="btn-secondary">Call store</a>
            <button class="btn-primary" @click="showBooking = true">Book visit</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking modal -->
    <div v-if="showBooking" class="modal-backdrop" @click.self="showBooking = false">
      <div class="modal">
        <button class="modal-close" @click="showBooking = false">✕</button>
        <h2>Book a home visit</h2>
        <p>One of our flooring experts will bring samples to you, 7 days a week.</p>
        <form @submit.prevent="submitBooking" class="booking-form">
          <div class="form-row">
            <input v-model="booking.name" type="text" placeholder="Your name" required />
            <input v-model="booking.phone" type="tel" placeholder="Phone number" required />
          </div>
          <input v-model="booking.postcode" type="text" placeholder="Postcode" required />
          <select v-model="booking.date">
            <option value="">Preferred date</option>
            <option>Monday 12 May</option>
            <option>Tuesday 13 May</option>
            <option>Wednesday 14 May</option>
            <option>Thursday 15 May</option>
            <option>Friday 16 May</option>
          </select>
          <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;">
            Request home visit →
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { stores } from '../data/dummy.js'

const searchQuery = ref('')
const selectedStore = ref(stores[0])
const showBooking = ref(false)
const booking = ref({ name: '', phone: '', postcode: '', date: '' })

function submitBooking() {
  alert(`Home visit booked for ${booking.value.name}! We'll confirm via phone.`)
  showBooking.value = false
  booking.value = { name: '', phone: '', postcode: '', date: '' }
}
</script>

<style scoped>
.stores-hero { background: var(--tapi-black); color: white; padding: 32px 0; margin-bottom: 28px; }

@media (min-width: 768px) {
  .stores-hero { padding: 40px 0; margin-bottom: 32px; }
}

@media (min-width: 1024px) {
  .stores-hero { padding: 48px 0; margin-bottom: 40px; }
}
.stores-hero .section-title { color: white; margin-bottom: 8px; }
.stores-hero .section-sub { color: rgba(255,255,255,0.6); margin-bottom: 24px; }
.search-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 100%;
}

@media (min-width: 480px) {
  .search-box { flex-direction: row; max-width: 480px; }
}

.search-box input {
  flex: 1;
  min-width: 0;
  border: none;
  border-radius: var(--radius);
  padding: 12px 16px;
  font-size: 15px;
  font-family: var(--font-body);
  outline: none;
}

@media (min-width: 480px) {
  .search-box input { padding: 12px 18px; }
}

.stores-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding-bottom: 48px;
}

@media (min-width: 1024px) {
  .stores-layout {
    grid-template-columns: 380px 1fr;
    gap: 32px;
    padding-bottom: 64px;
  }
}

.list-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 14px;
  color: var(--tapi-muted);
}

@media (min-width: 480px) {
  .list-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0;
  }
}
.list-header strong { color: var(--tapi-text); }

.store-card {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-start;
  padding: 16px;
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--tapi-border);
  margin-bottom: 12px;
  cursor: pointer;
  transition: all var(--transition);
}

@media (min-width: 480px) {
  .store-card { flex-wrap: nowrap; gap: 16px; }
}
.store-card:hover { border-color: var(--tapi-red); }
.store-card.active { border-color: var(--tapi-red); background: #fce8eb; }
.store-icon { font-size: 24px; flex-shrink: 0; }
.store-info { flex: 1; }
.store-info h3 { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.store-address { font-size: 13px; color: var(--tapi-muted); margin-bottom: 3px; }
.store-hours { font-size: 12px; color: var(--tapi-muted); margin-bottom: 8px; }
.store-actions { display: flex; flex-wrap: wrap; gap: 8px; }

@media (min-width: 480px) {
  .store-actions { gap: 12px; }
}
.store-link { font-size: 12px; color: var(--tapi-red); }
.store-dist { font-size: 12px; color: var(--tapi-muted); white-space: nowrap; }

.map-panel {}
.map-placeholder {
  background: #e8ecf0;
  border-radius: var(--radius-lg);
  height: 260px;
  position: relative;
  overflow: hidden;
  margin-bottom: 16px;
}

@media (min-width: 768px) {
  .map-placeholder { height: 340px; }
}

@media (min-width: 1024px) {
  .map-placeholder { height: 400px; }
}
.map-grid { display: grid; grid-template-columns: repeat(10,1fr); gap: 1px; width: 100%; height: 100%; }
.map-cell { background: #dde1e6; }
.map-cell:nth-child(3n) { background: #d0d4d9; }
.map-cell:nth-child(7n) { background: #c8d4e0; }
.map-overlay {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  align-items: center; justify-content: center; text-align: center;
  background: rgba(255,255,255,0.4); backdrop-filter: blur(1px);
}
.map-overlay p { font-weight: 500; color: var(--tapi-text); }
.map-overlay small { color: var(--tapi-muted); font-size: 12px; }
.map-pins { position: absolute; inset: 0; }
.map-pin {
  position: absolute; font-size: 20px; cursor: pointer;
  transition: transform var(--transition);
  display: flex; flex-direction: column; align-items: center;
}
.map-pin:hover, .map-pin.active { transform: scale(1.3); z-index: 10; }
.pin-label {
  background: white; font-size: 10px; font-weight: 600;
  padding: 2px 6px; border-radius: 4px; white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
.store-detail-panel {
  background: white; border: 1px solid var(--tapi-border);
  border-radius: var(--radius-lg); padding: 20px;
}
.store-detail-panel h3 { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
.store-detail-panel p { font-size: 13px; color: var(--tapi-muted); margin-bottom: 4px; }
.detail-btns {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
}

@media (min-width: 480px) {
  .detail-btns { flex-direction: row; }
}

.modal-backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.modal {
  background: white; border-radius: 16px; padding: 32px;
  width: 480px; max-width: 90vw; position: relative;
  animation: fadeIn 0.2s ease;
}
.modal-close { position: absolute; top: 16px; right: 16px; background: none; font-size: 18px; color: var(--tapi-muted); }
.modal h2 { font-family: var(--font-display); font-size: 24px; margin-bottom: 8px; }
.modal p { color: var(--tapi-muted); font-size: 14px; margin-bottom: 24px; }
.booking-form { display: flex; flex-direction: column; gap: 12px; }
.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 480px) {
  .form-row { grid-template-columns: 1fr 1fr; }
}
.booking-form input, .booking-form select {
  border: 1.5px solid var(--tapi-border); border-radius: var(--radius);
  padding: 12px 16px; font-size: 14px; font-family: var(--font-body); outline: none;
  transition: border-color var(--transition);
}
.booking-form input:focus, .booking-form select:focus { border-color: var(--tapi-red); }
@keyframes fadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
</style>
