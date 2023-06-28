<script setup>
import { ref, onUnmounted } from "vue";
import router from "@/router/index";
import AuthErrorMessage from "@/components/AuthErrorMessage.vue";

// stores
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore.js";
const userStore = useUserStore();
const { isLoading, error } = storeToRefs(userStore);

// data
const email = ref("testemail@gmail.com");
const password = ref("testpassword1234");

// methods
const handleSubmit = async () => {
  const user = await userStore.signInUser(email.value, password.value);
  if (user) {
    router.push("/home");
  }
};

onUnmounted(() => {
  error.value = "";
});
</script>

<template>
  <div>
    <form class="box p-6" @submit.prevent="handleSubmit">
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

      <AuthErrorMessage v-if="error" />

      <div class="field">
        <div class="control">
          <button
            type="submit"
            :class="['button is-primary is-fullwidth mt-5', { 'is-loading': isLoading }]"
          >
            Sign in
          </button>
        </div>
      </div>

      <span class="is-block has-text-centered is-size-7">
        Don't have an account?
        <router-link
          :to="{ name: 'sign-up' }"
          class="is-link has-text-primary-dark is-underlined"
          >Create one</router-link
        >
      </span>
    </form>
  </div>
</template>
