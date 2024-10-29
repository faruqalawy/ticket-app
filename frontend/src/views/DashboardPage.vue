<template>
  <div class="container mx-auto mt-10 custom-display">
    <h2 class="text-3xl font-semibold mb-4">Dashboard</h2>
    <TicketCard :tickets="tickets" />
  </div>
</template>

<script setup>
import api from '../services/api';
import { onMounted, ref } from 'vue';
import TicketCard from '../components/TicketCard.vue';

// Declare tickets as a ref
const tickets = ref([]);

onMounted(async () => {
  try {
    const response = await api.get('/tickets');
    tickets.value = response.data;
  } catch (error) {
    alert('Failed to fetch tickets');
  }
});
</script>
