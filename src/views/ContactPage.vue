<template>
  <div class="contact-page">
    <div class="contact-container">
      <h1>Contact</h1>
      <p class="subtitle">PRENEZ CONTACT AVEC NOTRE ÉQUIPE</p>
 
      <div class="contact-content">
        <!-- Form Section -->
        <div class="form-section">
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-group">
              <input 
                type="text" 
                v-model="formData.name"
                placeholder="Votre nom"
                required
              >
            </div>
            <div class="form-group">
              <input 
                type="email" 
                v-model="formData.email"
                placeholder="Votre email"
                required
              >
            </div>
            <div class="form-group">
              <input 
                type="text" 
                v-model="formData.subject"
                placeholder="Sujet"
                required
              >
            </div>
            <div class="form-group">
              <textarea 
                v-model="formData.message"
                placeholder="Votre message"
                rows="6"
                required
              ></textarea>
            </div>
            <button type="submit" class="submit-btn">
              <i class="fas fa-paper-plane"></i>
              ENVOYER
            </button>
          </form>
        </div>
 
        <!-- Info Section -->
        <div class="info-section">
          <div class="info-container">
            <div class="info-block">
              <i class="fas fa-phone"></i>
              <div>
                <h3>Téléphone</h3>
                <a href="tel:+32423456789" class="contact-link">
                  +32 4 23 45 67 89
                </a>
                <p class="hours">Du lundi au vendredi, 9h-18h</p>
              </div>
            </div>
 
            <div class="info-block">
              <i class="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <a href="mailto:xmastore@hohoho.com" class="contact-link">
                  xmastore@hohoho.com
                </a>
              </div>
            </div>
 
            <div class="info-block address-block">
              <div class="address-info">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                  <h3>Adresse</h3>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=25+Avenue+des+Sapins+75008+Paris" 
                    target="_blank" 
                    class="contact-link"
                  >
                    <p>25 Avenue des Sapins</p>
                    <p>75008 Paris</p>
                  </a>
                </div>
              </div>
              <div class="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047744348!2d2.3002449999999997!3d48.8737917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sParis%2C%20France!5e0!3m2!1sfr!2sfr!4v1631234567890!5m2!1sfr!2sfr" 
                  width="100%" 
                  height="200" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy">
                </iframe>
              </div>
            </div>
 
            <div class="social-section">
              <h3>Suivez-nous</h3>
              <div class="social-icons">
                <a href="#" class="social-icon">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
    <!-- Success Message -->
    <Transition name="fade">
      <div v-if="showSuccess" class="success-message">
        <div class="success-content">
          <i class="fas fa-check-circle"></i>
          <h3>Message envoyé !</h3>
          <p>Nous vous répondrons dans les plus brefs délais.</p>
          <button @click="showSuccess = false" class="close-btn">
            Fermer
          </button>
        </div>
      </div>
    </Transition>
  </div>
 </template>
 
 <script setup>
 import { ref } from 'vue'
 
 const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
 })
 
 const showSuccess = ref(false)
 
 const handleSubmit = async () => {
  // Simulation d'envoi
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Reset du formulaire
  formData.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  
  // Affichage message de succès
  showSuccess.value = true
  
  // Fermeture automatique après 5 secondes
  setTimeout(() => {
    showSuccess.value = false
  }, 5000)
 }
 </script>
 
 <style scoped>
 .contact-page {
  padding: 4rem 2rem;
  background-color: #f1f1f1;
  min-height: calc(100vh - 200px);
 }
 
 .contact-container {
  max-width: 1400px;
  margin: 0 auto;
 }
 
 h1 {
  font-family: 'Font2', sans-serif;
  text-align: center;
  font-size: 4rem;
  margin-bottom: 0.5rem;
  color: #0B3B24;
 }
 
 .subtitle {
  text-align: center;
  color: #c41e3a;
  margin-bottom: 3rem;
 }
 
 .contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
 }
 
 /* Form Section */
 .form-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
 }
 
 .form-group {
  margin-bottom: 1.5rem;
 }
 
 input, textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
 }
 
 input:focus, textarea:focus {
  outline: none;
  border-color: #0B3B24;
  box-shadow: 0 0 0 3px rgba(11, 59, 36, 0.1);
 }
 
 textarea {
  resize: vertical;
  min-height: 150px;
 }
 
 .submit-btn {
  width: 100%;
  padding: 1rem;
  background: #0B3B24;
  color: white;
  border: 2px solid #c41e3a;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
 }
 
 .submit-btn:hover {
  background: #c41e3a;
  border-color: #0B3B24;
 }
 
 /* Info Section */
 .info-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
 }
 
 .info-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
 }
 
 .info-block {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
 }
 
 .info-block i {
  font-size: 1.5rem;
  color: #c41e3a;
  width: 24px;
 }
 
 .info-block h3 {
  margin: 0;
  color: #0B3B24;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
 }
 
 .info-block p {
  margin: 0;
  color: #666;
  line-height: 1.5;
 }
 
 .contact-link {
  text-decoration: none;
  color: #666;
  transition: color 0.3s ease;
 }
 
 .contact-link:hover {
  color: #c41e3a;
 }
 
 .hours {
  font-size: 0.9rem;
  color: #888;
  margin-top: 0.25rem;
 }
 
 .address-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
 }
 
 .address-info {
  display: flex;
  gap: 1rem;
 }
 
 .map-container {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 1rem;
 }
 
 .map-container iframe {
  width: 100%;
  height: 100%;
  border: none;
 }
 
 /* Social Section */
 .social-section {
  margin-top: 1rem;
  text-align: center;
 }
 
 .social-section h3 {
  color: #0B3B24;
  margin-bottom: 1rem;
 }
 
 .social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
 }
 
 .social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0B3B24;
  text-decoration: none;
  transition: all 0.3s ease;
 }
 
 .social-icon:hover {
  background: #0B3B24;
  color: white;
  transform: translateY(-2px);
 }
 
 /* Success Message */
 .success-message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
 }
 
 .success-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  width: 90%;
 }
 
 .success-content i {
  font-size: 3rem;
  color: #0B3B24;
  margin-bottom: 1rem;
 }
 
 .success-content h3 {
  color: #0B3B24;
  margin-bottom: 0.5rem;
 }
 
 .success-content p {
  color: #666;
  margin-bottom: 1.5rem;
 }
 
 .close-btn {
  padding: 0.75rem 2rem;
  background: #0B3B24;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
 }
 
 .close-btn:hover {
  background: #072a1c;
 }
 
 /* Transition animations */
 .fade-enter-active,
 .fade-leave-active {
  transition: opacity 0.3s ease;
 }
 
 .fade-enter-from,
 .fade-leave-to {
  opacity: 0;
 }
 
 /* Responsive Design */
 @media (max-width: 992px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  h1 {
    font-size: 3rem;
  }
 }
 
 @media (max-width: 768px) {
  .contact-page {
    padding: 2rem 1rem;
  }
 
  h1 {
    font-size: 2.5rem;
  }
 
  .form-section, .info-section {
    padding: 1.5rem;
  }
 }
 
 @media (max-width: 480px) {
  h1 {
    font-size: 2rem;
  }
 
  .info-block {
    flex-direction: column;
    text-align: center;
  }
 
  .info-block i {
    margin: 0 auto 0.5rem;
  }
 
  .address-info {
    flex-direction: column;
    align-items: center;
  }
 
  .map-container {
    height: 150px;
  }
 }
 </style>