<script setup>
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref, computed, watch } from "vue";
import { useUserStore } from "@/stores/userStore.js";
const userStore = useUserStore();

import { useEntryStore } from "@/stores/entryStore.js";
const entryStore = useEntryStore();

// Update user data whenever auth state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    userStore.updateUserData(user);
    await entryStore.getEntries(userStore.userData.uid);
    console.log(entryStore.entries);
  }
});
</script>

<template>
  <div class="container px-5 pt-6 mt-6">
    <div class="columns">
      <RouterView />
    </div>
  </div>
</template>
