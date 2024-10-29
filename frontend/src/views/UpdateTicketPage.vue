<template>
  <div class="container mx-auto my-10">
    <div v-if="loading" class="text-center">
      <p>Loading...</p>
    </div>
    <div
      v-else-if="ticket"
      class="max-w-lg mx-auto bg-teal-400 p-8 rounded-lg shadow-lg"
    >
      <h2 class="text-white text-2xl font-bold mb-4">Update Ticket</h2>
      <form @submit.prevent="updateTicket">
        <div class="mb-4">
          <label class="text-white" for="title">Title:</label>
          <input
            v-model="ticket.title"
            type="text"
            id="title"
            class="w-full mt-1 p-2 rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="text-white" for="description">Description:</label>
          <textarea
            v-model="ticket.description"
            id="description"
            class="w-full mt-1 p-2 rounded"
            required
          ></textarea>
        </div>
        <div v-if="isAdmin" class="mb-4">
          <label class="text-white" for="status">Status:</label>
          <select
            v-model="ticket.status"
            id="status"
            class="w-full mt-1 p-2 rounded"
          >
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <!-- Admin response field, visible only to admins -->
        <div class="mb-4" v-if="isAdmin">
          <label class="text-white" for="admin_response">Admin Response:</label>
          <textarea
            v-model="adminResponse"
            id="admin_response"
            class="w-full mt-1 p-2 rounded"
            placeholder="Enter admin response here"
          ></textarea>
        </div>
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">
          Update Ticket
        </button>
        <button
          v-if="isAdmin"
          @click.prevent="deleteTicket"
          class="bg-red-500 text-white py-2 px-4 rounded ml-4"
        >
          Delete Ticket
        </button>
      </form>
    </div>
    <div v-else class="text-red-500">
      <p>Error loading ticket details. Please try again.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../services/api";

const route = useRoute();
const router = useRouter();
const ticketId = route.params.ticketId;

const ticket = ref(null);
const loading = ref(true);
const isAdmin = ref(false);
const user = ref(null);
const adminResponse = ref(null);

onMounted(async () => {
  try {
    const response = await api.get(`/tickets/${ticketId}`);
    ticket.value = response.data.ticket;
    user.value = response.data.user;

    isAdmin.value = user.value && user.value.role === "admin";
  } catch (error) {
    console.error("Error fetching ticket:", error);
  } finally {
    loading.value = false;
  }
});

const updateTicket = async () => {
  try {
    if (isAdmin.value && adminResponse.value) {
      await api.post(`/tickets/${ticketId}/respond`, { admin_response: adminResponse.value });
    }
    await api.put(`/tickets/${ticketId}`, ticket.value);
    alert("Ticket updated successfully.");
    router.push({ name: "TicketDetail", params: ticket._id }); // Redirect to the dashboard or desired page
  } catch (error) {
    console.error("Error updating ticket:", error);
    alert("Error updating ticket. Please try again.");
  }
};

const deleteTicket = async () => {
  if (confirm("Are you sure you want to delete this ticket?")) {
    try {
      await api.delete(`/tickets/${ticketId}`);
      alert("Ticket deleted successfully.");
      router.push({ name: "Dashboard" }); 
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Error deleting ticket. Please try again.");
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
