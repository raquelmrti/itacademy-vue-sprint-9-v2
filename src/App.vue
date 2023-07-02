<script setup>
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { ref, watch } from "vue";
import { RouterView } from "vue-router";
import TheNavbar from "@/components/layout/TheNavbar.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import { useRoute } from "vue-router";
const route = useRoute();

// stores
import { useUserStore } from "@/stores/userStore.js";
const userStore = useUserStore();

import { useEntryStore } from "@/stores/entryStore.js";
const entryStore = useEntryStore();

// data
const pageNeedsNav = ref(false);

// watcher
watch(route, (newRoute) => {
  if (newRoute.name === "entry" || newRoute.name === "home") {
    pageNeedsNav.value = true;
  } else {
    pageNeedsNav.value = false;
  }
});

// update user data whenever auth state changes
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
