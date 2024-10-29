<template>
  <div
    class="h-screen overflow-hidden flex items-center justify-center"
    style="background: #edf2f7"
  >
    <div class="flex h-screen w-screen">
      <!-- Left Pane -->
      <div
        class="hidden lg:flex items-center justify-center flex-1 bg-white text-black"
      >
        <AuthIllustration />
      </div>
      <!-- Right Pane -->
      <div class="w-full bg-offWhite lg:w-1/2 flex items-center justify-center">
        <div class="max-w-md w-full p-6">
          <h1 class="text-3xl font-semibold mb-6 text-black text-center">
            {{ userType === 'admin' ? 'Admin' : 'Client' }} Login
          </h1>
          <form class="space-y-4" @submit.prevent="handleLogin">
            <div>
              <label
                for="username"
                class="block text-sm font-medium text-gray-700"
                >Username</label
              >
              <input
                v-model="username"
                type="text"
                id="username"
                name="username"
                class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                id="password"
                name="password"
                class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                class="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Login
              </button>
            </div>
          </form>
          <div class="mt-4 text-sm text-gray-600 text-center">
            <p v-if="userType === 'client'">
              Are you an admin?
              <button @click="setUserType('admin')" class="text-black hover:underline">Login here</button>
            </p>
            <p v-else>
              Are you a client?
              <button @click="setUserType('client')" class="text-black hover:underline">Login here</button>
            </p>
          </div>
          <div class="mt-4 text-sm text-red-500 text-center">
            <p>
              *Use <b>{{ userType === 'admin' ? "admin" : "demo" }}</b> as the username and <b>password</b> as the
              password to login as a {{ userType === 'admin' ? "admin" : "client" }}.
            </p>
          </div>
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
const password = ref("");
const userType = ref('client');

const setUserType = (type) => {
    userType.value = type;
}

const handleLogin = async () => {
  try {
    const response = await api.post("/login", {
      username: username.value,
      password: password.value,
    });

    const userRole = response.data.user.role; 
    if (userRole === userType.value) {
      router.push('/dashboard');
    } else {
      alert(`Access denied: This login is restricted to ${userType.value} users only.`);
    }
  } catch (error) {
    console.log("Login failed: " + error.message);
  }
};

</script>
