<script setup>
const props = defineProps({
  img: String,
});
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content box p-6">
      <h1 class="title">Welcome to TinyJournal!</h1>
      <p>Your account has been successfully created.</p>
      <p>
        We've assigned you an image by Unsplash user
        <a href="https://unsplash.com/es/@codioful" target="_blank">codioful</a> as your
        icon. Just letting you know!
      </p>
      <img :src="props.img" class="is-block mx-auto my-5" />
      <router-link :to="{ name: 'home' }">
        <button class="button is-primary is-block mx-auto" aria-label="close">
          Dismiss
        </button>
      </router-link>
    </div>
  </div>
</template>
