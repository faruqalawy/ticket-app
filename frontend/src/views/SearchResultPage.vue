<template>
    <div class="container mx-auto mt-10 custom-display">
      <h2 class="text-3xl font-semibold mb-4">Search Results for: "{{ query }}"</h2>
      <div v-if="error" class="text-red-500 text-center">
        {{ error }}
      </div>
      <div v-if="!filteredTickets.length && !error" class="text-center">
        No tickets found for "{{ query }}"
      </div>
      <TicketCard v-if="filteredTickets.length" :tickets="filteredTickets" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import api from '../services/api';
  import TicketCard from '../components/TicketCard.vue';
  
  const tickets = ref([]);
  const filteredTickets = ref([]);
  const route = useRoute();
  const query = ref(route.query.q || '');
  const error = ref(null);
  
  const loadTickets = async () => {
    try {
      const response = await api.get('/tickets');
      tickets.value = response.data;
      applyFilter();
    } catch (e) {
      error.value = 'Failed to load tickets';
    }
  };
  
  const applyFilter = () => {
    filteredTickets.value = tickets.value.filter(ticket =>
      ticket.title.toLowerCase().includes(query.value.toLowerCase()) ||
      ticket.description.toLowerCase().includes(query.value.toLowerCase())
    );
  };
  
  onMounted(loadTickets);
  
  // Watch for changes in query and reapply filter
  watch(() => route.query.q, (newQuery) => {
    query.value = newQuery || '';
    applyFilter();
  });
  </script>
  