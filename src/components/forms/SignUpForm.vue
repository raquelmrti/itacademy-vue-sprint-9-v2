<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore.js";

const userStore = useUserStore()

const username = ref("Test name");
const email = ref("testemail@gmail.com");
const password = ref("testpassword123456789");

const handleSubmit = async () => {
  const user = await userStore.registerUser(username.value, email.value, password.value);
  if (user) {
    console.log(user);
    username.value = "";
    email.value = "";
    password.value = "";
  }
};
</script>

<template>
  <p>{{ userStore.userData }}</p>
  <div class="columns">
    <div class="column is-7 mx-auto">
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
            <button type="submit" class="button is-primary is-fullwidth mt-5">
              Create account
            </button>
          </div>
        </div>

        <p class="has-text-centered is-size-7">
          Already have an account? <a href="/sign-in">Sign In</a>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.input {
  border: 1px solid lightgray;
}
</style>
