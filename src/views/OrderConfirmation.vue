<template>
  <div class="order-confirmation">
    <div class="confirmation-content">
      <h1>Commande confirmée !</h1>
      <p>Merci pour votre achat. Votre commande a été réalisée avec succès.</p>
      <p>Référence de commande : <strong>{{ orderReference }}</strong></p>
      <p>
        Un e-mail de confirmation vous a été envoyé avec les informations de suivi et les délais de livraison.
      </p>
      <button @click="goHome" class="home-btn">
        Retour à l'accueil
      </button>
    </div>
  </div>
 </template>
 
 <script setup>
 import { ref, onMounted } from 'vue';
 import { useRoute, useRouter } from 'vue-router';
 import { useCart } from '@/composables/useCart';
 
 const route = useRoute();
 const router = useRouter();
 const { clearCart } = useCart();
 const orderReference = ref('');
 
 onMounted(() => {
  orderReference.value = route.query.reference || 'Non disponible';
 });
 
 const goHome = () => {
  clearCart();
  router.push('/');
 }
 </script>
 
 <style scoped>
 .order-confirmation {
  min-height: calc(100vh - 250px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
 }
 
 .confirmation-content {
  text-align: center;
  max-width: 600px;
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
 }
 
 h1 {
  color: #0b3b24;
  font-size: 2.5rem;
  margin-bottom: 1rem;
 }
 
 p {
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 1rem;
 }
 
 strong {
  color: #c41e3a;
  font-weight: bold;
 }
 
 .home-btn {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: #0b3b24;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
 }
 
 .home-btn:hover {
  background: #0a2e1c;
 }
 
 @media (max-width: 768px) {
  .confirmation-content {
    padding: 1.5rem;
    margin: 1rem;
  }
 
  h1 {
    font-size: 2rem;
  }
 
  p {
    font-size: 1rem;
  }
 
  .home-btn {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
  }
 }
 </style>
 