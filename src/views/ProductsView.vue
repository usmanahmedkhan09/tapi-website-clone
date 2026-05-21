<template>
  <div class="products-page">
    <div class="products-hero">
      <div class="container">
        <div class="breadcrumb">
          <RouterLink to="/">Home</RouterLink>
          <span>/</span>
          <span>{{ currentCategory ? currentCategory.name : 'All Flooring' }}</span>
        </div>
        <h1 class="section-title">{{ currentCategory ? currentCategory.name : 'All Flooring' }}</h1>
        <p class="section-sub">{{ currentCategory ? currentCategory.desc : 'Browse our full collection of beautiful flooring' }}</p>
      </div>
    </div>

    <div class="container products-layout">
      <button class="filters-toggle" @click="filtersOpen = !filtersOpen">
        {{ filtersOpen ? 'Hide filters' : 'Filter & sort' }}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
      </button>

      <!-- Sidebar filters -->
      <aside class="filters" :class="{ open: filtersOpen }">
        <div class="filter-header">
          <h3>Filter & sort</h3>
          <button class="clear-btn" @click="clearFilters">Clear all</button>
        </div>

        <div class="filter-group">
          <h4>Floor type</h4>
          <label v-for="cat in categories" :key="cat.id" class="filter-check">
            <input type="checkbox" v-model="selectedCategories" :value="cat.id" />
            <span>{{ cat.name }}</span>
            <span class="filter-count">{{ cat.count }}</span>
          </label>
        </div>

        <div class="filter-group">
          <h4>Price per m²</h4>
          <div class="price-range">
            <input type="range" v-model="maxPrice" min="10" max="60" step="1" />
            <div class="price-labels">
              <span>£10</span>
              <span>Up to £{{ maxPrice }}</span>
            </div>
          </div>
        </div>

        <div class="filter-group">
          <h4>Rating</h4>
          <label v-for="r in [5,4,3]" :key="r" class="filter-check">
            <input type="radio" v-model="minRating" :value="r" />
            <span>{{ '★'.repeat(r) }} & above</span>
          </label>
        </div>
      </aside>

      <!-- Product listing -->
      <div class="products-main">
        <div class="products-bar">
          <p class="results-count"><strong>{{ filteredProducts.length }}</strong> products</p>
          <div class="sort-control">
            <label>Sort by</label>
            <select v-model="sortBy">
              <option value="popular">Most popular</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
        </div>

        <div class="cat-chips" v-if="!route.params.category">
          <button
            v-for="cat in [{ id: '', name: 'All' }, ...categories]"
            :key="cat.id"
            class="chip"
            :class="{ active: activeChip === cat.id }"
            @click="activeChip = cat.id"
          >{{ cat.name }}</button>
        </div>

        <div class="grid">
          <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
        </div>

        <div v-if="filteredProducts.length === 0" class="no-results">
          <p>No products found. Try adjusting your filters.</p>
          <button class="btn-primary" @click="clearFilters">Clear filters</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { categories, products } from '../data/dummy.js'

const route = useRoute()
const filtersOpen = ref(false)
const selectedCategories = ref([])
const maxPrice = ref(60)
const minRating = ref(0)
const sortBy = ref('popular')
const activeChip = ref('')

watch(() => route.params.category, (cat) => {
  if (cat) { selectedCategories.value = [cat]; activeChip.value = cat }
  else { selectedCategories.value = []; activeChip.value = '' }
}, { immediate: true })

const currentCategory = computed(() =>
  categories.find(c => c.id === route.params.category)
)

const filteredProducts = computed(() => {
  let list = [...products]

  const activeCats = selectedCategories.value.length ? selectedCategories.value
    : activeChip.value ? [activeChip.value] : []

  if (activeCats.length) list = list.filter(p => activeCats.includes(p.category))
  list = list.filter(p => p.price <= maxPrice.value)
  if (minRating.value) list = list.filter(p => p.rating >= minRating.value)

  if (sortBy.value === 'price-asc') list.sort((a, b) => a.price - b.price)
  else if (sortBy.value === 'price-desc') list.sort((a, b) => b.price - a.price)
  else if (sortBy.value === 'rating') list.sort((a, b) => b.rating - a.rating)
  else list.sort((a, b) => b.reviews - a.reviews)

  return list
})

function clearFilters() {
  selectedCategories.value = []
  maxPrice.value = 60
  minRating.value = 0
  activeChip.value = ''
  sortBy.value = 'popular'
}
</script>

<style scoped>
.products-hero {
  background: var(--tapi-gray);
  padding: 28px 0 24px;
  border-bottom: 1px solid var(--tapi-border);
}

@media (min-width: 768px) {
  .products-hero { padding: 40px 0 32px; }
}

.breadcrumb {
  display: flex; gap: 8px; align-items: center;
  font-size: 13px; color: var(--tapi-muted); margin-bottom: 12px;
  flex-wrap: wrap;
}
.breadcrumb a { color: var(--tapi-muted); }
.breadcrumb a:hover { color: var(--tapi-red); }

.products-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  padding-top: 16px;
  padding-bottom: 48px;
  align-items: start;
}

.filters-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
  background: white;
  border: 1px solid var(--tapi-border);
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 500;
  color: var(--tapi-text);
}

@media (min-width: 1024px) {
  .filters-toggle { display: none; }
  .products-layout {
    grid-template-columns: 240px 1fr;
    gap: 40px;
    padding-top: 40px;
    padding-bottom: 60px;
  }
}

.filters {
  display: none;
  background: white;
  border: 1px solid var(--tapi-border);
  border-radius: var(--radius-lg);
  padding: 20px;
  margin-bottom: 20px;
}
.filters.open { display: block; }

@media (min-width: 1024px) {
  .filters {
    display: block;
    position: sticky;
    top: 80px;
    margin-bottom: 0;
  }
}
.filter-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.filter-header h3 { font-size: 15px; font-weight: 600; }
.clear-btn { font-size: 12px; color: var(--tapi-red); background: none; }
.clear-btn:hover { text-decoration: underline; }

.filter-group { margin-bottom: 24px; border-top: 1px solid var(--tapi-border); padding-top: 20px; }
.filter-group h4 { font-size: 13px; font-weight: 500; margin-bottom: 12px; color: var(--tapi-muted); text-transform: uppercase; letter-spacing: 0.5px; }

.filter-check {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; margin-bottom: 10px; cursor: pointer;
}
.filter-check input { accent-color: var(--tapi-red); }
.filter-count { margin-left: auto; color: var(--tapi-muted); font-size: 11px; }

.price-range input { width: 100%; accent-color: var(--tapi-red); margin-bottom: 8px; }
.price-labels { display: flex; justify-content: space-between; font-size: 12px; color: var(--tapi-muted); }

.products-main { min-width: 0; }
.products-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

@media (min-width: 640px) {
  .products-bar {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
}
.results-count { font-size: 14px; color: var(--tapi-muted); }
.results-count strong { color: var(--tapi-text); }
.sort-control { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--tapi-muted); }
.sort-control select {
  border: 1px solid var(--tapi-border);
  border-radius: var(--radius);
  padding: 8px 12px;
  font-size: 13px;
  font-family: var(--font-body);
  outline: none;
  cursor: pointer;
}

.cat-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.chip {
  background: var(--tapi-gray);
  border: 1px solid var(--tapi-border);
  border-radius: 100px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 400;
  transition: all var(--transition);
  cursor: pointer;
}
.chip:hover { border-color: var(--tapi-red); color: var(--tapi-red); }
.chip.active { background: var(--tapi-red); color: white; border-color: var(--tapi-red); }

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 480px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
}
.no-results {
  text-align: center;
  padding: 60px 0;
  color: var(--tapi-muted);
  display: flex; flex-direction: column; align-items: center; gap: 16px;
}
</style>
