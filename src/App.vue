<script setup>
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { ref, watch } from "vue";
import { RouterView } from "vue-router";
import TheNavbar from "@/components/TheNavbar.vue";
import TheFooter from "@/components/TheFooter.vue";
import { useRoute } from "vue-router";
const route = useRoute();

import { useUserStore } from "@/stores/userStore.js";
const userStore = useUserStore();

import { useEntryStore } from "@/stores/entryStore.js";
const entryStore = useEntryStore();

const pageNeedsNav = ref(false);

watch(route, (newRoute) => {
  if (newRoute.name === "entry" || newRoute.name === "home") {
    pageNeedsNav.value = true;
  } else {
    pageNeedsNav.value = false;
  }
});

// Update user data whenever auth state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    userStore.updateUserData(user);
    await entryStore.getEntries(userStore.userData.uid);
  }
});
</script>

<template>
  <TheNavbar v-if="pageNeedsNav" />
  <div class="container px-5 pt-6 my-6">
    <div class="columns">
      <RouterView />
    </div>
  </div>
  <TheFooter />
</template>

<style scoped>
.container {
  min-height: 75vh;
}
</style>
