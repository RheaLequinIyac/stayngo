<template>
  <div class="fixed w-full py-4 bg-white shadow-md text-gray-800 z-[1000]">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center">
        <a href="/" class="flex items-center space-x-2">
          <div
            class="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center"
          >
            <span class="text-white font-bold text-lg">SnG</span>
          </div>
          <span class="text-2xl font-bold text-blue-600">SkyStay</span>
        </a>
        <div class="hidden md:flex space-x-8 items-center">
          <a
            href="/"
            class="font-medium hover:text-blue-600 transition-colors duration-200"
            >Home</a
          >
          <a
            href="/about"
            class="font-medium hover:text-blue-600 transition-colors duration-200"
            >About</a
          >
          <a
            href="/contact"
            class="font-medium hover:text-blue-600 transition-colors duration-200"
            >Contact</a
          >
          <div class="border-l border-gray-300 h-6 mx-4"></div>
          <a
            v-if="!defaultStore.isLogged"
            href="/login"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
            >Login</a
          >
          <div v-else class="flex space-x-4 items-center">
            <!-- Admin dropdown menu -->
            <div v-if="defaultStore.role === 'admin'" class="relative">
              <button
                @click="toggleAdminMenu"
                @blur="closeAdminMenuWithDelay"
                class="flex items-center font-medium hover:text-blue-600 transition-colors duration-200"
              >
                Admin
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                v-show="isAdminMenuOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20"
              >
                <a
                  href="/admin/users"
                  class="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                  >Users</a
                >
                <a
                  href="/admin/reservations"
                  class="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                  >Reservations</a
                ><a
                  href="/admin/inqueries"
                  class="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                  >Inqueries</a
                >
              </div>
            </div>
            <button
              @click="logout"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
        <div class="md:hidden">
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <svg
              v-if="!isMenuOpen"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div v-if="isMenuOpen" class="md:hidden pt-4 pb-2 space-y-3">
        <a
          href="/"
          class="block py-2 font-medium hover:text-blue-600 transition-colors duration-200"
          >Home</a
        >
        <a
          href="/about"
          class="block py-2 font-medium hover:text-blue-600 transition-colors duration-200"
          >About</a
        >
        <a
          href="/contact"
          class="block py-2 font-medium hover:text-blue-600 transition-colors duration-200"
          >Contact</a
        >
        <div class="border-t border-gray-200 my-2"></div>
        <!-- Mobile admin options -->
        <div v-if="defaultStore.isLogged && defaultStore.role === 'admin'" class="py-2">
          <div 
            @click="isMobileAdminOpen = !isMobileAdminOpen"
            class="flex items-center justify-between cursor-pointer font-medium hover:text-blue-600"
          >
            <span>Admin</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1"
              :class="{'transform rotate-180': isMobileAdminOpen}"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div v-show="isMobileAdminOpen" class="mt-2 pl-4 space-y-2">
            <a
              href="/admin/users"
              class="block py-1 text-gray-700 hover:text-blue-600"
              >Users</a
            >
            <a
              href="/admin/reservations"
              class="block py-1 text-gray-700 hover:text-blue-600"
              >Reservations</a
            >
            <a
              href="/admin/inqueries"
              class="block py-1 text-gray-700 hover:text-blue-600"
              >Inqueries</a
            >
          </div>
        </div>
        <a
          v-if="!defaultStore.isLogged"
          href="/login"
          class="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 inline-block mt-2"
          >Login</a
        >
        <button
          v-else
          @click="logout"
          class="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 inline-block mt-2"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useDefaultStore } from "@/components/store/defaultState.js";

const defaultStore = useDefaultStore();
const router = useRouter();
const isMenuOpen = ref(false);
const isAdminMenuOpen = ref(false);
const isMobileAdminOpen = ref(false);
let closeTimeout = null;

function logout() {
  defaultStore.setLogout();
  router.push("/login");
}

function toggleAdminMenu() {
  isAdminMenuOpen.value = !isAdminMenuOpen.value;
  if (closeTimeout) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
}

function closeAdminMenuWithDelay() {
  // Small delay to allow clicking on menu items
  closeTimeout = setTimeout(() => {
    isAdminMenuOpen.value = false;
  }, 150);
}
</script>