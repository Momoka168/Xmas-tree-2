<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-column">
        <h3>SUIVEZ-NOUS</h3>
        <div class="social-icons">
          <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-pinterest"></i></a>
        </div>
      </div>
      <div class="footer-column">
        <h3>NOUS CONTACTER</h3>
        
        <div class="contact-list">
          <a href="mailto:xmastore@hohoho.com" class="contact-item">
            <i class="fas fa-envelope"></i>
            <span>xmastore@hohoho.com</span>
          </a>
          <a 
            href="https://www.google.com/maps/search/?api=1&query=25+Avenue+des+Sapins+75008+Paris" 
            target="_blank" 
            class="contact-item map-link"
          >
            <i class="fas fa-map-marker-alt"></i>
            <span>25 Avenue des Sapins, 75008 Paris</span>
          </a>
          <a href="tel:+32489709483" class="contact-item phone-link">
            <i class="fas fa-phone"></i>
            <span class="phone-number">+32 4 23 45 67 89</span>
            <span class="call-text">Appeler</span>
          </a>
        </div>
      </div>
      <div class="footer-column newsletter-section">
        <h3>NEWSLETTER</h3>
        <div class="newsletter-content">
          <p class="newsletter-title">Des surprises toute l'année !</p>
          <div class="benefits">
            <p>🎁 -10% sur votre première commande</p>
            <p>🎄 Offres exclusives de Noël</p>
            <p>✨ Nouveautés en avant-première</p>
          </div>
          <div class="email-input">
            <input 
              type="email" 
              placeholder="Votre email" 
              v-model="email" 
              :class="{ 'error': showError }"
            />
            <button @click="subscribe" :disabled="isLoading">
              <span>OK</span>
            </button>
          </div>
          <small class="privacy-notice">En vous inscrivant, vous acceptez nos communications marketing</small>
        </div>
      </div>
    </div>
    <div class="copyright">© 2024 HOHOHO Xmastore. Tous droits réservés</div>

    <!-- Notification -->
    <div v-if="showNotification" class="notification" :class="notificationType">
      <div class="notification-content">
        <i class="fas fa-gift notification-icon"></i>
        <div class="notification-text">
          <h4>Merci pour votre inscription ! 🎄</h4>
          <p>Votre code de réduction -10% va vous être envoyé par email</p>
        </div>
        <button class="notification-close" @click="closeNotification">OK</button>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
name: 'TheFooter',
data() {
  return {
    email: '',
    showError: false,
    isLoading: false,
    showNotification: false,
    notificationType: 'success'
  }
},
methods: {
  async subscribe() {
    if (!this.validateEmail(this.email)) {
      this.showError = true;
      return;
    }

    this.isLoading = true;
    this.showError = false;

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.showNotification = true;
      this.notificationType = 'success';
      this.email = '';

      // Fermer automatiquement la notification après 5 secondes
      setTimeout(this.closeNotification, 5000);
    } catch {
      this.notificationType = 'error';
      this.showNotification = true;
    } finally {
      this.isLoading = false;
    }
  },
  closeNotification() {
    this.showNotification = false;
  },
  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
}
</script>

<style scoped>
.footer {
background-color: #0B3B24;
color: #fff;
padding: 30px 0 15px;
position: relative;
}

.footer-content {
max-width: 1200px;
margin: 0 auto;
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 30px;
padding: 0 20px;
}

h3 {
color: #fff;
margin-bottom: 15px;
font-size: 16px;
transition: color 0.3s ease;
}

h3:hover {
color: #CC0000;
}

.social-icons {
display: flex;
gap: 15px;
}

.social-icon {
color: #fff;
font-size: 18px;
transition: all 0.3s ease;
}

.social-icon:hover {
color: #CC0000;
transform: translateY(-3px);
}

.contact-list {
display: flex;
flex-direction: column;
gap: 12px;
}

.contact-item {
display: flex;
align-items: center;
gap: 10px;
color: #fff;
text-decoration: none;
transition: all 0.3s ease;
padding: 5px 10px;
border-radius: 15px;
}

.contact-item i {
color: #CC0000;
}

.contact-item:hover {
background-color: rgba(255, 255, 255, 0.1);
transform: translateX(5px);
}

.phone-link {
background-color: rgba(204, 0, 0, 0.1);
border-radius: 20px;
}

.phone-link:hover {
background-color: #CC0000;
}

.call-text {
font-size: 12px;
background-color: rgba(255, 255, 255, 0.1);
padding: 3px 8px;
border-radius: 12px;
margin-left: 5px;
}

.newsletter-section {
background: rgba(255, 255, 255, 0.05);
padding: 15px;
border-radius: 8px;
}

.newsletter-title {
font-size: 15px;
margin-bottom: 10px;
}

.benefits {
display: flex;
flex-direction: column;
gap: 8px;
margin-bottom: 15px;
font-size: 13px;
}

.benefits p {
display: flex;
align-items: center;
gap: 8px;
}

.email-input {
display: flex;
gap: 5px;
margin-bottom: 8px;
}

.email-input input {
flex: 1;
padding: 8px 12px;
border: none;
border-radius: 4px;
transition: all 0.3s ease;
}

.email-input input:focus {
outline: none;
box-shadow: 0 0 0 2px rgba(204, 0, 0, 0.3);
}

.email-input input.error {
border: 1px solid #CC0000;
background-color: rgba(204, 0, 0, 0.1);
}

.email-input button {
background: #CC0000;
color: white;
border: none;
padding: 8px 15px;
border-radius: 4px;
cursor: pointer;
transition: all 0.3s ease;
}

.email-input button:hover:not(:disabled) {
background-color: #8B0000;
transform: translateY(-2px);
}

.email-input button:disabled {
opacity: 0.7;
cursor: not-allowed;
}

.privacy-notice {
font-size: 11px;
opacity: 0.7;
}

.copyright {
text-align: center;
padding-top: 15px;
margin-top: 20px;
border-top: 1px solid rgba(255, 255, 255, 0.1);
font-size: 12px;
}

/* Styles de notification */
.notification {
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 1000;
background: rgba(11, 59, 36, 0.95);
border-radius: 12px;
padding: 20px;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
animation: slideIn 0.3s ease;
}

.notification-content {
display: flex;
flex-direction: column;
align-items: center;
gap: 15px;
text-align: center;
min-width: 280px;
max-width: 400px;
}

.notification-icon {
font-size: 32px;
color: #CC0000;
}

.notification-text h4 {
font-size: 18px;
margin-bottom: 8px;
color: white;
}

.notification-text p {
font-size: 14px;
color: rgba(255, 255, 255, 0.9);
}

.notification-close {
background: #CC0000;
color: white;
border: none;
padding: 8px 25px;
border-radius: 20px;
cursor: pointer;
font-weight: 500;
transition: all 0.3s ease;
}

.notification-close:hover {
background: #8B0000;
transform: translateY(-2px);
}

@keyframes slideIn {
from {
  opacity: 0;
  transform: translate(-50%, -40%);
}
to {
  opacity: 1;
  transform: translate(-50%, -50%);
}
}

@media (max-width: 768px) {
.footer-content {
  grid-template-columns: 1fr;
  gap: 20px;
}

.social-icons {
  justify-content: center;
}

.contact-list {
  align-items: center;
}

.contact-item:hover {
  transform: translateY(-2px);
}

.newsletter-section {
  text-align: center;
}

.benefits {
  align-items: center;
}

.notification {
  width: 90%;
}

.notification-content {
  max-width: 100%;
}
}
</style>