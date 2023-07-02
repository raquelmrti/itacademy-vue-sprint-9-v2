<script setup>
import { ref, onUnmounted } from "vue";
import { fetchUnsplashImage } from "@/assets/js/unsplashService.js";
import AuthErrorMessage from "@/components/AuthErrorMessage.vue";
import ModalWelcome from "@/components/ModalWelcome.vue";

// stores
import { useUserStore } from "@/stores/userStore.js";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { isLoading, error } = storeToRefs(userStore);
const { registerUser } = userStore;

// data
const username = ref("");
const email = ref("");
const password = ref("");
const icon = ref("");
const showModalWelcome = ref(false);

// methods
const getUserIconImg = async () => {
  const img = await fetchUnsplashImage();
  icon.value = img;
};
const handleSubmit = async () => {
  await getUserIconImg();
  const user = await registerUser(
    username.value,
    email.value,
    password.value,
    icon.value
  );

  if (user) {
    showModalWelcome.value = true;
  }
};

onUnmounted(() => {
  error.value = "";
});
</script>

<template>
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

    <AuthErrorMessage v-if="error" />

    <div class="field">
      <div class="control">
        <button
          type="submit"
          :class="['button is-primary is-fullwidth mt-5', { 'is-loading': isLoading }]"
          ref="signUpButton"
        >
          Sign up
        </button>
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
  <Teleport to="body">
    <ModalWelcome :img="icon" v-if="showModalWelcome" />
  </Teleport>
</template>
