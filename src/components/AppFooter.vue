<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="logo">
            <span class="logo-az">AZ</span>
            <span class="logo-name">Carpet's & Flooring</span>
          </div>
          <p>Supply and fitting available. Specialists in all types of carpet, laminate, carpet tiles, LVT and vinyl flooring.</p>
          <div class="contact-links">
            <a href="mailto:azcarpet1@gmail.com">azcarpet1@gmail.com</a>
            <a href="tel:07762341752">07762 341752</a>
            <a href="tel:07594095455">07594 095455</a>
          </div>
          <div class="socials">
            <a href="#" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="Pinterest">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Products</h4>
          <RouterLink v-for="cat in categories" :key="cat.id" :to="`/products/${cat.id}`">{{ cat.name }}</RouterLink>
          <RouterLink to="/products">Offers & deals</RouterLink>
        </div>

        <div class="footer-col">
          <h4>Services</h4>
          <a href="#">Book home visit</a>
          <RouterLink to="/stores">Find a store</RouterLink>
          <a href="#">Free measuring</a>
          <a href="#">Fitting service</a>
          <a href="#">Order a sample</a>
          <a href="#">PictureIT tool</a>
        </div>

        <div class="footer-col">
          <h4>Help & info</h4>
          <a href="#">About us</a>
          <RouterLink to="/ideas">Ideas Hub</RouterLink>
          <a href="#">Contact us</a>
          <a href="#">FAQs</a>
          <a href="#">Careers</a>
          <a href="#">Privacy policy</a>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© 2026 AZ Carpet's & Flooring. All rights reserved.</p>
        <div class="payment-icons">
          <span class="pill">Visa</span>
          <span class="pill">Mastercard</span>
          <span class="pill">Amex</span>
          <span class="pill">PayPal</span>
          <span class="pill">Klarna</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { categories } from '../data/dummy.js'
</script>

<style scoped>
.footer {
  background: #111;
  color: rgba(255,255,255,0.6);
  padding: 40px 0 24px;
  margin-top: 48px;
}

@media (min-width: 768px) {
  .footer { padding: 56px 0 32px; margin-top: 80px; }
}
.footer-top {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-bottom: 40px;
}

@media (min-width: 640px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

@media (min-width: 1024px) {
  .footer-top {
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 40px;
    margin-bottom: 48px;
  }
}
.logo {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}
.logo-az {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  color: var(--tapi-red);
}
.logo-name {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 500;
  color: white;
}
.footer-brand p { font-size: 13px; line-height: 1.7; max-width: 100%; margin-bottom: 16px; }
.contact-links {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}
.contact-links a {
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  transition: color var(--transition);
}
.contact-links a:hover { color: var(--tapi-red); }

@media (min-width: 1024px) {
  .footer-brand p { max-width: 220px; }
}
.socials { display: flex; gap: 12px; }
.socials a {
  width: 34px; height: 34px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.15);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.6);
  transition: all var(--transition);
}
.socials a:hover { background: rgba(255,255,255,0.1); color: white; border-color: rgba(255,255,255,0.3); }

.footer-col h4 { color: white; font-size: 13px; font-weight: 500; margin-bottom: 16px; letter-spacing: 0.3px; }
.footer-col a {
  display: block;
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  margin-bottom: 10px;
  transition: color var(--transition);
}
.footer-col a:hover { color: rgba(255,255,255,0.9); }

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

@media (min-width: 640px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 24px;
  }
}
.footer-bottom p { font-size: 12px; }
.payment-icons { display: flex; gap: 8px; }
.pill {
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.6);
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.12);
}
</style>
