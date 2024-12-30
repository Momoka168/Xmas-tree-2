<template>
  <div class="product-details">
    <div class="product-container">
      <!-- Images Section -->
      <div class="product-images card-style">
        <div class="main-image-container">
          <img 
            :src="selectedImage" 
            :alt="product.name" 
            class="main-image"
            :class="{ 'zoomed': isZoomed }"
            @mouseover="isZoomed = true"
            @mouseleave="isZoomed = false"
          >
        </div>
        <div class="thumbnail-gallery">
          <div v-for="(image, index) in productImages" 
               :key="index" 
               class="thumbnail-wrapper"
               :class="{ active: selectedImageIndex === index }"
               @click="selectImage(index)">
            <img :src="image" :alt="`${product.name} - vue ${index + 1}`">
          </div>
        </div>
      </div>

      <!-- Product Info Section -->
      <div class="product-info card-style">
        <h1>{{ product.name }}</h1>
        <p class="price">{{ selectedPrice }}€</p>

        <!-- Size Selection -->
        <div class="size-selection">
          <h3>Hauteur</h3>
          <div class="size-options">
            <button 
              v-for="(height, size) in product?.sizes" 
              :key="size"
              :class="{ 
                active: selectedSize === size,
                'out-of-stock': stocksParTaille[size] === 0
              }"
              @click="selectSize(size)"
              :disabled="stocksParTaille[size] === 0"
            >
              {{ height }}
              <span class="stock-info" :class="{ 'low-stock': stocksParTaille[size] <= 2 }">
                ({{ stocksParTaille[size] }} {{ stocksParTaille[size] <= 1 ? 'unité' : 'unités' }})
              </span>
            </button>
          </div>
        </div>

        <!-- Quantity Selection -->
        <div class="quantity-selector">
          <label>Quantité</label>
          <div class="quantity-controls">
            <button 
              class="quantity-btn"
              @click="decrementQuantity" 
              :disabled="quantity <= 1"
            >
              <i class="fas fa-minus"></i>
            </button>
            <input 
              type="number" 
              v-model="quantity" 
              :max="stockDisponible"
              min="1"
              @input="validateQuantity"
              readonly
            >
            <button 
              class="quantity-btn"
              @click="incrementQuantity"
              :disabled="quantity >= stockDisponible"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <p v-if="quantity >= stockDisponible" class="stock-warning">
            Stock limité à {{ stockDisponible }} {{ stockDisponible <= 1 ? 'unité' : 'unités' }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="actions">
          <button 
            class="add-to-cart-btn" 
            @click="addToCart"
            :disabled="stocksParTaille[selectedSize] === 0"
          >
            {{ stocksParTaille[selectedSize] === 0 ? 'Rupture de stock' : 'Ajouter au panier' }}
          </button>
          <button 
            class="favorite-btn"
            @click="toggleFavorite(product.id, selectedSize)"
            :class="{ 'is-favorite': isInFavorites(product.id, selectedSize) }"
          >
            <i class="fas fa-heart"></i>
          </button>
        </div>

        <!-- Product Information Accordion -->
        <div class="product-details-accordion">
          <details>
            <summary>Description</summary>
            <div class="details-content">
              <p>{{ product.description }}</p>
            </div>
          </details>

          <details>
            <summary>Livraison</summary>
            <div class="details-content">
              <p><i class="fas fa-truck"></i> Livraison gratuite à partir de 300€</p>
              <p><i class="fas fa-clock"></i> Livraison en 48-72h</p>
              <p><i class="fas fa-map-marker-alt"></i> Livraison à domicile ou en point relais</p>
              <p><i class="fas fa-calendar-alt"></i> Livraison garantie avant Noël pour toute commande avant le 20 décembre</p>
            </div>
          </details>

          <details>
            <summary>Garanties & Retours</summary>
            <div class="details-content">
              <p><i class="fas fa-shield-alt"></i> Garantie qualité 2 ans</p>
              <p><i class="fas fa-exchange-alt"></i> Échange possible jusqu'au 24 décembre</p>
              <p><i class="fas fa-undo"></i> Remboursement sous 14 jours</p>
              <p><i class="fas fa-check-circle"></i> Sapins contrôlés et certifiés</p>
            </div>
          </details>

          <details>
            <summary>Conseils d'entretien</summary>
            <div class="details-content">
              <p><i class="fas fa-temperature-low"></i> Conserver dans un endroit frais et sec</p>
              <p><i class="fas fa-hands-wash"></i> Nettoyer régulièrement avec un chiffon doux</p>
              <p><i class="fas fa-box"></i> Stockage facile grâce au système pliable</p>
              <p><i class="fas fa-fire-alt"></i> Traité anti-feu pour votre sécurité</p>
            </div>
          </details>
        </div>
      </div>
    </div>

    <!-- Recommended Products -->
    <ProductRecommended :current-product-id="product?.id" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useFavorites } from '@/composables/useFavorites'
import ProductRecommended from '@/components/ProductRecommended.vue'

// Import des images
import formeImage from '@/assets/images/2SAPIN/Forme.jpg'
import imageA from '@/assets/images/2SAPIN/A.webp'
import imageB from '@/assets/images/2SAPIN/B.webp'

const route = useRoute()
const store = useStore()
const { toggleFavorite, isInFavorites } = useFavorites()

// États locaux
const selectedSize = ref('Moyen')
const quantity = ref(1)
const selectedImageIndex = ref(0)
const isZoomed = ref(false)

// Simulation de stocks
const generateRandomStock = () => Math.floor(Math.random() * 5) + 0

const stocksParTaille = ref({
  'Petit': generateRandomStock(),
  'Moyen': generateRandomStock(),
  'Grand': generateRandomStock()
})

// Computed properties
const stockDisponible = computed(() => stocksParTaille.value[selectedSize.value])

const product = computed(() => 
  store.state.products.find(p => p.id === parseInt(route.params.id))
)

const selectedPrice = computed(() => 
  product.value?.prices[selectedSize.value]
)

const productImages = computed(() => {
  if (!product.value) return []
  
  const mainImage = product.value.image
  const secondaryImage = product.value.id % 2 === 0 ? imageA : imageB

  return [
    mainImage,
    formeImage,
    secondaryImage
  ]
})

const selectedImage = computed(() => 
  productImages.value[selectedImageIndex.value] || product.value?.image
)

// Méthodes
const selectImage = (index) => {
  selectedImageIndex.value = index
}

const selectSize = (size) => {
  selectedSize.value = size
  quantity.value = 1 // Réinitialiser la quantité lors du changement de taille
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const incrementQuantity = () => {
  if (quantity.value < stockDisponible.value) {
    quantity.value++
  }
}

const validateQuantity = () => {
  let value = parseInt(quantity.value)
  if (isNaN(value) || value < 1) {
    quantity.value = 1
  } else if (value > stockDisponible.value) {
    quantity.value = stockDisponible.value
  }
}

const addToCart = () => {
  if (product.value && selectedSize.value && quantity.value <= stockDisponible.value) {
    store.dispatch('addToCart', {
      product: product.value,
      selectedSize: selectedSize.value,
      quantity: quantity.value
    })

    // Mettre à jour le stock
    stocksParTaille.value[selectedSize.value] -= quantity.value
    
    // Réinitialiser la quantité
    quantity.value = 1

    // Notification de succès
    store.dispatch('showNotification', {
      type: 'success',
      message: 'Produit ajouté au panier avec succès!'
    })
  }
}

// Lifecycle hooks
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
<style scoped>
.product-details {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.card-style {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Images Section */
.product-images {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  aspect-ratio: 1;
  background: white;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.main-image.zoomed {
  transform: scale(1.2);
}

.thumbnail-gallery {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.thumbnail-wrapper {
  width: 80px;
  height: 80px;
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.thumbnail-wrapper.active {
  border-color: #c41e3a;
}

.thumbnail-wrapper:hover {
  transform: translateY(-2px);
}

.thumbnail-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Info Section */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

h1 {
  font-size: 2rem;
  color: #0B3B24;
  margin-bottom: 0.5rem;
}

.price {
  font-size: 1.8rem;
  color: #c41e3a;
  font-weight: bold;
}

/* Size Selection */
.size-selection {
  margin-bottom: 1rem;
}

.size-options {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.size-options button {
  padding: 0.8rem 1.2rem;
  border: 2px solid #ddd;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.size-options button.active {
  border-color: #c41e3a;
  background: #c41e3a;
  color: white;
}

.size-options button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.stock-info {
  font-size: 0.8rem;
  color: #666;
}

.low-stock {
  color: #c41e3a;
}

/* Quantity Selector */
.quantity-selector {
  margin: 1rem 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 150px;
}

.quantity-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quantity-btn:hover:not(:disabled) {
  border-color: #c41e3a;
  color: #c41e3a;
}

.quantity-controls input {
  width: 60px;
  height: 36px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

/* Action Buttons */
.actions {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.add-to-cart-btn {
  flex: 1;
  padding: 1rem;
  background: #0B3B24;
  color: white;
  border: 2px solid #c41e3a;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #c41e3a;
  border-color: #0B3B24;
}

.favorite-btn {
  width: 50px;
  height: 50px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.favorite-btn i {
  font-size: 1.2rem;
  color: #ddd;
  transition: color 0.3s ease;
}

.favorite-btn.is-favorite i {
  color: #c41e3a;
}

/* Accordion Styles */
.product-details-accordion {
  margin-top: 1.5rem;
}

details {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

summary {
  padding: 1rem;
  cursor: pointer;
  font-weight: 600;
  background: #f8f8f8;
  border-radius: 8px;
  transition: all 0.3s ease;
  user-select: none;
}

summary:hover {
  background: #f0f0f0;
}

.details-content {
  padding: 1rem;
  background: white;
}

.details-content p {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  color: #333;
}

.details-content i {
  color: #0B3B24;
  width: 20px;
}

/* Stock Warning */
.stock-warning {
  color: #c41e3a;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .product-container {
    gap: 1.5rem;
  }
}

@media (max-width: 992px) {
  .product-container {
    grid-template-columns: 1fr;
  }
  
  .card-style {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .product-details {
    padding: 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .thumbnail-wrapper {
    width: 60px;
    height: 60px;
  }

  .size-options button {
    padding: 0.6rem 1rem;
  }

  .details-content p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .card-style {
    padding: 1rem;
  }

  .actions {
    flex-direction: column;
  }

  .favorite-btn {
    width: 100%;
    height: 40px;
  }
}
</style>