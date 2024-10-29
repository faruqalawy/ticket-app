<template>
  <div class="flex flex-wrap justify-center mt-10">
    <!-- Perulangan card tiket -->
    <div
      v-for="(ticket, index) in paginatedTickets"
      :key="ticket._id"
      class="p-4 w-full sm:w-1/2 lg:w-1/3"
    >
      <div
        class="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col justify-between"
      >
        <div class="flex items-center mb-3">
          <div
            class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0"
          >
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <h2 class="text-white dark:text-white text-lg font-medium">
            {{ ticket.title }}
          </h2>
        </div>
        <div class="flex-grow">
          <p class="leading-relaxed text-base text-white dark:text-gray-300">
            {{ ticket.description }}
          </p>
        </div>
        <router-link
          :to="{ name: 'TicketDetail', params: { ticketId: ticket._id } }"
          class="mt-3 text-black dark:text-white hover:text-blue-600 inline-flex items-center"
        >
          Learn More
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </router-link>
      </div>
    </div>

    <!-- Card tambahan sebagai tombol untuk membuat tiket baru, ditampilkan hanya di halaman terakhir -->
    <div v-if="isClient && isLastPage" class="p-4 w-full sm:w-1/2 lg:w-1/3">
      <router-link to="/add-ticket" class="flex rounded-lg h-full dark:bg-gray-800 bg-gray-200 p-8 flex-col justify-center items-center hover:bg-gray-300 transition duration-200">
        <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-500 text-white mb-3">
          <i class="fa-solid fa-plus"></i>
        </div>
        <h2 class="text-gray-800 dark:text-white text-lg font-medium">
          Add New Ticket
        </h2>
      </router-link>
    </div>
  </div>

  <!-- Pagination Controls -->
  <div class="flex justify-center my-5">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="px-3 py-1 mx-1 bg-blue-500 text-white rounded disabled:opacity-50"
    >
      Previous
    </button>
    <span class="mx-3">Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 mx-1 bg-blue-500 text-white rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref, computed } from "vue";
import api from "../services/api";

const isClient = ref(false);
const currentPage = ref(1);
const ticketsPerPage = 6; 

const props = defineProps({
  tickets: {
    type: Array,
    required: true,
  },
});

// Menghitung tiket yang dipaginasikan
const paginatedTickets = computed(() => {
  const start = (currentPage.value - 1) * ticketsPerPage;
  const end = start + ticketsPerPage;
  return props.tickets.slice(start, end);
});

// Menghitung total halaman
const totalPages = computed(() => {
  return Math.ceil(props.tickets.length / ticketsPerPage);
});

// Mengecek apakah halaman saat ini adalah halaman terakhir
const isLastPage = computed(() => {
  return currentPage.value === totalPages.value;
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

onMounted(async () => {
  const response = await api.get('/current-user');
  isClient.value = response.data.user.role === 'client';
});
</script>
