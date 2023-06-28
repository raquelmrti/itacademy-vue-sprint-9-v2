<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="container has-text-centered px-3">
    <div class="columns is-align-items-center">
      <div class="column">
        <img class="landing-img" src="public\img\woman-writing.svg" alt="" />
      </div>

      <div class="column landing-text">
        <h1 class="title">TinyJournal</h1>
        <h2 class="subtitle">A simple and easy-to-use online journal</h2>
        <p>
          Build your own little private space to jot down your thoughts and daily
          occurrences. With its simple interface, TinyJournal allows you to start writing
          in no time.
        </p>
        <router-link :to="{ name: 'sign-up' }" class="button is-primary mt-4"
          >Get started</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;700&family=Literata:ital,wght@1,900&display=swap");
.landing-img {
  max-width: 500px;
}

.button {
  margin-bottom: 5em;
}

@media screen and (min-width: 769px) {
  .landing-img {
    max-width: none;
  }

  .landing-text {
    text-align: left;
  }

  .title {
    font-size: 3rem;
    font-family: "Bai Jamjuree", sans-serif;
    font-family: "Literata", serif;
  }

  .button {
    margin-bottom: 0;
  }
}
</style>
