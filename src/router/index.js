// Configuration du routeur - router/index.js

import { createRouter, createWebHistory } from 'vue-router';

// Import des composants de pages principaux
import HomeView from '@/views/HomeView.vue';
import CatalogPage from '@/views/CatalogPage.vue'; 
import FavoritesPage from '@/views/FavoritesPage.vue';

// Création et configuration du routeur
const router = createRouter({
 // Utilisation de l'historique web HTML5
 history: createWebHistory(),

 // Définition des routes de l'application
 routes: [
   // Page d'accueil
   {
     path: '/',
     name: 'home',
     component: HomeView,
   },

   // Catalogue des produits 
   {
     path: '/catalog',
     name: 'catalog', 
     component: CatalogPage,
   },

   // Confirmation de commande (chargement dynamique)
   {
     path: '/order-confirmation',
     name: 'OrderConfirmation',
     component: () => import('@/views/OrderConfirmation.vue'),
   },

   // Tunnel de commande (chargement dynamique)
   {
     path: '/checkout',
     name: 'checkout',
     component: () => import('@/views/CheckoutPage.vue'),
   },

   // Page des favoris
   {
     path: '/favorites',
     name: 'favorites',
     component: FavoritesPage,
   },

   // Détail d'un produit (chargement dynamique)
   {
     path: '/product/:id',
     name: 'product-details',
     component: () => import('@/views/ProductDetails.vue'),
   },

   // Page de contact (chargement dynamique)
   {
     path: '/contact',
     name: 'contact', 
     component: () => import('@/views/ContactPage.vue')
   },
 ],

 // Gestion du scroll lors des changements de route
 scrollBehavior(to, from, savedPosition) {
   // Restaure la position sauvegardée si elle existe
   if (savedPosition) {
     return savedPosition;
   } else {
     // Sinon, scroll vers le haut avec animation
     return { top: 0, behavior: 'smooth' };
   }
 },
});

export default router;