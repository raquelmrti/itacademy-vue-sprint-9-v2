<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="container has-text-centered px-3">
    <div class="columns">
      <div class="column is-10 mx-auto">
        <img src="http://via.placeholder.com/640x360" alt="" />
        <h1 class="title">TinyJournal</h1>
        <h2 class="subtitle">A simple and easy-to-use online journal</h2>
        <p>
          Build your own little private space to jot down your thoughts and daily
          occurrences. With its simple interface, TinyJournal allows you to start writing
          in no time!
        </p>
        <!-- TODO: change link so it takes authenticated user to home -->
        <router-link :to="{ name: 'sign-in' }" class="button is-primary mt-4"
          >Get started</router-link
        >
      </div>
    </div>
  </div>
</template>
