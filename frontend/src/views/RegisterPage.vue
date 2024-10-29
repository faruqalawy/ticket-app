<template>
    <div class="h-screen overflow-hidden flex items-center justify-center" style="background: #edf2f7">
      <div class="flex h-screen w-screen">
        <!-- Left Pane -->
        <div class="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
          <AuthIllustration />
        </div>
        <!-- Right Pane -->
        <div class="w-full bg-offWhite lg:w-1/2 flex items-center justify-center">
          <div class="max-w-md w-full p-6">
            <h1 class="text-3xl font-semibold mb-6 text-black text-center">Register New Account</h1>
            <form class="space-y-4" @submit.prevent="handleRegister">
              <div>
                <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                <input
                  v-model="username"
                  type="text"
                  id="username"
                  class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  required
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  v-model="email"
                  type="email"
                  id="email"
                  class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  required
                />
              </div>
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input
                  v-model="password"
                  type="password"
                  id="password"
                  class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  required
                />
              </div>
              <div>
                <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
                <select v-model="role" id="role" class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" required>
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import AuthIllustration from "../components/authIllustration.vue";
  import api from "../services/api";
  
  const router = useRouter();
  const username = ref("");
  const email = ref("");
  const password = ref("");
  const role = ref("client");
  
  const handleRegister = async () => {
    try {
      await api.post("/register", {
        username: username.value,
        email: email.value,
        password: password.value,
        role: role.value,
      });
      alert("Registration successful!");
      router.push("/dashboard"); 
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error during registration. Please try again.");
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  