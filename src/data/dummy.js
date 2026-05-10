export const categories = [
  { id: 'carpet', name: 'Carpet', icon: '🧶', desc: 'Soft & warm underfoot', count: 142 },
  { id: 'vinyl', name: 'Vinyl', icon: '🪟', desc: 'Practical & durable', count: 98 },
  { id: 'laminate', name: 'Laminate', icon: '🪵', desc: 'Family friendly', count: 76 },
  { id: 'luxury-vinyl', name: 'Luxury Vinyl', icon: '✨', desc: 'Water resistant & stylish', count: 63 },
  { id: 'engineered-wood', name: 'Engineered Wood', icon: '🌳', desc: 'Natural & innovative', count: 44 },
]

export const products = [
  { id: 1, name: 'Kenmore Twist', category: 'carpet', price: 18.99, unit: 'm²', color: '#b09870', colors: ['#b09870','#8a8a7a','#c4b89c','#6b5a48'], badge: 'Bestseller', rating: 4.8, reviews: 312, desc: 'A classic medium-weight twist pile carpet with excellent durability. Bleach cleanable and perfect for busy family homes.' },
  { id: 2, name: 'Ashford Loop', category: 'carpet', price: 14.99, unit: 'm²', color: '#9e9e8a', colors: ['#9e9e8a','#c8c8b4','#6e6e5a'], badge: null, rating: 4.6, reviews: 198, desc: 'Durable loop pile carpet ideal for hallways, stairs and landings. Highly stain resistant.' },
  { id: 3, name: 'Saxony Supreme', category: 'carpet', price: 26.99, unit: 'm²', color: '#d4c4a8', colors: ['#d4c4a8','#b8a88c','#ede0cc'], badge: 'Premium', rating: 4.9, reviews: 87, desc: 'Ultra-soft saxony carpet that creates a luxurious feel in bedrooms and living rooms.' },
  { id: 4, name: 'Oslo Oak', category: 'laminate', price: 22.99, unit: 'm²', color: '#c8a87a', colors: ['#c8a87a','#a88a5a','#e0c49a'], badge: null, rating: 4.7, reviews: 241, desc: 'Realistic wood-look laminate with a warm oak finish. AC4 rating for high-traffic areas.' },
  { id: 5, name: 'Metro Stone', category: 'vinyl', price: 19.49, unit: 'm²', color: '#a0a098', colors: ['#a0a098','#d0d0c8','#707068'], badge: 'New', rating: 4.5, reviews: 54, desc: 'Stylish stone-effect vinyl flooring with waterproof core. Perfect for kitchens and bathrooms.' },
  { id: 6, name: 'Herringbone LVT', category: 'luxury-vinyl', price: 34.99, unit: 'm²', color: '#b89060', colors: ['#b89060','#9a7040','#d4b080'], badge: 'Premium', rating: 4.9, reviews: 133, desc: 'Classic herringbone pattern in luxury vinyl. Water resistant and incredibly realistic wood look.' },
  { id: 7, name: 'Nordic Birch', category: 'engineered-wood', price: 44.99, unit: 'm²', color: '#d4c09a', colors: ['#d4c09a','#b8a070','#eedfc0'], badge: 'New', rating: 4.8, reviews: 66, desc: 'Light Scandinavian-style engineered wood with a brushed matte finish.' },
  { id: 8, name: 'Velvet Bay', category: 'carpet', price: 21.99, unit: 'm²', color: '#7a8a7a', colors: ['#7a8a7a','#9aaa9a','#5a6a5a'], badge: null, rating: 4.7, reviews: 159, desc: 'Sumptuous velvet pile carpet with a subtle sheen. Adds elegance to any room.' },
  { id: 9, name: 'Barnwood Plank', category: 'laminate', price: 17.99, unit: 'm²', color: '#9a7a5a', colors: ['#9a7a5a','#7a5a3a','#baa07a'], badge: 'Sale', rating: 4.4, reviews: 302, desc: 'Rustic reclaimed-look laminate. Adds character and warmth to any space.' },
  { id: 10, name: 'Coastal Grey', category: 'vinyl', price: 15.99, unit: 'm²', color: '#b0b8c0', colors: ['#b0b8c0','#d0d8e0','#909aa0'], badge: null, rating: 4.6, reviews: 211, desc: 'Cool coastal-inspired vinyl with subtle texture. Wipe-clean and waterproof.' },
  { id: 11, name: 'Amber Walnut', category: 'engineered-wood', price: 52.99, unit: 'm²', color: '#a06830', colors: ['#a06830','#7a4810','#c08850'], badge: 'Premium', rating: 4.9, reviews: 44, desc: 'Rich walnut engineered wood with a natural oiled finish. Warm and sophisticated.' },
  { id: 12, name: 'Crystal LVT', category: 'luxury-vinyl', price: 28.99, unit: 'm²', color: '#c0d0c0', colors: ['#c0d0c0','#a0b0a0','#e0f0e0'], badge: null, rating: 4.6, reviews: 97, desc: 'Light, airy luxury vinyl with a subtle marble-effect. Ideal for open-plan spaces.' },
]

export const reviews = [
  { id: 1, name: 'James T.', location: 'London', stars: 5, text: 'The team were incredibly helpful from start to finish. The fitting was done perfectly and we are absolutely delighted with our new carpet.', product: 'Kenmore Twist', date: '2 weeks ago' },
  { id: 2, name: 'Sarah M.', location: 'Manchester', stars: 5, text: 'Excellent showroom. The advisor understood our requirements fully and made the whole purchasing process very simple. Highly recommend.', product: 'Oslo Oak', date: '1 month ago' },
  { id: 3, name: 'David & Lisa K.', location: 'Bristol', stars: 5, text: 'Ian arrived on time with samples, answered all our questions and was professional throughout. Customer service is genuinely outstanding.', product: 'Herringbone LVT', date: '3 weeks ago' },
]

export const services = [
  { icon: '📐', title: 'Free measuring & planning', desc: 'Expert help at every step of your project' },
  { icon: '🚐', title: 'Home visit service', desc: '230+ mobile showrooms travel to your door' },
  { icon: '💳', title: '0% interest-free credit', desc: 'Up to 4 years, no deposit, no extra cost' },
  { icon: '🛡️', title: 'Wear guarantee', desc: 'Peace of mind on every floor we sell' },
]

export const stores = [
  { id: 1, name: 'Tapi London Bridge', address: '15 Tooley Street, London SE1 2PF', phone: '020 7403 1234', hours: 'Mon–Sat 9–6, Sun 10–5', distance: '0.3 miles' },
  { id: 2, name: 'Tapi Bromley', address: '42 High Street, Bromley BR1 1DY', phone: '020 8464 5678', hours: 'Mon–Sat 9–6, Sun 10–4', distance: '8.2 miles' },
  { id: 3, name: 'Tapi Croydon', address: '101 Church Street, Croydon CR0 1RF', phone: '020 8688 9012', hours: 'Mon–Sat 9–6, Sun 10–5', distance: '11.5 miles' },
  { id: 4, name: 'Tapi Kingston', address: '55 London Road, Kingston KT2 6QE', phone: '020 8546 3456', hours: 'Mon–Sat 9–6, Sun 10–5', distance: '14.1 miles' },
]

export const inspiration = [
  { id: 1, title: 'Living Room', subtitle: 'Soft & stylish', bg: '#b09870', size: 'large' },
  { id: 2, title: 'Kitchen & Hallway', subtitle: 'Practical & durable', bg: '#8a9e9e', size: 'small' },
  { id: 3, title: 'Bedroom Bliss', subtitle: 'Cosy & luxurious', bg: '#9e9e8a', size: 'small' },
  { id: 4, title: 'Luxury Vinyl', subtitle: 'Modern & waterproof', bg: '#a08870', size: 'small' },
  { id: 5, title: 'Engineered Wood', subtitle: 'Natural character', bg: '#7a8a7a', size: 'small' },
]
