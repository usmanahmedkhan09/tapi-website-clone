<template>
  <div class="ideas-page">
    <div class="ideas-hero">
      <div class="container">
        <p class="section-label" style="color: #ffd0d6;">Ideas & inspiration</p>
        <h1 class="ideas-title">The Ideas Hub</h1>
        <p style="color: rgba(255,255,255,0.65); font-size: 16px; max-width: 480px;">From clever carpet pairings to room transformations — let your imagination run wild.</p>
      </div>
    </div>

    <div class="container">
      <div class="ideas-filter">
        <button v-for="tag in tags" :key="tag"
          class="idea-tag" :class="{ active: activeTag === tag }"
          @click="activeTag = tag">{{ tag }}</button>
      </div>

      <div class="ideas-grid">
        <div v-for="idea in filteredIdeas" :key="idea.id" class="idea-card" :class="idea.size">
          <div class="idea-img" :style="{ background: idea.bg }">
            <div class="idea-pattern">
              <div v-for="n in 20" :key="n" class="pattern-tile"
                :style="{ background: pColor(n, idea.bg) }"></div>
            </div>
          </div>
          <div class="idea-body">
            <span class="tag">{{ idea.tag }}</span>
            <h3>{{ idea.title }}</h3>
            <p>{{ idea.desc }}</p>
            <a href="#" class="idea-link">Read more →</a>
          </div>
        </div>
      </div>

      <!-- Lookbook section -->
      <div class="lookbook-section">
        <div class="section-header">
          <div>
            <p class="section-label">Style lookbooks</p>
            <h2 class="section-title">Design from the floor up</h2>
          </div>
        </div>
        <div class="lookbook-grid">
          <div v-for="lb in lookbooks" :key="lb.title" class="lookbook-card"
            :style="{ background: lb.bg }">
            <div class="lookbook-overlay">
              <p class="lookbook-style">{{ lb.style }}</p>
              <h3>{{ lb.title }}</h3>
              <a href="#" class="btn-outline-white" style="font-size: 13px; padding: 8px 18px;">Explore →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTag = ref('All')
const tags = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Hallway', 'Bathroom', 'Trends']

const ideas = [
  { id: 1, title: 'How to choose the perfect carpet colour', desc: 'Our guide walks you through colour theory, room size, and light to help you find the ideal shade.', tag: 'Carpet', bg: '#b09870', size: 'large' },
  { id: 2, title: '10 stunning living room floor ideas', desc: 'From herringbone LVT to plush saxony — inspiration for every style.', tag: 'Living Room', bg: '#9e9e8a', size: 'small' },
  { id: 3, title: 'The best flooring for kitchens and bathrooms', desc: 'Waterproof, stylish, and easy to clean — here are our top picks.', tag: 'Kitchen', bg: '#8a9e9e', size: 'small' },
  { id: 4, title: 'Bedroom flooring ideas for every budget', desc: 'Create a cosy, luxurious bedroom retreat with the right flooring choice.', tag: 'Bedroom', bg: '#9e9e8a', size: 'small' },
  { id: 5, title: 'Interior design trends 2026', desc: 'Cloud Dancer, colour drenching, and dopamine decor — what is hot this year.', tag: 'Trends', bg: '#c0b890', size: 'large' },
  { id: 6, title: 'How to style parquet flooring', desc: 'Classic herringbone and chevron patterns for a timeless look.', tag: 'Trends', bg: '#c8a87a', size: 'small' },
]

const filteredIdeas = computed(() =>
  activeTag.value === 'All' ? ideas : ideas.filter(i => i.tag === activeTag.value || i.tag.includes(activeTag.value))
)

const lookbooks = [
  { title: 'Scandi Simplicity', style: 'Lookbook', bg: '#d4c8b4' },
  { title: 'Modern Luxe', style: 'Lookbook', bg: '#8a8a7a' },
  { title: 'Country Farmhouse', style: 'Lookbook', bg: '#b09870' },
  { title: 'Bold & Contemporary', style: 'Lookbook', bg: '#7a8a8a' },
]

function pColor(n, base) {
  const num = parseInt(base.slice(1), 16)
  const v = (n * 17) % 24 - 12
  const r = Math.min(255, Math.max(0, (num >> 16) + v))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + v))
  const b = Math.min(255, Math.max(0, (num & 0xff) + v))
  return `rgb(${r},${g},${b})`
}
</script>

<style scoped>
.ideas-hero { background: var(--tapi-black); padding: 36px 0; margin-bottom: 0; }
.ideas-title {
  font-family: var(--font-display);
  font-size: 32px;
  color: white;
  margin-bottom: 14px;
  line-height: 1.15;
}

@media (min-width: 768px) {
  .ideas-hero { padding: 48px 0; }
  .ideas-title { font-size: 40px; }
}

@media (min-width: 1024px) {
  .ideas-hero { padding: 56px 0; }
  .ideas-title { font-size: 48px; }
}
.ideas-filter {
  display: flex; flex-wrap: wrap; gap: 10px;
  padding: 28px 0; border-bottom: 1px solid var(--tapi-border);
  margin-bottom: 32px;
}
.idea-tag {
  background: var(--tapi-gray); border: 1px solid var(--tapi-border);
  border-radius: 100px; padding: 8px 18px; font-size: 13px;
  cursor: pointer; transition: all var(--transition);
}
.idea-tag:hover { border-color: var(--tapi-red); color: var(--tapi-red); }
.idea-tag.active { background: var(--tapi-red); color: white; border-color: var(--tapi-red); }

.ideas-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  gap: 16px;
  margin-bottom: 48px;
}
.idea-card { border-radius: var(--radius-lg); border: 1px solid var(--tapi-border); overflow: hidden; }
.idea-card.large { grid-column: span 1; }

@media (min-width: 640px) {
  .ideas-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .idea-card.large { grid-column: span 2; }
}

@media (min-width: 1024px) {
  .ideas-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 64px;
  }
}
.idea-img { height: 220px; overflow: hidden; }
.idea-pattern { display: grid; grid-template-columns: repeat(5,1fr); gap: 2px; width: 100%; height: 100%; }
.pattern-tile {}
.idea-body { padding: 20px; }
.idea-body h3 { font-size: 16px; font-weight: 500; margin: 8px 0 8px; }
.idea-body p { font-size: 13px; color: var(--tapi-muted); line-height: 1.6; margin-bottom: 14px; }
.idea-link { font-size: 13px; color: var(--tapi-red); font-weight: 500; }
.idea-link:hover { text-decoration: underline; }

.lookbook-section { margin-bottom: 64px; }
.section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; }
.lookbook-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 480px) {
  .lookbook-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
}

@media (min-width: 1024px) {
  .lookbook-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; }
}

.lookbook-card {
  height: 200px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative; display: flex; align-items: flex-end;
  cursor: pointer; transition: transform var(--transition);
}
.lookbook-card:hover { transform: scale(1.02); }

@media (min-width: 768px) {
  .lookbook-card { height: 240px; }
}

@media (min-width: 1024px) {
  .lookbook-card { height: 260px; }
}
.lookbook-overlay {
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  padding: 20px 18px 18px; width: 100%; color: white;
}
.lookbook-style { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; opacity: 0.7; margin-bottom: 4px; }
.lookbook-overlay h3 { font-size: 16px; font-weight: 500; margin-bottom: 12px; }
</style>
