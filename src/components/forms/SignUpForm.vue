<script setup>
import { ref } from "vue";
import router from "@/router/index";
import { fetchUnsplashImage } from "@/assets/js/unsplashService.js";

// stores
import { useUserStore } from "@/stores/userStore.js";
const userStore = useUserStore();

// data
const username = ref("Test name");
const email = ref("testemail@gmail.com");
const password = ref("testpassword1234");
const icon = ref("");

// methods
const getUserIconImg = async () => {
  const img = await fetchUnsplashImage();
  icon.value = img;
};
const handleSubmit = async () => {
  await getUserIconImg();
  console.log(icon.value);
  const user = await userStore.registerUser(
    username.value,
    email.value,
    password.value,
    icon.value
  );
  // TODO: Handle register errors
  if (user) {
    router.push("/home");
    // TODO: Make pop up
    alert("Welcome!!!!!!!!!!!");
  }
};
</script>

<template>
  <!-- TODO: Validations -->
  <form class="box p-6" @submit.prevent="handleSubmit">
    <div class="field">
      <label class="label">Username</label>
      <input
        class="input"
        type="text"
        placeholder="Enter your username"
        v-model.trim="username"
        required
      />
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          class="input"
          type="email"
          placeholder="Enter your email"
          v-model.trim="email"
          required
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input
          class="input"
          type="password"
          placeholder="Enter your password"
          v-model.trim="password"
          required
        />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button type="submit" class="button is-primary is-fullwidth mt-5">Sign up</button>
      </div>
    </div>

    <span class="is-block has-text-centered is-size-7">
      Already have an account?
      <router-link
        :to="{ name: 'sign-in' }"
        class="is-link has-text-primary-dark is-underlined"
        >Sign in</router-link
      >
    </span>
  </form>
</template>
