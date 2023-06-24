<script setup>
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref, computed, watch } from "vue";
import { useUserStore } from "@/stores/userStore.js";
const userStore = useUserStore();

// Update user data whenever auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    userStore.updateUserData(user);
  }
});
</script>

<template>
  <div v-if="userStore.userData">
    <span class="is-size-6">
      Signed in as: {{ userStore.userData.email }} || {{ userStore.userData.uid }} ||
      {{ userStore.userData.username }}
    </span>
    <div class="container px-5 pt-6 mt-6">
      <div class="columns">
        <RouterView />
      </div>
    </div>
  </div>
</template>
