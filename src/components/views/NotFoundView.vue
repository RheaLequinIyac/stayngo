<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4"
  >
    <div class="max-w-lg w-full text-center">
      <h1 class="text-9xl font-bold text-indigo-600">404</h1>

      <p class="text-6xl font-medium text-gray-700">Page not found</p>

      <p class="text-xl text-gray-500 mt-4 mb-8">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="goBack"
          class="px-5 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
        >
          Go Back
        </button>
        <button
          @click="goHome"
          class="px-5 py-3 bg-white text-indigo-600 rounded-lg border border-indigo-600 hover:bg-gray-50 transition duration-300 shadow-md"
        >
          Return Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const goBack = () => {
  window.history.back();
};
const goHome = () => {
  window.location.href = "/";
};
</script>
