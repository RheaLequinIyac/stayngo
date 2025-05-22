<template>
  <div id="app">
    <HeaderVue />
   <div class="pt-[75px]">
    <router-view />
   </div>
    <FooterVue />
  </div>
</template>

<script setup>
import HeaderVue from "./components/partials/Header.vue";
import FooterVue from "./components/partials/Footer.vue";
</script>
