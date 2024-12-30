<template>
  <div id="app">
    <NavBar @open-cart="openCart" />
    <router-view @openCart="openCart"></router-view>
    <TheFooter />
    <CartSidebar 
      :is-open="isCartOpen"
      @close="closeCart"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import TheFooter from './components/TheFooter.vue'
import CartSidebar from './components/CartSidebar.vue'

const isCartOpen = ref(false)

const openCart = () => {
  isCartOpen.value = true
}

const closeCart = () => {
  isCartOpen.value = false
}
</script>