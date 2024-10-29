<template>
  <div class="flex bg-white w-full rounded-md">
    <input
      v-model="searchQuery"
      type="text"
      class="border-none w-full rounded-md px-2"
      placeholder="Search ticket..."
      @keyup.enter="handleSearch"
    />
    <i
      class="fa-solid fa-magnifying-glass p-2 cursor-pointer"
      style="color: #0c3b66;"
      @click="handleSearch"
    ></i>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const router = useRouter();

const handleSearch = () => {
  if (searchQuery.value) {
    router.push({ name: 'SearchResultPage', query: { q: searchQuery.value } });
    searchQuery.value = ''; 
  }
};
</script>
