<script setup>
import { ref, onMounted, computed } from "vue";

// stores
import { useUserStore } from "@/stores/userStore.js";
import { storeToRefs } from "pinia";
import { useEntryStore } from "@/stores/entryStore.js";

const userStore = useUserStore();
const { userData } = userStore;

const entryStore = useEntryStore();
const { entries } = storeToRefs(entryStore);

// lifecycle hooks
onMounted(async () => {
  await entryStore.getEntries(userData.uid);
});

// data
const showModal = ref(false);
const userHasEntries = computed(() => {
  return entries.value.length > 0;
});
</script>

<template>
  <div class="column is-9 mx-auto">
    <h1 class="title">{{ userData.username }}'s journal</h1>

    <template v-if="userHasEntries">
      <p>Yas</p>
    </template>

    <template v-else>
      <p>This journal has no entries yet. Try writing your first one!</p>
    </template>

    <button
      type="button"
      class="button is-primary is-fullwidth mt-6"
      @click="showModal = true"
    >
      Write entry
    </button>
  </div>
  <!-- <GameListCreate v-if="showModal" @closeModal="showModal = false" /> -->
</template>
