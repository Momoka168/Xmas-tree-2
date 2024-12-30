import { useStore } from 'vuex'
import { computed } from 'vue'

export function useCart() {
  const store = useStore()

  const cart = computed(() => store.state.cart)
  const cartTotal = computed(() => store.getters.cartTotal)
  const cartCount = computed(() => store.getters.cartCount)
  const cartItems = computed(() => store.getters.cartItems) // Ajout de cette ligne

  const addToCart = (product, selectedSize, quantity = 1) => {
    store.dispatch('addToCart', { product, selectedSize, quantity })
  }

  const removeFromCart = (id, selectedSize) => {
    store.dispatch('removeFromCart', { id, selectedSize })
  }

  const updateCartQuantity = (id, selectedSize, quantity) => {
    store.dispatch('updateCartQuantity', { id, selectedSize, quantity })
  }

  const clearCart = () => {
    store.dispatch('clearCart')
  }

  return {
    cart,
    cartItems, 
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart
  }
}