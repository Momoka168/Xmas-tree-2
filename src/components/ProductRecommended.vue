<template>
  <div class="recommended-products">
    <h2>Vous aimerez peut-être aussi...</h2>
    <div class="products-grid">
      <div v-for="recommendedProduct in recommendedProducts" 
           :key="recommendedProduct.id" 
           class="product-card">
        <router-link :to="`/product/${recommendedProduct.id}`" class="product-link">
          <div class="product-image">
            <img :src="recommendedProduct.image" :alt="recommendedProduct.name">
          </div>
          <div class="product-info">
            <h3>{{ recommendedProduct.name }}</h3>
            <div class="price-range">
              <span>{{ recommendedProduct.prices['Petit'] }}€ - {{ recommendedProduct.prices['Grand'] }}€</span>
              <span v-if="recommendedProduct.discount" class="discount">{{ recommendedProduct.discount }}</span>
            </div>
            <button class="view-btn" @click.stop="goToProductDetails(recommendedProduct.id)">
              Voir le produit
            </button>
          </div>
        </router-link>
      </div>
    </div>
  </div>
 </template>
 
 <script setup>
 import { computed } from 'vue'
 import { useStore } from 'vuex'
 import { useRouter } from 'vue-router'
 
 const props = defineProps({
  currentProductId: {
    type: [Number, String],
    required: true
  }
 })
 
 const store = useStore()
 const router = useRouter()
 
 const recommendedProducts = computed(() => {
  const products = store.state.products
  if (!products) return []
  
  return products
    .filter(p => p.id !== parseInt(props.currentProductId))
    .slice(0, 4)
 })
 
 const goToProductDetails = (productId) => {
  router.push(`/product/${productId}`)
 }
 </script>
 
 <style scoped>
 .recommended-products {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
 }
 
 .recommended-products h2 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #0B3B24;
 }
 
 .products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
 }
 
 .product-card {
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background: white;
 }
 
 .product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
 }
 
 .product-link {
  text-decoration: none;
  color: inherit;
  display: block;
 }
 
 .product-image {
  aspect-ratio: 1;
  overflow: hidden;
  background: white;
  padding: 1rem;
 }
 
 .product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
 }
 
 .product-card:hover .product-image img {
  transform: scale(1.05);
 }
 
 .product-info {
  padding: 1.5rem;
  background: white;
  text-align: center;
 }
 
 .product-info h3 {
  margin: 0;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
 }
 
 .price-range {
  margin: 0.5rem 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
 }
 
 .price-range span {
  color: #0B3B24;
  font-weight: bold;
 }
 
 .discount {
  color: #c41e3a;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  background: #ffebee;
  border-radius: 4px;
 }
 
 .view-btn {
  width: 100%;
  padding: 0.8rem;
  background: #0B3B24;
  color: white;
  border: 2px solid #c41e3a;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
 }
 
 .view-btn:hover {
  background: #c41e3a;
  border-color: #0B3B24;
 }
 
 @media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
 
  .recommended-products h2 {
    font-size: 1.5rem;
  }
 
  .product-info h3 {
    font-size: 1rem;
  }
 }
 
 @media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
 }
 </style>