<template>
  <div class="catalog-page">
    <div class="catalog-header">
      <h1>Nos Sapins de Noël</h1>
 
      <div class="filters-wrapper">
        <div class="search-bar">
          <input 
            type="text" 
            v-model="filters.search"
            placeholder="Rechercher un sapin..."
            class="search-input"
          >
          <button class="search-button">
            <i class="fas fa-search"></i>
          </button>
        </div>
 
        <div class="filters">
          <div class="filter-group">
            <label for="category">Catégorie</label>
            <select id="category" v-model="filters.category">
              <option value="">✓ Toutes les catégories</option>
              <option value="Premium">Premium</option>
              <option value="Nordic">Nordic</option>
              <option value="Classique">Classique</option>
              <option value="Enneigé">Enneigé</option>
              <option value="Naturel">Naturel</option>
            </select>
          </div>
 
          <div class="filter-group">
            <label for="sort">Tri</label>
            <select id="sort" v-model="filters.sort">
              <option value="">Par défaut</option>
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
            </select>
          </div>
        </div>
      </div>
    </div>
 
    <!-- Message si aucun produit trouvé -->
    <div v-if="searchFilteredProducts.length === 0" class="no-results">
      <p>Aucun sapin ne correspond à votre recherche "{{ filters.search }}"</p>
    </div>
 
    <!-- Notification d'ajout au panier -->
    <div 
      v-if="showNotification" 
      class="notification-success"
      @animationend="showNotification = false"
    >
      <i class="fas fa-check-circle"></i>
      Votre sapin a été ajouté au panier avec succès !
    </div>
 
    <!-- Grille des produits -->
    <div v-else class="products-grid">
      <div v-for="product in searchFilteredProducts" :key="product.id" class="product-card">
        <router-link :to="`/product/${product.id}`" class="product-image-link">
          <div class="product-image">
            <img :src="product.image" :alt="product.name">
            <div class="quick-actions" @click.stop>
              <button class="favorite-btn" @click="toggleFavorite(product.id)" 
                      :class="{ 'is-favorite': isInFavorites(product.id) }">
                <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </router-link>
 
        <div class="product-info">
          <router-link :to="`/product/${product.id}`">
            <h3>{{ product.name }}</h3>
          </router-link>
          <p class="description">{{ product.description }}</p>
 
          <div class="pricing-section">
            <div class="price-display" v-if="selectedSizes[product.id]">
              <span class="current-price">{{ formatPrice(product.prices[selectedSizes[product.id]]) }}€</span>
            </div>
          </div>
 
          <div class="size-selector">
            <label for="size" class="size-instruction">Sélectionnez votre taille pour continuer</label>
            <div class="size-buttons">
              <button v-for="(height, size) in product.sizes" 
                      :key="size" 
                      class="size-btn" 
                      :class="{ 'selected': selectedSizes[product.id] === size }" 
                      @click="selectSize(product.id, size)">
                {{ size }} ({{ height }}) - {{ formatPrice(product.prices[size]) }}€
              </button>
            </div>
          </div>
 
          <button class="add-to-cart" 
                  @click="addToCart(product)" 
                  :disabled="!selectedSizes[product.id]">
            <i class="fas fa-shopping-cart"></i>
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  </div>
 </template>
 
 <script setup>
 import { ref, computed, watch } from 'vue'
 import { useStore } from 'vuex'
 import { useFavorites } from '@/composables/useFavorites'
 import { useRouter } from 'vue-router'
 
 const router = useRouter()
 const store = useStore()
 const { isInFavorites, toggleFavorite } = useFavorites()
 const selectedSizes = ref({})
 const showNotification = ref(false)
 const filters = ref({
  category: '',
  sort: '',
  search: ''
 })
 
 const filteredProducts = computed(() => store.getters.filteredProducts)
 
 const searchFilteredProducts = computed(() => {
  let products = filteredProducts.value
 
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase()
    products = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    )
  }
 
  return products
 })
 
 const formatPrice = (price) => {
  return parseFloat(price).toFixed(2)
 }
 
 const selectSize = (productId, size) => {
  selectedSizes.value[productId] = size
 }
 
 const addToCart = (product) => {
  if (selectedSizes.value[product.id]) {
    store.dispatch('addToCart', {
      product,
      selectedSize: selectedSizes.value[product.id],
      quantity: 1
    })
    showNotification.value = true
    setTimeout(() => {
      showNotification.value = false
    }, 8000) // Augmenté à 8 secondes
  }
 }
 
 watch(filters, (newFilters) => {
  store.dispatch('updateFilters', {
    category: newFilters.category,
    sort: newFilters.sort
  })
 }, { deep: true })
 </script>
 
 <style scoped>
 .catalog-page {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
 }
 
 .catalog-header {
  margin-bottom: 2rem;
 }
 
 h1 {
  color: #0B3B24;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Font2', serif;
  font-size: 3rem;
 }
 
 .filters-wrapper {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
 }
 
 .search-bar {
  display: flex;
  align-items: center;
  height: 50px;
  background: white;
  border: 2px solid #eee;
  border-radius: 25px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
 }
 
 .search-bar:focus-within {
  border-color: #0B3B24;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
 }
 
 .search-input {
  flex: 1;
  height: 100%;
  padding: 0 1.5rem;
  border: none;
  outline: none;
  font-size: 1rem;
  background: transparent;
 }
 
 .search-button {
  width: 50px;
  height: 100%;
  border: none;
  background: #0B3B24;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
 }
 
 .search-button:hover {
  background: #0a2e1c;
 }
 
 .filters {
  display: flex;
  gap: 2rem;
  justify-content: center;
  padding: 1rem;
  background: white;
  border-radius: 15px;
 }
 
 .filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-width: 200px;
 }
 
 .filter-group label {
  font-size: 1rem;
  color: #333;
  font-weight: 600;
 }
 
 .filters select {
  padding: 0.75rem;
  border: 2px solid #eee;
  border-radius: 12px;
  min-width: 200px;
  appearance: none;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
 }
 
 .filters select:hover, .filters select:focus {
  border-color: #0B3B24;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
 }
 
 .filters select option {
  padding: 10px;
 }
 
 .filters select option:checked {
  background-color: #FFC0CB;
  color: #333;
 }
 
 .no-results {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  margin: 2rem 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
 }
 
 .no-results p {
  color: #666;
  font-size: 1.1rem;
 }
 
 .notification-success {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #0B3B24;
  color: white;
  padding: 1.2rem 2rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(11, 59, 36, 0.2);
  animation: slideIn 0.3s ease-out, fadeOut 0.3s ease-out 7.7s forwards;
  z-index: 1000;
  font-size: 1rem;
 }
 
 .notification-success i {
  color: #4CAF50;
  font-size: 1.2rem;
 }
 
 @keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
 }
 
 @keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
 }
 
 .products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
 }
 
 .product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
 }
 
 .product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
 }
 
 .product-image-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: block;
 }
 
 .product-image {
  position: relative;
  padding-top: 100%;
  background: #f8f8f8;
 }
 
 .product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
 }
 
 .quick-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
 }
 
 .favorite-btn {
  background: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
 }
 
 .favorite-btn i {
  color: #ddd;
  transition: color 0.3s ease;
 }
 
 .favorite-btn.is-favorite i {
  color: #c41e3a;
 }
 
 .product-info {
  padding: 1.5rem;
 }
 
 .product-info h3 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
 }
 
 .product-info a {
  text-decoration: none;
  color: inherit;
 }
 
 .description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.4;
 }
 
 .pricing-section {
  margin: 1rem 0;
 }
 
 .price-display {
  display: flex;
  gap: 0.75rem;
  align-items: center;
 }
 
 .current-price {
  font-size: 1.25rem;
  font-weight: 600;
  color: #c41e3a;
 }
 
 .size-selector {
  margin-bottom: 1.5rem;
 }
 
 .size-instruction {
  display: block;
  margin-bottom: 0.8rem;
  color: #333;
  font-size: 0.95rem;
  font-weight: 500;
 }
 
 .size-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
 }
 
 .size-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #f8f8f8;
  cursor: pointer;
  transition: all 0.3s ease;
 }
 
 .size-btn.selected {
  border-color: #0B3B24;
  background-color: #0B3B24;
  color: white;
 }
 
 .add-to-cart {
  width: 100%;
  padding: 1rem;
  background: #0B3B24;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.3s;
 }
 
 .add-to-cart:hover {
  background: #0a2e1c;
 }
 
 .add-to-cart:disabled {
  background: #ddd;
  cursor: not-allowed;
 }
 
 @media (max-width: 768px) {
  .catalog-page {
    padding: 1rem;
  }
 
  .search-bar {
    width: 100%;
  }
 
  .filters {
    flex-direction: column;
    gap: 1rem;
 }

 .filter-group {
   width: 100%;
 }

 .filters select {
   width: 100%;
 }

 .products-grid {
   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
 }

 h1 {
   font-size: 2rem;
 }

 .notification-success {
   bottom: 1rem;
   right: 1rem;
   left: 1rem;
   padding: 1rem;
   font-size: 0.9rem;
 }
}

@media (max-width: 480px) {
 .catalog-page {
   padding: 0.5rem;
 }

 .filters-wrapper {
   padding: 1rem;
 }

 .search-bar {
   height: 45px;
 }

 .search-input {
   font-size: 0.9rem;
 }

 .filters select {
   padding: 0.6rem;
   font-size: 0.9rem;
 }

 .product-card {
   border-radius: 8px;
 }

 .size-buttons {
   flex-direction: column;
 }

 .size-btn {
   width: 100%;
   text-align: center;
 }
}
</style>