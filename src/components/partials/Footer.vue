<template>
  <section class="bg-blue-600 py-12">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="mb-6 md:mb-0">
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">
            Subscribe to Our Newsletter
          </h2>
          <p class="text-blue-100">
            Get exclusive deals and travel inspiration directly to your inbox.
          </p>
        </div>
        <div class="flex">
          <input
            type="email"
            v-model="email"
            placeholder="Your email address"
            class="px-4 py-3 rounded-l-md w-full md:w-64 focus:outline-none"
          />
          <button
            class="bg-yellow-500 text-white px-6 py-3 rounded-r-md hover:bg-yellow-600 transition duration-300"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
</script>
