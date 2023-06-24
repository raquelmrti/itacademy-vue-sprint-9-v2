<script setup>
import { RouterLink, RouterView } from "vue-router";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
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
  <main>
    <section>
      <div v-if="userStore.userData">
        <span class="is-size-6"> Signed in as: {{ userStore.userData.email }} </span>
      </div>
      <RouterView />
    </section>
  </main>
</template>
