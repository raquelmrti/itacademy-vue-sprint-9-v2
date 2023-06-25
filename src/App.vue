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
  }
});
</script>

<template>
  <div class="container px-5 pt-6 my-6">
    <div class="columns">
      <RouterView />
    </div>
  </div>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>TinyJournal</strong> by
        <a href="https://github.com/raquelmrti" class="has-text-primary"
          >Raquel Martínez</a
        >, for IT Academy. 2023
      </p>
    </div>
  </footer>
</template>
