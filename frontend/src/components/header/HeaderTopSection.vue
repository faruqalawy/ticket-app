<template>
  <div class="flex justify-between custom-display place-items-center h-28">
    <!-- Left side of component -->
    <div class="flex items-center gap-3 w-full justify-between">
      <router-link :to="{ name: 'Dashboard' }">
        <h1 class="text-white text-xl md:text-2xl lg:text-4xl">
          Ticketing App
        </h1>
      </router-link>

      <button
        @click="handleLogout"
        class="md:hidden text-white text-sm md:text-base bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition-colors"
      >
        Logout
      </button>
    </div>

    <!-- Right side of component -->
    <div>
      <div class="hidden md:block">
        <SearchBar />
      </div>
    </div>
  </div>
</template>
<script setup>
import SearchBar from "./SearchBar.vue";
import api from "../../services/api";

const handleLogout = async () => {
  await api.post('/logout');
  router.push('/login')
}
</script>
<style>
.centered-text {
  font-size: 10px; 
  fill: black; 
  font-family: "Montserrat";
}
</style>
