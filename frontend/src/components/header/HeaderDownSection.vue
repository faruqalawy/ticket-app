<template>
  <div class="flex items-center custom-display py-4">
    <!-- Small display, just placed search bar -->
    <div class="md:hidden w-full">
      <SearchBar />
    </div>
    <div class="ml-auto hidden md:flex">
      <button
        @click="handleLogout"
        class="text-white text-sm md:text-base bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition-colors mx-3"
      >
        Logout
      </button>
      <button
        v-if="isAdmin"
        @click="goToRegister"
        class="text-white text-sm md:text-base bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md transition-colors flex items-center gap-1"
      >
        <i class="fa-solid fa-plus"></i> Register New Account
      </button>
    </div>
  </div>
</template>

<script setup>
  import SearchBar from './SearchBar.vue'
  import api from '../../services/api';

  import { useRouter } from 'vue-router';
  import { onMounted, ref } from 'vue';

  const isAdmin = ref(false); 

// Check current user role
const checkUserRole = async () => {
  try {
    const response = await api.get('/current-user');
    isAdmin.value = response.data.user.role === 'admin';
  } catch (error) {
    console.error('Failed to fetch user role:', error);
  }
};

const goToRegister = () => {
  router.push('/register');
};

  const router = useRouter()

  const handleLogout = async () => {
    await api.post('/logout');
    router.push('/login')
  }

  onMounted(() => {
    checkUserRole();
  })
</script>
