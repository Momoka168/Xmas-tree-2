<template>
  <div class="favorites-page">
    <div class="favorites-container">
      <h1>Mes Favoris</h1>
 
      <div class="favorites-content" v-if="favoriteProducts.length > 0">
        <div class="products-grid">
          <div v-for="product in favoriteProducts" 
               :key="product.id" 
               class="product-card">
            <div class="product-image">
              <span v-if="product.discount" class="discount">
                {{ product.discount }}
              </span>
              <img :src="product.image" :alt="product.name">
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <div class="price-info">
                <span class="price-range">
                  {{ formatPrice(product.prices.Petit) }}€ - {{ formatPrice(product.prices.Grand) }}€
                </span>
              </div>
              <div class="button-container">
                <button class="view-btn" @click="viewProduct(product.id)">
                  Voir le produit
                </button>
                <button class="add-btn" @click="openSizeSelector(product)">
                  Ajouter au panier
                </button>
              </div>
              <button class="remove-btn" @click="removeFromFavorites(product.id)">
                <i class="fas fa-times"></i>
                Retirer des favoris
              </button>
            </div>
          </div>
        </div>
      </div>
 
      <div class="empty-favorites" v-else>
        <i class="far fa-heart empty-icon"></i>
        <h2>Votre liste de favoris est vide</h2>
        <p>Parcourez notre catalogue et ajoutez vos sapins préférés !</p>
        <router-link to="/catalog" class="discover-btn">
          Découvrir nos sapins
        </router-link>
      </div>
 
      <!-- Modal de sélection de taille -->
      <div class="modal" v-if="showSizeSelector">
        <div class="modal-content">
          <h3>Choisissez la taille :</h3>
          <div class="size-options">
            <button 
              v-for="(price, size) in selectedProduct?.prices" 
              :key="size"
              @click="selectSize(size, price)"
              class="size-option"
            >
              {{ size }} ({{ formatPrice(price) }}€)
            </button>
          </div>
          <div class="modal-buttons">
            <button class="cancel-btn" @click="closeSizeSelector">Annuler</button>
          </div>
        </div>
      </div>
 
      <div class="success-message" v-if="showSuccess">
        Article ajouté au panier avec succès !
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useFavorites } from '@/composables/useFavorites'

const store = useStore()
const router = useRouter()
const { toggleFavorite } = useFavorites()

const showSizeSelector = ref(false)
const showSuccess = ref(false)
const selectedProduct = ref(null)

const favoriteProducts = computed(() => store.getters.favoriteProducts)

const formatPrice = (price) => {
  return parseFloat(price).toFixed(2)
}

const viewProduct = (productId) => {
  router.push(`/product/${productId}`)
}

const openSizeSelector = (product) => {
  selectedProduct.value = product
  showSizeSelector.value = true
}

const closeSizeSelector = () => {
  showSizeSelector.value = false
  selectedProduct.value = null
}

const selectSize = (size, price) => {
  store.dispatch('addToCart', {
    product: selectedProduct.value,
    selectedSize: size,
    quantity: 1
  })
  
  closeSizeSelector()
  showSuccess.value = true
  
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}

const removeFromFavorites = (productId) => {
  store.dispatch('toggleFavoriteWithSize', {
    productId: productId,
    size: 'Moyen',
    silent: true
  })
}
</script>

 <style scoped>
 .favorites-page {
  min-height: calc(100vh - 350px);
  padding: 2rem 0;
 }
 
 .favorites-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
 }
 
 h1 {
  text-align: center;
  color: #0B3B24;
  font-family: 'Font2', serif;
  font-size: 3rem;
  margin-bottom: 3rem;
 }
 
 .products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
 }
 
 .product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
 }
 
 .product-image {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
 }
 
 .product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
 }
 
 .product-info {
  padding: 1.5rem;
  text-align: center;
 }
 
 .product-info h3 {
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1rem;
 }
 
 .price-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
 }
 
 .price-range {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0B3B24;
 }
 
 .discount {
  color: #c41e3a;
  font-weight: 600;
 }
 
 .button-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
 }
 
 .view-btn, .add-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: 500;
 }
 
 .view-btn {
  background: #0B3B24;
  color: white;
 }
 
 .view-btn:hover {
  background: #0a2e1c;
 }
 
 .add-btn {
  background: #c41e3a;
  color: white;
 }
 
 .add-btn:hover {
  background: #a01830;
 }
 
 .remove-btn {
  width: 100%;
  padding: 0.5rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
 }
 
 .remove-btn:hover {
  color: #c41e3a;
 }
 
 .empty-favorites {
  text-align: center;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
 }
 
 .empty-icon {
  font-size: 4rem;
  color: #c41e3a;
  margin-bottom: 1.5rem;
 }
 
 .empty-favorites h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
 }
 
 .empty-favorites p {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.2rem;
 }
 
 .discover-btn {
  display: inline-block;
  padding: 1rem 2rem;
  background: #0B3B24;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s;
  font-weight: 500;
 }
 
 .discover-btn:hover {
  background: #0a2e1c;
 }
 
 .modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
 }
 
 .modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
 }
 
 .size-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1.5rem 0;
 }
 
 .size-option {
  padding: 1rem;
  border: none;
  background: #f5f5f5;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: 500;
 }
 
 .size-option:hover {
  background: #e0e0e0;
 }
 
 .modal-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
 }
 
 .cancel-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  background: #666;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
 }
 
 .cancel-btn:hover {
  background: #555;
 }
 
 .success-message {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #0B3B24;
  color: white;
  padding: 1rem 2rem;
  border-radius: 6px;
  animation: slideIn 0.3s ease-out;
  z-index: 1000;
 }
 
 @keyframes slideIn {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
 }
 
 @media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  h1 {
    font-size: 2.5rem;
  }
 }
 
 @media (max-width: 768px) {
  .favorites-page {
    min-height: calc(100vh - 250px);
  }
 
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .button-container {
    flex-direction: column;
  }
  
  .modal-content {
    margin: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .empty-favorites h2 {
    font-size: 1.75rem;
  }
 }
 </style>