<!-- src/views/AddTicket.vue -->
<template>
    <div class="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-md my-8">
      <h1 class="text-2xl font-bold text-center mb-6 dark:text-white">Add New Ticket</h1>
      <form @submit.prevent="handleAddTicket">
        <div class="mb-4">
          <label for="title" class="block text-gray-700 dark:text-gray-300">Title</label>
          <input
            v-model="title"
            type="text"
            id="title"
            class="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            v-model="description"
            id="description"
            class="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition duration-200"
        >
          Add Ticket
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import api from "../services/api";
  
  const title = ref("");
  const description = ref("");
  const router = useRouter();
  
  const handleAddTicket = async () => {
    try {
      await api.post("/tickets", {
        title: title.value,
        description: description.value,
      });
      alert("Ticket added successfully!");
      router.push("/dashboard"); 
    } catch (error) {
      console.error("Failed to add ticket:", error);
      alert("Failed to add ticket. Please try again.");
    }
  };
  </script>