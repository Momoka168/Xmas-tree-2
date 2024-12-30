<template>
    <div class="order-confirmation">
      <div class="confirmation-content">
        <h1>Commande confirmée !</h1>
        <p>Merci pour votre achat. Votre commande a été réalisée avec succès.</p>
        <p>Référence de commande : <strong>{{ orderReference }}</strong></p>
        <p>
          Un e-mail de confirmation vous a été envoyé avec les informations de suivi et les délais de livraison.
        </p>
        <router-link to="/" class="home-btn">
          Retour à l'accueil
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const orderReference = ref('');
  
  // Récupère la référence de commande depuis les paramètres d'URL
  onMounted(() => {
    orderReference.value = route.query.reference || 'Non disponible';
  });
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
  }
  
  .home-btn:hover {
    background: #0a2e1c;
  }
  </style>
  