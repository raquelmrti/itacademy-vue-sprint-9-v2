<script setup>
import { useUserStore } from "@/stores/userStore.js";
import { ref, watch } from "vue";
import { useRouter, RouterLink } from "vue-router";
const router = useRouter();
import { PhCaretDown, PhCaretUp } from "@phosphor-icons/vue";

// stores
const userStore = useUserStore();
const { userData } = storeToRefs(userStore);
import { storeToRefs } from "pinia";

// data
const icon = ref("");
const showMenu = ref(false);

// methods
const toggleShowMenu = () => (showMenu.value = !showMenu.value);
const onLogout = async () => {
  const logoutResult = await userStore.logoutUser();
  if (logoutResult === "success") {
    toggleShowMenu();
    router.push("/");
  }
};

watch(
  userData,
  () => {
    icon.value = "url(" + userStore.userData.icon + ")";
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <nav>
    <div class="visible-wrapper">
      <div class="visible">
        <div class="logo">
          <RouterLink :to="{ name: 'home' }">
            <img src="@/../public/img/logo.png" alt="TinyJournal logo" class="logo-img" />
          </RouterLink>
        </div>

        <div class="icon"></div>
        <div class="username" @click="toggleShowMenu">
          {{ userData.username }}
        </div>
        <span>
          <ph-caret-down
            class="caret-icon"
            :size="20"
            v-if="!showMenu"
            @click="toggleShowMenu"
          />

          <ph-caret-up
            class="caret-icon"
            :size="20"
            v-if="showMenu"
            @click="toggleShowMenu"
          />
        </span>
      </div>
    </div>
    <div class="menu" v-if="showMenu">
      <div class="button-wrapper">
        <button type="button" class="menu-button" @click="onLogout">Log out</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.icon {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-image: v-bind(icon);
  background-size: cover;
}

span > * {
  margin-left: 0em;
  margin-top: 5px;
}

nav {
  align-items: center;
  color: #fff;
}

.visible-wrapper {
  background-color: #9b4464;
}

.visible {
  display: flex;
  padding: 1em 2em;
  align-items: center;
}

.logo {
  flex-grow: 1;
}

.logo-img {
  max-width: 150px;
}

.username {
  cursor: default;
  padding: 0.5em 1em;
  border-radius: 6px;
  font-size: 0.85em;
}

.username:hover,
span:hover,
.menu-button {
  cursor: pointer;
}
.menu {
  position: absolute;
  right: 1em;
  padding: 1em;
  border-radius: 5px;
  justify-content: end;
  border: 1px solid #d0d1cd;
  border-radius: 5px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0px 0 1px rgba(10, 10, 10, 0.02);
  margin-top: 1em;
}

.menu-button {
  display: block;
  background: none;
  font-size: 1em;
  justify-self: end;
  border: none;
  color: #757763;
  z-index: 1000;
}

@media screen and (max-width: 530px) {
  .icon {
    margin-right: 1em;
  }
  .username {
    display: none;
  }

  span > * {
    margin-left: 0;
  }
  .menu {
    padding: 1.5em;
    border-radius: 6px;
    display: block;
    position: static;
    margin-top: 0;
    border-radius: 0;
    border-left: none;
    border-top: 0;
    border-right: none;
  }

  .menu-button {
    /* display: block; */
    width: initial;
    margin: 0 auto;
    background: none;
    border: none;
    font-size: 1em;
    justify-self: end;
  }
}
</style>
