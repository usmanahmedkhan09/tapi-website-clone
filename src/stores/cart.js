import { reactive } from 'vue'

export const cart = reactive({
  items: [],

  get count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0)
  },

  get total() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  },

  add(product, qty = 1) {
    const existing = this.items.find(i => i.id === product.id)
    if (existing) {
      existing.qty += qty
    } else {
      this.items.push({ ...product, qty })
    }
  },

  remove(id) {
    this.items = this.items.filter(i => i.id !== id)
  },

  updateQty(id, qty) {
    const item = this.items.find(i => i.id === id)
    if (item) item.qty = qty
  },

  clear() {
    this.items = []
  }
})
