// Composable de gestion du panier - useCart.js

import { useStore } from 'vuex'
import { computed } from 'vue'

// Composable principal pour gérer le panier
export function useCart() {
 // Initialisation du store Vuex
 const store = useStore()

 // Computed properties réactives pour le panier
 const cart = computed(() => store.state.cart) // Contenu brut du panier
 const cartTotal = computed(() => store.getters.cartTotal) // Montant total
 const cartCount = computed(() => store.getters.cartCount) // Nombre d'articles
 const cartItems = computed(() => store.getters.cartItems) // Articles formatés

 // Ajouter un article au panier
 const addToCart = (product, selectedSize, quantity = 1) => {
   store.dispatch('addToCart', { 
     product, 
     selectedSize, 
     quantity 
   })
 }

 // Supprimer un article du panier
 const removeFromCart = ({ id, selectedSize }) => {
   store.dispatch('removeFromCart', { 
     id, 
     selectedSize 
   })
 }

 // Mettre à jour la quantité d'un article
 const updateCartQuantity = (id, selectedSize, quantity) => {
   store.dispatch('updateCartQuantity', { 
     id, 
     selectedSize, 
     quantity 
   })
 }

 // Vider entièrement le panier
 const clearCart = () => {
   store.dispatch('clearCart')
 }

 // Exposition des fonctionnalités du panier
 return {
   cart, // État brut
   cartItems, // Articles formatés
   cartTotal, // Total
   cartCount, // Compteur
   addToCart, // Ajout
   removeFromCart, // Suppression
   updateCartQuantity, // Mise à jour quantité
   clearCart // Vidage
 }
}