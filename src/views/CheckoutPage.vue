<template>
  <div class="checkout-page">
    <!-- En-tête et progression -->
    <div class="checkout-progress">
      <div class="progress-step completed">
        <div class="step-icon">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <span>Panier</span>
      </div>
      <div class="progress-step active">
        <div class="step-icon">
          <i class="fas fa-file-alt"></i>
        </div>
        <span>Détails</span>
      </div>
      <div class="progress-step">
        <div class="step-icon">
          <i class="fas fa-credit-card"></i>
        </div>
        <span>Paiement</span>
      </div>
      <div class="progress-step">
        <div class="step-icon">
          <i class="fas fa-check"></i>
        </div>
        <span>Confirmation</span>
      </div>
    </div>

    <h1 class="page-title">Finaliser votre commande de Noël !</h1>

    <div class="checkout-container">
      <!-- Section du formulaire -->
      <div class="checkout-form">
        <!-- Information personnelles -->
        <section class="form-section">
          <h2>Enregistrez-vous !</h2>
          <div class="info-grid">
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
        </section>

        <!-- Adresse de livraison -->
        <section class="form-section">
          <h2>Adresse de livraison</h2>
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
          <div class="address-grid">
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
        </section>

        <!-- Adresse de facturation -->
        <section class="form-section">
          <div class="billing-header">
            <h2>Adresse de facturation</h2>
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="sameAsShipping"
              >
              <span>Identique à l'adresse de livraison</span>
            </label>
          </div>

          <div v-if="!sameAsShipping" class="billing-form">
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
            <div class="address-grid">
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
        </section>

        <!-- Méthode de paiement -->
        <section class="form-section">
          <h2>Méthode de paiement</h2>
          <div class="payment-methods">
            <label class="payment-method">
              <input 
                type="radio"
                v-model="formData.paymentMethod"
                value="bancontact"
                required
              >
              <img src="@/assets/images/cartes/bancontact.svg" alt="Bancontact">
              <span>Bancontact</span>
            </label>
            <label class="payment-method">
              <input 
                type="radio"
                v-model="formData.paymentMethod"
                value="visa"
                required
              >
              <img src="@/assets/images/cartes/visa.svg" alt="Visa">
              <span>Visa</span>
            </label>
            <label class="payment-method">
              <input 
                type="radio"
                v-model="formData.paymentMethod"
                value="mastercard"
                required
              >
              <img src="@/assets/images/cartes/mastercard.svg" alt="Mastercard">
              <span>Mastercard</span>
            </label>
          </div>
        </section>

        <!-- Conditions et validation -->
        <section class="form-section">
          <label class="checkbox-label terms">
            <input 
              type="checkbox"
              v-model="formData.acceptTerms"
              required
            >
            <span>J'accepte les conditions/règlement</span>
          </label>
          <button 
            class="confirm-button"
            @click="handleOrderConfirmation"
            :disabled="!formData.acceptTerms"
          >
            Confirmer
          </button>
        </section>
      </div>

      <!-- Résumé de commande -->
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
              <p class="item-price">
                Prix : {{ item.prices[item.selectedSize] }}€ x {{ item.quantity }}
              </p>
            </div>
          </div>
        </div>

        <div class="order-total">
          <div class="total-row">
            <span>Sous-total</span>
            <span>{{ cartSubtotal }}€</span>
          </div>
          <div class="total-row">
            <span>Livraison</span>
            <span v-if="cartTotal >= 300">Gratuite</span>
            <span v-else>9.99€</span>
          </div>
          <div class="total-row final">
            <span>Total</span>
            <span class="total-price">{{ cartTotal }}€</span>
          </div>
        </div>

        <div v-if="cartTotal < 300" class="shipping-info">
          <p>
            Plus que {{ (300 - cartTotal).toFixed(2) }}€ pour la livraison gratuite !
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useCart } from '@/composables/useCart';

const router = useRouter();
const store = useStore();
const { cartItems } = useCart();

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

// Calculs pour le panier
const cartSubtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.prices[item.selectedSize] * item.quantity);
  }, 0);
});

const cartTotal = computed(() => {
  const shipping = cartSubtotal.value >= 300 ? 0 : 9.99;
  return cartSubtotal.value + shipping;
});

// Validation
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateForm = () => {
  let isValid = true;
  const errors = [];

  // Validation des champs obligatoires
  if (!formData.value.firstname) errors.push('Le prénom est requis');
  if (!formData.value.lastname) errors.push('Le nom est requis');
  if (!formData.value.email) {
    errors.push('L\'email est requis');
  } else if (!validateEmail(formData.value.email)) {
    errors.push('Format d\'email invalide');
  }
  if (!formData.value.phone) errors.push('Le téléphone est requis');
  if (!formData.value.shippingAddress) errors.push('L\'adresse de livraison est requise');
  if (!formData.value.shippingPostal) errors.push('Le code postal de livraison est requis');
  if (!formData.value.shippingCity) errors.push('La ville de livraison est requise');

  if (!sameAsShipping.value) {
    if (!formData.value.billingAddress) errors.push('L\'adresse de facturation est requise');
    if (!formData.value.billingPostal) errors.push('Le code postal de facturation est requis');
    if (!formData.value.billingCity) errors.push('La ville de facturation est requise');
  }

  if (!formData.value.paymentMethod) errors.push('Veuillez choisir une méthode de paiement');
  if (!formData.value.acceptTerms) errors.push('Veuillez accepter les conditions générales');

  if (errors.length > 0) {
    alert(errors.join('\n'));
    isValid = false;
  }

  return isValid;
};

const handleOrderConfirmation = async () => {
  if (!validateForm()) return;

  try {
    // Générer une référence de commande
    const orderReference = `CMD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Si l'adresse de facturation est la même que l'adresse de livraison
    if (sameAsShipping.value) {
      formData.value.billingAddress = formData.value.shippingAddress;
      formData.value.billingPostal = formData.value.shippingPostal;
      formData.value.billingCity = formData.value.shippingCity;
    }

    // Simuler l'envoi de la commande
    console.log('Commande validée:', {
      reference: orderReference,
      formData: formData.value,
      items: cartItems.value,
      total: cartTotal.value
    });

    // Redirection vers la page de confirmation
    router.push({
      name: 'OrderConfirmation',
      query: {
        reference: orderReference
      }
    });

  } catch (error) {
    console.error('Erreur lors de la validation de la commande:', error);
    alert('Une erreur est survenue lors de la validation de votre commande. Veuillez réessayer.');
  }
};
</script>

<style scoped>
.checkout-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: #f8f9fa;
}

/* Barre de progression */
.checkout-progress {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  flex: 1;
  text-align: center;
}

.progress-step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 25px;
  left: 60%;
  width: 80%;
  height: 2px;
  background: #e9ecef;
}

.progress-step.completed .step-icon,
.progress-step.active .step-icon {
  background: #0B3B24;
  color: white;
}

.step-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  position: relative;
  z-index: 2;
}

.page-title {
  text-align: center;
  color: #0B3B24;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

/* Layout principal */
.checkout-container {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 2rem;
}

/* Formulaire */
.checkout-form {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  overflow: hidden;
}

.form-section {
  padding: 2rem;
  border-bottom: 1px solid #e9ecef;
}

.form-section:last-child {
  border-bottom: none;
}

.form-section h2 {
  color: #0B3B24;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.info-grid, .address-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #495057;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

input:focus {
  outline: none;
  border-color: #0B3B24;
  box-shadow: 0 0 0 3px rgba(11, 59, 36, 0.1);
}

/* Checkbox personnalisé */
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.billing-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

/* Méthodes de paiement */
.payment-methods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.payment-method {
  border: 2px solid #ced4da;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.payment-method input {
  display: none;
}

.payment-method img {
  height: 40px;
  margin-bottom: 0.5rem;
}

.payment-method:has(input:checked) {
  border-color: #0B3B24;
  background: #f8f9fa;
}

/* Résumé de commande */
.order-summary {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  position: sticky;
  top: 2rem;
}

.cart-items {
  max-height: 400px;
  overflow-y: auto;
  margin: 1rem 0;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.item-details h4 {
  margin: 0 0 0.5rem;
  color: #0B3B24;
}

.item-size, .item-price {
  color: #6c757d;
  font-size: 0.9rem;
  margin: 0.25rem 0;
}

.order-total {
  margin-top: 1.5rem;
  border-top: 2px solid #e9ecef;
  padding-top: 1rem;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  color: #495057;
}

.total-row.final {
  font-weight: 600;
  color: #0B3B24;
  font-size: 1.2rem;
}

.total-price {
  color: #c41e3a;
}

.shipping-info {
  margin-top: 1rem;
  padding: 1rem;
  background: #e9ecef;
  border-radius: 6px;
  text-align: center;
  color: #495057;
}

/* Bouton de confirmation */
.confirm-button {
  width: 100%;
  padding: 1rem;
  background: #0B3B24;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.confirm-button:hover:not(:disabled) {
  background: #072a1c;
  transform: translateY(-2px);
}

.confirm-button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 1200px) {
  .checkout-container {
    grid-template-columns: 1fr 320px;
  }
}

@media (max-width: 992px) {
  .checkout-container {
    grid-template-columns: 1fr;
  }
  
  .order-summary {
    position: static;
  }

  .payment-methods {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .checkout-page {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .progress-step span {
    display: none;
  }

  .info-grid, .address-grid {
    grid-template-columns: 1fr;
  }

  .form-section {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .checkout-progress {
    padding: 1rem;
  }

  .step-icon {
    width: 40px;
    height: 40px;
    font-size: 0.875rem;
  }

  .form-section {
    padding: 1rem;
  }
}
</style>
