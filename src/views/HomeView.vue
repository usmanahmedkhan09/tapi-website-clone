<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <div class="hero-eyebrow">New Season Collection 2026</div>
          <h1 class="hero-title">Beautiful flooring,<br><em>perfectly priced</em></h1>
          <p class="hero-desc">From carpets to luxury vinyl — expert advice, free measuring and professional fitting across 220+ stores nationwide.</p>
          <div class="hero-btns">
            <RouterLink to="/products" class="btn-primary">Shop all flooring →</RouterLink>
            <RouterLink to="/stores" class="btn-outline-white">Book home visit</RouterLink>
          </div>
          <div class="hero-stats">
            <div class="stat"><strong>220+</strong><span>UK stores</span></div>
            <div class="stat-divider"></div>
            <div class="stat"><strong>10k+</strong><span>products</span></div>
            <div class="stat-divider"></div>
            <div class="stat"><strong>4.9★</strong><span>rated</span></div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="floor-grid">
            <div v-for="n in 48" :key="n" class="floor-cell" :style="floorStyle(n)"></div>
          </div>
          <div class="hero-badge-float">
            <div class="hbf-label">0% credit</div>
            <div class="hbf-sub">Up to 4 years</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="categories">
      <div class="container">
        <div class="section-header">
          <div>
            <p class="section-label">Shop by type</p>
            <h2 class="section-title">Find your floor</h2>
          </div>
          <RouterLink to="/products" class="btn-secondary">View all →</RouterLink>
        </div>
        <div class="cat-grid">
          <RouterLink v-for="cat in categories" :key="cat.id"
            :to="`/products/${cat.id}`" class="cat-card">
            <div class="cat-icon">{{ cat.icon }}</div>
            <div class="cat-info">
              <p class="cat-name">{{ cat.name }}</p>
              <p class="cat-desc">{{ cat.desc }}</p>
            </div>
            <div class="cat-count">{{ cat.count }} products →</div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Banner -->
    <section class="promo-banner">
      <div class="container">
        <div class="promo-inner">
          <div class="promo-text">
            <div class="section-label" style="color: #ffd0d6;">Limited time</div>
            <h2 style="font-family: var(--font-display); font-size: 28px; color: white; margin-bottom: 8px;">Up to 40% off selected flooring</h2>
            <p style="color: rgba(255,255,255,0.75); font-size: 14px;">Free fitting included on orders over £500. Offer ends Sunday.</p>
          </div>
          <RouterLink to="/products" class="btn-white">Shop the sale →</RouterLink>
        </div>
      </div>
    </section>

    <!-- Featured products -->
    <section class="featured">
      <div class="container">
        <div class="section-header">
          <div>
            <p class="section-label">Popular picks</p>
            <h2 class="section-title">Customer favourites</h2>
          </div>
          <RouterLink to="/products" class="btn-secondary">View all →</RouterLink>
        </div>
        <div class="products-grid">
          <ProductCard v-for="p in featuredProducts" :key="p.id" :product="p" />
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="services">
      <div class="container">
        <div class="section-header center">
          <p class="section-label">Why Tapi</p>
          <h2 class="section-title">The full Tapi experience</h2>
          <p class="section-sub" style="margin: 0 auto;">We take care of everything from first inspiration right through to fitting and beyond.</p>
        </div>
        <div class="services-grid">
          <div v-for="s in services" :key="s.title" class="service-card">
            <div class="service-icon">{{ s.icon }}</div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Inspiration -->
    <section class="inspiration">
      <div class="container">
        <div class="section-header">
          <div>
            <p class="section-label">Ideas & inspiration</p>
            <h2 class="section-title">Find your look</h2>
          </div>
          <RouterLink to="/ideas" class="btn-secondary">Ideas hub →</RouterLink>
        </div>
        <div class="insp-grid">
          <RouterLink to="/ideas" class="insp-card insp-large"
            :style="{ background: inspiration[0].bg }">
            <div class="insp-overlay">
              <p class="insp-title">{{ inspiration[0].title }}</p>
              <p class="insp-sub">{{ inspiration[0].subtitle }}</p>
            </div>
          </RouterLink>
          <div class="insp-right">
            <RouterLink v-for="item in inspiration.slice(1)" :key="item.id"
              to="/ideas" class="insp-card insp-small"
              :style="{ background: item.bg }">
              <div class="insp-overlay">
                <p class="insp-title">{{ item.title }}</p>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Reviews -->
    <section class="reviews">
      <div class="container">
        <div class="section-header center">
          <p class="section-label">Customer stories</p>
          <h2 class="section-title">Don't just take our word for it</h2>
        </div>
        <div class="reviews-grid">
          <div v-for="r in reviews" :key="r.id" class="review-card">
            <div class="review-stars">{{ '★'.repeat(r.stars) }}</div>
            <p class="review-text">"{{ r.text }}"</p>
            <div class="reviewer-info">
              <div class="reviewer-avatar">{{ r.name[0] }}</div>
              <div>
                <p class="reviewer-name">{{ r.name }}</p>
                <p class="reviewer-meta">{{ r.location }} · {{ r.product }}</p>
              </div>
              <div class="review-date">{{ r.date }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter">
      <div class="container">
        <div class="newsletter-inner">
          <div>
            <h2 class="section-title">Get flooring ideas in your inbox</h2>
            <p class="section-sub">Latest trends, exclusive offers, and expert advice — delivered weekly.</p>
          </div>
          <form class="newsletter-form" @submit.prevent="subscribe">
            <input v-model="email" type="email" placeholder="Your email address" required />
            <button type="submit" class="btn-primary">Subscribe</button>
          </form>
          <p v-if="subscribed" class="success-msg">✓ Thanks for subscribing!</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { categories, products, reviews, services, inspiration } from '../data/dummy.js'

const featuredProducts = products.slice(0, 4)
const email = ref('')
const subscribed = ref(false)

function subscribe() {
  subscribed.value = true
  email.value = ''
  setTimeout(() => subscribed.value = false, 4000)
}

const baseColors = ['#c8a87a','#b09870','#a09080','#9aa09a','#c0b090']
function floorStyle(n) {
  const base = parseInt(baseColors[n % baseColors.length].slice(1), 16)
  const v = (n * 37 + 80) % 40 - 20
  const r = Math.min(255, Math.max(0, (base >> 16) + v))
  const g = Math.min(255, Math.max(0, ((base >> 8) & 0xff) + v))
  const b = Math.min(255, Math.max(0, (base & 0xff) + v))
  return { background: `rgb(${r},${g},${b})` }
}
</script>

<style scoped>
/* Hero */
.hero {
  background: var(--tapi-black);
  color: white;
  min-height: 560px;
  display: flex;
  align-items: center;
  padding: 60px 0;
}
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}
.hero-eyebrow {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  margin-bottom: 16px;
}
.hero-title {
  font-family: var(--font-display);
  font-size: 52px;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 20px;
}
.hero-title em { color: var(--tapi-red); font-style: italic; }
.hero-desc { font-size: 16px; color: rgba(255,255,255,0.65); margin-bottom: 32px; line-height: 1.7; max-width: 440px; }
.hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; }
.hero-stats { display: flex; align-items: center; gap: 24px; }
.stat strong { display: block; font-size: 20px; font-weight: 600; color: white; }
.stat span { font-size: 12px; color: rgba(255,255,255,0.5); }
.stat-divider { width: 1px; height: 32px; background: rgba(255,255,255,0.15); }

.hero-visual {
  position: relative;
  height: 380px;
  border-radius: 16px;
  overflow: hidden;
}
.floor-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 3px;
  width: 100%; height: 100%;
}
.floor-cell { border-radius: 2px; transition: opacity 0.3s; }
.hero-badge-float {
  position: absolute;
  bottom: 20px; right: 20px;
  background: white;
  border-radius: 12px;
  padding: 14px 18px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}
.hbf-label { font-size: 16px; font-weight: 700; color: var(--tapi-red); }
.hbf-sub { font-size: 11px; color: var(--tapi-muted); }

/* Categories */
.categories { padding: 64px 0; }
.section-header {
  display: flex; justify-content: space-between; align-items: flex-end;
  margin-bottom: 32px;
}
.section-header.center { flex-direction: column; align-items: center; text-align: center; gap: 10px; }

.cat-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
.cat-card {
  display: flex;
  flex-direction: column;
  background: var(--tapi-gray);
  border: 1px solid var(--tapi-border);
  border-radius: var(--radius-lg);
  padding: 20px 16px;
  transition: all var(--transition);
  text-decoration: none;
  color: inherit;
}
.cat-card:hover {
  background: white;
  border-color: var(--tapi-red);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}
.cat-icon { font-size: 28px; margin-bottom: 10px; }
.cat-name { font-size: 14px; font-weight: 500; margin-bottom: 4px; }
.cat-desc { font-size: 12px; color: var(--tapi-muted); margin-bottom: 14px; flex: 1; }
.cat-count { font-size: 11px; color: var(--tapi-red); font-weight: 500; }

/* Promo banner */
.promo-banner { background: var(--tapi-red); padding: 40px 0; }
.promo-inner {
  display: flex; justify-content: space-between; align-items: center; gap: 24px;
}
.btn-white {
  background: white;
  color: var(--tapi-red);
  padding: 12px 28px;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 600;
  transition: all var(--transition);
  white-space: nowrap;
  text-decoration: none;
  display: inline-block;
}
.btn-white:hover { background: var(--tapi-gray); }

/* Featured */
.featured { padding: 64px 0; }
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* Services */
.services { padding: 64px 0; background: var(--tapi-gray); }
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 40px;
}
.service-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  border: 1px solid var(--tapi-border);
  transition: all var(--transition);
}
.service-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,0.08); }
.service-icon { font-size: 32px; margin-bottom: 14px; }
.service-card h3 { font-size: 15px; font-weight: 500; margin-bottom: 8px; }
.service-card p { font-size: 13px; color: var(--tapi-muted); line-height: 1.6; }

/* Inspiration */
.inspiration { padding: 64px 0; }
.insp-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 14px; }
.insp-large { height: 420px; }
.insp-right { display: grid; grid-template-rows: repeat(2, 1fr); gap: 14px; }
.insp-small { height: 100%; min-height: 150px; }
.insp-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
  display: block;
  cursor: pointer;
  transition: transform var(--transition);
  text-decoration: none;
}
.insp-card:hover { transform: scale(1.01); }
.insp-overlay {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.65));
  padding: 24px 20px 18px;
  color: white;
}
.insp-title { font-size: 16px; font-weight: 500; margin-bottom: 2px; }
.insp-sub { font-size: 12px; opacity: 0.75; }

/* Reviews */
.reviews { padding: 64px 0; background: var(--tapi-gray); }
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 40px;
}
.review-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 1px solid var(--tapi-border);
}
.review-stars { color: #f5a623; font-size: 16px; margin-bottom: 12px; letter-spacing: 2px; }
.review-text { font-size: 14px; line-height: 1.7; color: var(--tapi-muted); margin-bottom: 20px; font-style: italic; }
.reviewer-info { display: flex; align-items: center; gap: 12px; }
.reviewer-avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--tapi-red);
  color: white;
  font-size: 14px;
  font-weight: 600;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.reviewer-name { font-size: 13px; font-weight: 500; }
.reviewer-meta { font-size: 11px; color: var(--tapi-muted); }
.review-date { font-size: 11px; color: var(--tapi-muted); margin-left: auto; }

/* Newsletter */
.newsletter { padding: 64px 0; }
.newsletter-inner {
  background: var(--tapi-black);
  border-radius: 20px;
  padding: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}
.newsletter-inner .section-title { color: white; }
.newsletter-inner .section-sub { color: rgba(255,255,255,0.55); }
.newsletter-form { display: flex; gap: 8px; }
.newsletter-form input {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: var(--radius);
  padding: 12px 18px;
  font-size: 14px;
  font-family: var(--font-body);
  color: white;
  outline: none;
  min-width: 260px;
  transition: border-color var(--transition);
}
.newsletter-form input::placeholder { color: rgba(255,255,255,0.4); }
.newsletter-form input:focus { border-color: rgba(255,255,255,0.5); }
.success-msg { color: #6ee7a0; font-size: 14px; margin-top: 12px; }
</style>
