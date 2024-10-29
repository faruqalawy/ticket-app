<script setup>
import { RouterView, useRoute } from 'vue-router';
import HeaderView from './components/header/HeaderView.vue';
import FooterView from './components/FooterView.vue';

const route = useRoute();
</script>

<template>
  <div id="app">
    <header v-if="route.name !== 'Login' && route.name !== 'Register'">
      <HeaderView />
    </header>
    <main>
      <RouterView />
    </main>
    <footer v-if="route.name !== 'Login' && route.name !== 'TicketDetail' && route.name !== 'Register'">
      <FooterView />
    </footer>
  </div>
</template>

<style scoped>

</style>
