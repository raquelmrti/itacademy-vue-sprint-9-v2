<script setup>
import { useUserStore } from "@/stores/userStore.js";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { PhCaretDown, PhCaretUp } from "@phosphor-icons/vue";

// stores
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { userData } = storeToRefs(userStore);

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
        <!-- TODO: Logo -->
        <div class="logo">TinyJournal</div>

        <div class="userIcon"></div>
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
.userIcon {
  width: 40px;
  height: 40px;
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

.username {
  cursor: default;
  padding: 0.5em 1em;
  border-radius: 6px;
}

.username:hover,
span:hover {
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
  cursor: pointer;
}

.menu-button {
  display: block;
  background: none;
  font-size: 1em;
  justify-self: end;
  border: none;
  color: #757763;
}

@media screen and (max-width: 530px) {
  .userIcon {
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
