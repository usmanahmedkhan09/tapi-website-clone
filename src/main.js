import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

import HomeView from './views/HomeView.vue'
import ProductsView from './views/ProductsView.vue'
import ProductDetailView from './views/ProductDetailView.vue'
import CartView from './views/CartView.vue'
import StoreFinderView from './views/StoreFinderView.vue'
import IdeasView from './views/IdeasView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/products/:category?', component: ProductsView },
    { path: '/product/:id', component: ProductDetailView },
    { path: '/cart', component: CartView },
    { path: '/stores', component: StoreFinderView },
    { path: '/ideas', component: IdeasView },
  ],
  scrollBehavior() { return { top: 0 } }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
