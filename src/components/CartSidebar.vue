<template>
  <div class="cart-sidebar-overlay" v-if="isOpen" @click="handleOverlayClick">
    <div class="cart-sidebar" :class="{ 'is-open': isOpen }" @click.stop>
      <!-- En-tête du panier -->
      <div class="cart-header">
        <h2>Mon Panier</h2>
        <button class="close-btn" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Contenu du panier -->
      <div v-if="cartItems.length > 0" class="cart-content">
        <!-- Liste des produits -->
        <div class="cart-items-container">
          <div v-for="item in cartItems" 
               :key="`${item.id}-${item.selectedSize}`" 
               class="cart-item">
            <!-- Image du produit -->
            <div class="item-col item-image">
              <img :src="item.image" :alt="item.name">
            </div>

            <!-- Informations du produit -->
            <div class="item-col item-details">
              <div class="item-header">
                <h3>{{ item.name }}</h3>
                <button class="delete-btn" @click="handleRemoveFromCart(item.id, item.selectedSize)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>

              <!-- Taille -->
              <div class="size-info">
                <span class="label">Taille :</span>
                <button class="size-btn" @click="openSizeModal(item)">
                  {{ item.sizes[item.selectedSize] }}
                  <i class="fas fa-pencil-alt"></i>
                </button>
              </div>

              <!-- Contrôles de quantité -->
              <div class="quantity-controls">
                <span class="label">Quantité :</span>
                <div class="quantity-actions">
                  <button 
                    class="qty-btn" 
                    @click="decrementQuantity(item)"
                    :disabled="item.quantity <= 1"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  
                  <span class="quantity">{{ item.quantity }}</span>
                  
                  <button 
                    class="qty-btn"
                    @click="incrementQuantity(item)"
                    :disabled="item.quantity >= getStockDisponible(item)"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              <!-- Message de stock -->
              <p v-if="item.quantity >= getStockDisponible(item)" class="stock-warning">
                Stock limité à {{ getStockDisponible(item) }} {{ getStockDisponible(item) <= 1 ? 'unité' : 'unités' }}
              </p>

              <!-- Prix -->
              <div class="price">
                <span>{{ item.prices[item.selectedSize] }}€</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Information livraison -->
        <div class="shipping-banner" :class="{ 'is-free': cartTotal >= 300 }">
          <i :class="cartTotal >= 300 ? 'fas fa-truck' : 'fas fa-info-circle'"></i>
          <p v-if="cartTotal < 300">
            Plus que {{ (300 - cartTotal).toFixed(2) }}€ pour la livraison gratuite
          </p>
          <p v-else>
            Félicitations ! Vous bénéficiez de la livraison gratuite
          </p>
        </div>

        <!-- Résumé et actions -->
        <div class="cart-summary">
          <div class="summary-row">
            <span>Sous-total</span>
            <span>{{ cartTotal }}€</span>
          </div>
          <div class="summary-row">
            <span>Livraison</span>
            <span>{{ cartTotal >= 300 ? 'Gratuite' : 'Calculée à la commande' }}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span class="total-price">{{ cartTotal }}€</span>
          </div>

          <div class="cart-actions">
            <button class="checkout-btn" @click="handleCheckout">
              <span>Passer la commande</span>
              <i class="fas fa-arrow-right"></i>
            </button>
            
            <button class="continue-btn" @click="$emit('close')">
              Continuer mes achats
            </button>
          </div>
        </div>
      </div>

      <!-- Panier vide -->
      <div v-else class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <p>Votre panier est vide</p>
        <button class="continue-btn" @click="$emit('close')">
          Commencer mes achats
        </button>
      </div>

      <!-- Modal changement de taille -->
      <div v-if="showSizeModal" class="size-modal-overlay">
        <div class="size-modal">
          <div class="modal-header">
            <h3>Changer la taille</h3>
            <button class="close-modal" @click="closeSizeModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="size-options">
            <button 
              v-for="(height, size) in selectedItem?.sizes" 
              :key="size"
              class="size-option"
              :class="{ active: size === selectedSize }"
              @click="changeSize(size)"
            >
              {{ height }}
            </button>
          </div>

          <div class="modal-actions">
            <button class="confirm-btn" @click="confirmSizeChange">
              Confirmer
            </button>
            <button class="cancel-btn" @click="closeSizeModal">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])
const store = useStore()
const router = useRouter()
const { removeFromCart } = useCart()

const showSizeModal = ref(false)
const selectedItem = ref(null)
const selectedSize = ref(null)

// Gestion des stocks
const generateRandomStock = () => Math.floor(Math.random() * 5) + 0

const stocksParTaille = ref({
  'Petit': generateRandomStock(),
  'Moyen': generateRandomStock(),
  'Grand': generateRandomStock()
})

const cartItems = computed(() => store.getters.cartItems)
const cartTotal = computed(() => store.getters.cartTotal)

const getStockDisponible = (item) => {
  return stocksParTaille.value[item.selectedSize] || 0
}

const decrementQuantity = (item) => {
  if (item.quantity > 1) {
    store.dispatch('updateCartQuantity', {
      id: item.id,
      selectedSize: item.selectedSize,
      quantity: item.quantity - 1
    })
  }
}

const incrementQuantity = (item) => {
  const stockDispo = getStockDisponible(item)
  if (item.quantity < stockDispo) {
    store.dispatch('updateCartQuantity', {
      id: item.id,
      selectedSize: item.selectedSize,
      quantity: item.quantity + 1
    })
  }
}

const handleOverlayClick = () => {
  emit('close')
}

const handleRemoveFromCart = (id, selectedSize) => {
  removeFromCart({ id, selectedSize })
}

const handleCheckout = () => {
  emit('close')
  router.push('/checkout')
}

const openSizeModal = (item) => {
  selectedItem.value = item
  selectedSize.value = item.selectedSize
  showSizeModal.value = true
}

const closeSizeModal = () => {
  showSizeModal.value = false
  selectedItem.value = null
  selectedSize.value = null
}

const changeSize = (size) => {
  selectedSize.value = size
}

const confirmSizeChange = () => {
  if (selectedItem.value && selectedSize.value) {
    const oldSize = selectedItem.value.selectedSize
    const quantity = selectedItem.value.quantity
    
    store.dispatch('removeFromCart', {
      id: selectedItem.value.id,
      selectedSize: oldSize
    })
    
    store.dispatch('addToCart', {
      product: selectedItem.value,
      selectedSize: selectedSize.value,
      quantity: quantity
    })
    
    closeSizeModal()
  }
}
</script>
<style scoped>
/* Base et overlay */
.cart-sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  backdrop-filter: blur(3px);
}

.cart-sidebar {
  position: fixed;
  top: 0;
  right: -450px;
  width: 450px;
  height: 100vh;
  background: #ffffff;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.cart-sidebar.is-open {
  right: 0;
}

/* En-tête du panier */
.cart-header {
  padding: 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #0B3B24;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: #6c757d;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #e9ecef;
  color: #0B3B24;
}

/* Empty Cart Styles */
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
}

.empty-cart i {
  font-size: 4rem;
  color: #dee2e6;
  margin-bottom: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

.empty-cart p {
  font-size: 1.25rem;
  color: #6c757d;
  margin-bottom: 2rem;
  font-weight: 500;
}

.empty-cart .continue-btn {
  background: #0B3B24;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(11, 59, 36, 0.1);
}

.empty-cart .continue-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(11, 59, 36, 0.15);
  background: #0a2e1c;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* Contenu du panier */
.cart-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cart-items-container {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

/* Article du panier */
.cart-item {
  display: flex;
  gap: 1.5rem;
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Style des colonnes d'articles */
.item-col {
  flex: 1;
}

.item-image {
  flex: 0 0 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.item-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #0B3B24;
  font-weight: 600;
}

.delete-btn {
  background: none;
  border: none;
  color: #dc3545;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 50%;
}

.delete-btn:hover {
  background: #fee2e2;
}

/* Informations de taille */
.size-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label {
  color: #6c757d;
  font-size: 0.9rem;
}

.size-btn {
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.size-btn:hover {
  background: #e9ecef;
}

/* Contrôles de quantité */
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f9fa;
  border-radius: 6px;
  padding: 0.25rem;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: #ffffff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #0B3B24;
}

.qty-btn:hover:not(:disabled) {
  background: #0B3B24;
  color: #ffffff;
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
}

/* Message de stock */
.stock-warning {
  color: #dc3545;
  font-size: 0.85rem;
  margin: 0;
}

/* Prix */
.price {
  font-size: 1.2rem;
  font-weight: 600;
  color: #0B3B24;
  text-align: right;
}

/* Bannière de livraison */
.shipping-banner {
  padding: 1rem;
  background: #e9ecef;
  margin: 0 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.shipping-banner.is-free {
  background: #d1e7dd;
  color: #0f5132;
}

.shipping-banner i {
  font-size: 1.25rem;
}

.shipping-banner p {
  margin: 0;
  font-size: 0.95rem;
}

/* Résumé du panier */
.cart-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-top: 1px solid #dee2e6;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  color: #6c757d;
}

.summary-row.total {
  border-top: 2px solid #dee2e6;
  font-weight: 600;
  font-size: 1.2rem;
  color: #0B3B24;
  padding-top: 1rem;
}

.total-price {
  color: #c41e3a;
}

/* Boutons d'action */
.cart-actions {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkout-btn, .continue-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.checkout-btn {
  background: #0B3B24;
  color: #ffffff;
}

.checkout-btn:hover {
  background: #0a2e1c;
  transform: translateY(-2px);
}

.continue-btn {
  background: #f8f9fa;
  color: #0B3B24;
  border: 1px solid #dee2e6;
}

.continue-btn:hover {
  background: #e9ecef;
}

/* Modal de taille */
.size-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.size-modal {
  background: #ffffff;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  padding: 1.5rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  margin: 0;
  color: #0B3B24;
}

.close-modal {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #6c757d;
  cursor: pointer;
}

.size-options {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.size-option {
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.size-option.active {
  background: #0B3B24;
  color: #ffffff;
  border-color: #0B3B24;
}

.modal-actions {
  display: flex;
  gap: 1rem;
}

.confirm-btn, .cancel-btn {
  flex: 1;
  padding: 0.875rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.confirm-btn {
  background: #0B3B24;
  color: #ffffff;
}

.cancel-btn {
  background: #f8f9fa;
  color: #0B3B24;
  border: 1px solid #dee2e6;
}

/* Responsive */
@media (max-width: 768px) {
  .cart-sidebar {
    width: 100%;
    right: -100%;
  }

  .item-image {
    flex: 0 0 100px;
    height: 100px;
  }

  .cart-item {
    flex-direction: column;
  }

  .item-image {
    width: 100%;
    height: 200px;
  }

  .size-modal {
    width: calc(100% - 2rem);
    margin: 1rem;
  }
  
  .empty-cart i {
    font-size: 3rem;
  }
  
  .empty-cart p {
    font-size: 1.1rem;
  }
  
  .empty-cart .continue-btn {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .cart-header {
    padding: 1rem;
  }

  .cart-items-container {
    padding: 1rem;
  }

  .cart-item {
    padding: 1rem;
  }

  .shipping-banner {
    margin: 0 1rem;
  }

  .cart-summary {
    padding: 1rem;
  }

  .checkout-btn, .continue-btn {
    padding: 0.875rem;
  }
}
</style>
