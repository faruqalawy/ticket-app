<template>
    <div class="container mx-auto my-10">
      <div v-if="loading" class="text-center">
        <p>Loading...</p>
      </div>
      <div v-else-if="ticket" class="flex flex-col items-center">
        <div class="p-8 w-full max-w-lg bg-teal-400 rounded-lg shadow-lg">
          <h2 class="text-white text-2xl font-bold mb-4">{{ ticket.title }}</h2>
          <p class="leading-relaxed text-base text-white mb-4">
            {{ ticket.description }}
          </p>
          <p class="text-white">Status: {{ ticket.status }}</p>
          <p class="text-white">Admin Response: {{ ticket.admin_response }}</p>
          <p class="text-white">Created At: {{ new Date(ticket.created_at).toLocaleString() }}</p>
          <p class="text-white">Updated At: {{ new Date(ticket.updated_at).toLocaleString() }}</p>
  
          <div class="mt-4">
            <router-link
              :to="{ name: 'UpdateTicket', params: { ticketId: ticketId } }"
              class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Update Ticket
            </router-link>
          </div>
        </div>
  
        
      </div>
      <div v-else class="text-red-500">
        <p>Error loading ticket details. Please try again.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import api from '../services/api';
  
  const route = useRoute();
  const ticketId = route.params.ticketId;
  
  const ticket = ref(null);
  const user = ref(null);
  const loading = ref(true);
  const isAdmin = ref(false);
  onMounted(async () => {
    try {
      const response = await api.get(`/tickets/${ticketId}`);
      ticket.value = response.data.ticket;
      user.value = response.data.user;
  
      isAdmin.value = user.value && user.value.role === 'admin';
    } catch (error) {
      console.error("Error fetching ticket:", error);
    } finally {
      loading.value = false;
    }
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  