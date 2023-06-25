<script setup>
import { ref, onUnmounted, computed } from "vue";
import { PhPenNib } from "@phosphor-icons/vue";
import EntryCard from "@/components/EntryCard.vue";
import EntryForm from "@/components/forms/EntryForm.vue";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// stores
import { useUserStore } from "@/stores/userStore.js";
import { useEntryStore } from "@/stores/entryStore.js";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { userData } = storeToRefs(userStore);

const entryStore = useEntryStore();
const { entries, isLoading } = storeToRefs(entryStore);

// TODO: get rid of this maybe
onUnmounted(() => {
  entryStore.$reset();
});

// data
const showModal = ref(false);
const userHasEntries = computed(() => {
  return entries.value.length > 0;
});

const numOfEntries = computed(() => {
  return entries.value.length;
});

const numOfEntriesText = computed(() => {
  return numOfEntries.value === 1 ? "1 entry" : `${numOfEntries.value} entries`;
});
</script>

<template>
  <template v-if="userData">
    <div class="column is-9 mx-auto">
      <h1 class="title">{{ userData.username }}'s journal</h1>

      <template v-if="isLoading">
        <div>Loading...</div>
      </template>

      <template v-else-if="userHasEntries">
        <span class="is-block mb-4">{{ numOfEntriesText }}</span>
        <EntryCard v-for="entry in entries" :key="entry.entry_id" :entry="entry" />
      </template>

      <template v-else>
        <p>Your journal has no entries yet. Try writing your first one!</p>
      </template>

      <button
        type="button"
        class="button is-primary is-large-mobile mt-6"
        @click="showModal = true"
      >
        <span class="icon mr-2">
          <ph-pen-nib :size="20" />
        </span>
        Write entry
      </button>
      <EntryForm
        v-if="showModal"
        @click="showModal = true"
        @closeModal="showModal = false"
      />
    </div>
  </template>
</template>

<style scoped>
button {
  padding: 1.5em;
  position: fixed;
  bottom: 1em;
  right: 1em;
}
</style>
