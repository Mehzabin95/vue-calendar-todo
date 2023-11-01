<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
  <div>
    <Calender class="container mx-auto" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Calender = defineAsyncComponent(
  () => import("./components/calender/IndexCal.vue")
);
</script>

<style></style>
