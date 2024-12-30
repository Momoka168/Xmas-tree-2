<template>
  <div class="checkout-page">
    <h1>Finaliser votre commande de Noël !</h1>

    <div class="checkout-container">
      <!-- Formulaire à gauche -->
      <div class="checkout-form">
        <h2>Enregistrez-vous !</h2>

        <form @submit.prevent="submitOrder">
          <!-- Informations personnelles -->
          <div class="form-section">
            <h3>Informations personnelles</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="firstname">Prénom</label>
                <input 
                  type="text" 
                  id="firstname" 
                  v-model="formData.firstname" 
                  placeholder="Votre prénom"
                  required
                >
              </div>
              <div class="form-group">
                <label for="lastname">Nom</label>
                <input 
                  type="text" 
                  id="lastname" 
                  v-model="formData.lastname" 
                  placeholder="Votre nom"
                  required
                >
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="formData.email" 
                  placeholder="exemple@domaine.com"
                  required
                >
              </div>
              <div class="form-group">
                <label for="phone">Téléphone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="formData.phone" 
                  placeholder="Votre numéro de téléphone"
                  required
                >
              </div>
            </div>
          </div>

          <!-- Adresse de livraison -->
          <div class="form-section">
            <h3>Adresse de livraison</h3>
            <div class="form-group">
              <label for="shipping-address">Adresse</label>
              <input 
                type="text" 
                id="shipping-address" 
                v-model="formData.shippingAddress" 
                placeholder="Votre adresse de livraison"
                required
              >
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label for="shipping-postal">Code postal</label>
                <input 
                  type="text" 
                  id="shipping-postal" 
                  v-model="formData.shippingPostal" 
                  placeholder="Code postal"
                  required
                >
              </div>
              <div class="form-group">
                <label for="shipping-city">Ville</label>
                <input 
                  type="text" 
                  id="shipping-city" 
                  v-model="formData.shippingCity" 
                  placeholder="Ville"
                  required
                >
              </div>
            </div>
          </div>

          <!-- Adresse de facturation -->
          <div class="form-section">
            <h3>
              Adresse de facturation
              <label class="same-address">
                <input 
                  type="checkbox" 
                  v-model="sameAsShipping"
                > Identique à l'adresse de livraison
              </label>
            </h3>
            <div v-if="!sameAsShipping">
              <div class="form-group">
                <label for="billing-address">Adresse</label>
                <input 
                  type="text" 
                  id="billing-address" 
                  v-model="formData.billingAddress"
                  placeholder="Votre adresse de facturation"
                  :required="!sameAsShipping"
                >
              </div>
              <div class="form-grid">
                <div class="form-group">
                  <label for="billing-postal">Code postal</label>
                  <input 
                    type="text" 
                    id="billing-postal" 
                    v-model="formData.billingPostal"
                    placeholder="Code postal"
                    :required="!sameAsShipping"
                  >
                </div>
                <div class="form-group">
                  <label for="billing-city">Ville</label>
                  <input 
                    type="text" 
                    id="billing-city" 
                    v-model="formData.billingCity"
                    placeholder="Ville"
                    :required="!sameAsShipping"
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Méthode de paiement -->
      <div class="form-section">
        <h3>Méthode de paiement</h3>
        <div class="payment-methods">
          <label class="payment-method">
            <input 
              type="radio" 
              v-model="formData.paymentMethod" 
              value="bancontact"
              required
            >
            <img src="@/assets//images/cartes/bancontact.svg" alt="Bancontact" class="payment-icon">
            <span>Bancontact</span>
          </label>
          <label class="payment-method">
            <input 
              type="radio" 
              v-model="formData.paymentMethod" 
              value="visa"
              required
            >
            <img src="@/assets//images/cartes/visa.svg" alt="Visa" class="payment-icon">
            <span>Visa</span>
          </label>
          <label class="payment-method">
            <input 
              type="radio" 
              v-model="formData.paymentMethod" 
              value="mastercard"
              required
            >
            <img src="@/assets/images/cartes/mastercard.svg" alt="Mastercard" class="payment-icon">
            <span>Mastercard</span>
          </label>
        </div>
      </div>


          <div class="form-footer">
            <label class="terms">
              <input 
                type="checkbox" 
                v-model="formData.acceptTerms"
                required
              >
              J'accepte les conditions/règlement
            </label>
            <button 
              class="confirm-btn" 
              @click="handleOrderConfirmation"
            >
              Confirmer
            </button>

          </div>
        </form>
      </div>

      <!-- Résumé de la commande à droite -->
      <div class="order-summary">
        <h2>Mes achats</h2>
        <div class="cart-items">
          <div v-for="item in cartItems" 
               :key="`${item.id}-${item.selectedSize}`" 
               class="cart-item">
            <div class="item-image">
              <img :src="item.image" :alt="item.name">
            </div>
            <div class="item-details">
              <h4>{{ item.name }}</h4>
              <p class="item-size">Taille : {{ item.sizes[item.selectedSize] }}</p>
              <p class="item-price">Prix : {{ item.prices[item.selectedSize] }}€ x {{ item.quantity }}</p>
            </div>
          </div>
        </div>
        <div class="order-total">
          <span>Montant total :</span>
          <span class="total-price">{{ cartTotal }}€</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '@/composables/useCart';

const router = useRouter();
const { cartItems, cartTotal } = useCart();

const sameAsShipping = ref(true);

const formData = ref({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  shippingAddress: '',
  shippingPostal: '',
  shippingCity: '',
  billingAddress: '',
  billingPostal: '',
  billingCity: '',
  paymentMethod: '',
  acceptTerms: false,
});

const generateOrderReference = () => {
  return `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
};

const submitOrder = () => {
  // Validation des champs requis
  if (!validateForm()) {
    return;
  }

  const orderReference = generateOrderReference();

  console.log('Commande soumise avec succès :', formData.value);

  // Simule l'envoi d'un email (peut être implémenté côté serveur/API)
  sendConfirmationEmail(orderReference, formData.value);

  // Redirection vers la page de confirmation avec la référence de commande
  router.push({
    name: 'OrderConfirmation',
    query: {
      reference: orderReference,
      formData: JSON.stringify(formData.value),
    },
  });
};

const validateForm = () => {
  // Vérifie que tous les champs requis sont remplis
  const requiredFields = [
    'firstname', 'lastname', 'email', 'phone', 
    'shippingAddress', 'shippingPostal', 'shippingCity', 
    'paymentMethod', 'acceptTerms'
  ];

  for (let field of requiredFields) {
    if (!formData.value[field]) {
      alert(`Veuillez remplir tous les champs requis.`);
      return false;
    }
  }

  return true;
};

const handleOrderConfirmation = () => {
  submitOrder();
};

const sendConfirmationEmail = (orderReference, formData) => {
  console.log(`E-mail envoyé à ${formData.email} avec la référence : ${orderReference}`);
};
</script>

<style scoped>
.checkout-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

h1 {
  text-align: center;
  font-family: 'Font2', sans-serif;
  color: #0B3B24;
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.checkout-container {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 1.5rem;
}

.checkout-form {
  background: #fdfdfd;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 2rem;
}

h2, h3 {
  color: #0B3B24;
  font-weight: 600;
  margin-bottom: 1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #0B3B24;
  outline: none;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-method {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.payment-method:hover {
  border-color: #0B3B24;
}

.confirm-btn {
  background: #0B3B24;
  color: #fff;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.confirm-btn:hover {
  background: #072a4e;
}

.order-summary {
  background: #fdfdfd;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-items {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1.5rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-size, .item-price {
  color: #555;
}

.order-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.total-price {
  color: #c41e3a;
}

@media (max-width: 768px) {
  .checkout-container {
    grid-template-columns: 1fr;
  }

  .order-summary {
    position: static;
  }
}
.payment-methods {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.payment-method {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.payment-method input {
  display: none;
}

.payment-method img {
  width: 50px;
  height: auto;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
  border-radius: 8px;
}

.payment-method span {
  font-size: 1rem;
  color: #333;
}

.payment-method input:checked + img {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-color: #0b3b24; /* Mettre en valeur l'option sélectionnée */
}

.payment-method input:checked + img + span {
  font-weight: bold;
  color: #0b3b24;
}

</style>
