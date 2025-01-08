<template>
  <div class="cart-sidebar-overlay" v-if="isOpen" @click="handleOverlayClick">
    <div class="cart-sidebar" :class="{ 'is-open': isOpen }" @click.stop>
      <div class="cart-header">
        <h2>Panier</h2>
        <button class="close-btn" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>
      </div>
 
      <div v-if="cartItems.length > 0" class="cart-content">
        <div v-for="item in cartItems" :key="`${item.id}-${item.selectedSize}`" class="cart-item">
          <div class="cart-item-image">
            <img :src="item.image" :alt="item.name">
          </div>
          <div class="cart-item-content">
            <div class="cart-item-header">
              <h3>{{ item.name }}</h3>
              <button class="delete-btn" @click="handleRemoveFromCart(item.id, item.selectedSize)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
            
            <div class="cart-item-details">
              <div class="size-section">
                <p>Taille :</p>
                <button 
                  class="edit-size-btn" 
                  @click="openSizeModal(item)"
                >
                  {{ item.sizes[item.selectedSize] }}
                  <i class="fas fa-pen"></i>
                </button>
              </div>
 
              <div class="quantity-controls">
                <button 
                  @click="() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)"
                  :disabled="item.quantity <= 1"
                  class="quantity-btn"
                >-</button>
 
                <span class="quantity">{{ item.quantity }}</span>
                
                <button 
                  @click="() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)"
                  :disabled="item.quantity >= 10"
                  class="quantity-btn"
                >+</button>
              </div>
 
              <div class="price-info">
                <div class="unit-price">
                  <span>Prix :</span>
                  <span class="price">{{ item.prices[item.selectedSize] }}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
 
        <div class="shipping-info" v-if="cartTotal < 300">
          <p>Plus que {{ 300 - cartTotal }}€ pour la livraison gratuite</p>
        </div>
        <div class="shipping-info success" v-else>
          <p>Livraison gratuite !</p>
        </div>
 
        <div class="cart-footer">
          <div class="cart-total">
            <span>Total</span>
            <span class="total-price">{{ cartTotal }}€</span>
          </div>
          <div class="cart-actions">
            <button class="checkout-btn" @click="handleCheckout">
              Passer commande
            </button>
            
            <button class="continue-btn" @click="$emit('close')">
              Continuer mes achats
            </button>
          </div>
        </div>
      </div>
 
      <div v-else class="empty-cart">
        <p>Aucun produit dans votre panier...</p>
        <button class="continue-btn" @click="$emit('close')">
          Continuer mes achats
        </button>
      </div>
 
      <div v-if="showSizeModal" class="size-modal">
        <div class="modal-content">
          <h3>Choisir une nouvelle taille</h3>
          <div class="size-options">
            <button 
              v-for="(height, size) in selectedItem?.sizes" 
              :key="size"
              :class="{ active: size === selectedSize }"
              @click="changeSize(size)"
            >
              {{ height }}
            </button>
          </div>
          <div class="modal-actions">
            <button class="confirm-btn" @click="confirmSizeChange">Confirmer</button>
            <button class="cancel-btn" @click="closeSizeModal">Annuler</button>
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
 const { removeFromCart, updateCartQuantity } = useCart()
 
 const updateQuantity = (id, selectedSize, newQuantity) => {
  if (newQuantity >= 1 && newQuantity <= 10) {
    store.dispatch('updateCartQuantity', {
      id,
      selectedSize,
      quantity: newQuantity
    })
  }
 }
 
 const handleRemoveFromCart = (id, selectedSize) => {
  removeFromCart({ id, selectedSize })
 }
 
 const showSizeModal = ref(false)
 const selectedItem = ref(null)
 const selectedSize = ref(null)
 
 const cartItems = computed(() => store.getters.cartItems)
 const cartTotal = computed(() => store.getters.cartTotal)
 
 const handleOverlayClick = () => {
  emit('close')
 }
 
 const handleCheckout = () => {
  emit('close')
  router.push({
    name: 'checkout',
    params: {
      cartTotal: cartTotal.value,
      items: cartItems.value
    }
  })
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
 .cart-sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
 }
 
 .cart-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 8px rgba(0,0,0,0.1);
  transition: right 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
 }
 
 .cart-sidebar.is-open {
  right: 0;
 }
 
 .cart-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
 }
 
 .cart-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
 }
 
 .close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  transition: color 0.3s;
 }
 
 .close-btn:hover {
  color: #333;
 }
 
 .cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
 }
 
 .cart-item {
  display: flex;
  gap: 1.5rem;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1rem;
 }
 
 .cart-item-image {
  width: 120px;
  height: 120px;
  border-radius: 4px;
  overflow: hidden;
 }
 
 .cart-item-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
 }
 
 .cart-item-content {
  flex: 1;
 }
 
 .cart-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
 }
 
 .cart-item-header h3 {
  font-size: 1.2rem;
  margin: 0;
 }
 
 .delete-btn {
  background: none;
  border: none;
  color: #c41e3a;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s;
 }
 
 .delete-btn:hover {
  color: #a01830;
 }
 
 .cart-item-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
 }
 
 .size-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
 }
 
 .edit-size-btn {
  padding: 0.75rem;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  width: 100%;
 }
 
 .edit-size-btn:hover {
  background: #e0e0e0;
 }
 
 .edit-size-btn i {
  color: #666;
  font-size: 0.9em;
 }
 
 .quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  width: fit-content;
 }
 
 .quantity-btn {
  background: #f5f5f5;
  border: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s;
 }
 
 .quantity-btn:hover:not(:disabled) {
  background: #e0e0e0;
 }
 
 .quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
 }
 
 .quantity {
  padding: 0.5rem 1rem;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
 }
 
 .price-info {
  background: white;
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 1rem;
 }
 
 .unit-price {
  font-size: 1.2rem;
  font-weight: 500;
  color: #0B3B24;
  display: flex;
  justify-content: space-between;
  align-items: center;
 }
 
 .shipping-info {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 6px;
  margin-bottom: 1rem;
  text-align: center;
 }
 
 .shipping-info.success {
  background: #e6f4ea;
  color: #0B3B24;
 }
 
 .cart-footer {
  padding: 1.5rem;
  border-top: 1px solid #eee;
  background: white;
 }
 
 .cart-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
 }
 
 .total-price {
  color: #c41e3a;
 }
 
 .cart-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
 }
 
 .checkout-btn, .continue-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
 }
 
 .checkout-btn {
  background: #0B3B24;
  color: white;
 }
 
 .checkout-btn:hover {
  background: #0a2e1c;
 }
 
 .continue-btn {
  background: #f5f5f5;
  color: #333;
 }
 
 .continue-btn:hover {
  background: #e0e0e0;
 }
 
 .empty-cart {
  padding: 2rem;
  text-align: center;
  color: #666;
 }
 
 .size-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
 }
 
 .modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
 }
 
 .size-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1.5rem 0;
 }
 
 .size-options button {
  padding: 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
 }
 
 .size-options button.active {
  border-color: #0B3B24;
  color: #0B3B24;
  background: #f5f5f5;
 }
 
 .modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
 }
 
 .confirm-btn, .cancel-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
 }
 
 .confirm-btn {
  background: #0B3B24;
  color: white;
 }
 
 .confirm-btn:hover {
  background: #0a2e1c;
 }
 
 .cancel-btn {
  background: #f5f5f5;
  color: #333;
 }
 
 .cancel-btn:hover {
  background: #e0e0e0;
 }
 
 @media (max-width: 768px) {
  .cart-sidebar {
    width: 100%;
    right: -100%;
  }
 
  .cart-item {
    flex-direction: column;
    align-items: center;
  }
 
  .cart-item-image {
    width: 100%;
    max-width: 300px;
    height: 200px;
  }
 
  .size-selector {
   flex-direction: column;
   align-items: flex-start;
   gap: 0.5rem;
 }

 .modal-content {
   margin: 1rem;
   width: calc(100% - 2rem);
 }
 
 .cart-header h2 {
   font-size: 1.25rem;
 }

 .cart-total {
   font-size: 1.1rem;
 }

 .cart-actions {
   gap: 0.75rem;
 }

 .checkout-btn, .continue-btn {
   padding: 0.875rem;
 }
}

@media (max-width: 480px) {
 .cart-header {
   padding: 1rem;
 }

 .cart-content {
   padding: 1rem;
 }

 .cart-item {
   padding: 1rem;
 }

 .cart-item-image {
   height: 160px;
 }

 .cart-footer {
   padding: 1rem;
 }

 .size-buttons {
   flex-direction: column;
   width: 100%;
 }

 .size-buttons button {
   width: 100%;
   text-align: center;
 }

 .quantity-controls {
   width: 100%;
   justify-content: space-between;
 }
}
</style>
