<script setup>
import { ref, watch, toRef } from "vue";
import { useUserStore } from "@/stores/userStore.js";
const userStore = useUserStore();
const authError = toRef(userStore, "error");

const errorText = ref("");

watch(
  authError,
  (newError) => {
    const errorMessages = {
      "auth/weak-password": "Password should be at least 6 characters.",
      "auth/invalid-email": "Please enter a valid email.",
      "auth/email-already-in-use": "This email is already in use.",
      "auth/user-not-found": "Wrong email or password.",
      "auth/wrong-password": "Wrong email or password.",
    };

    errorText.value =
      errorMessages[newError.code] || "Something went wrong. Please try again.";
  },
  { immediate: true }
);
</script>

<template>
  <article class="message is-danger is-small">
    <div class="message-body">{{ errorText }}</div>
  </article>
</template>
