<script setup>
import { ref, computed } from "vue";
import EntryCard from "@/components/EntryCard.vue";
import EntryForm from "@/components/forms/EntryForm.vue";
import { RouterLink } from "vue-router";
import { PhPenNib } from "@phosphor-icons/vue";

// stores
import { useUserStore } from "@/stores/userStore.js";
import { useEntryStore } from "@/stores/entryStore.js";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { userData } = storeToRefs(userStore);

const entryStore = useEntryStore();
const { entries, sortedEntries, isLoading } = storeToRefs(entryStore);

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
    <div class="column is-7 mx-auto">
      <h1 class="title">{{ userData.username }}'s journal</h1>

      <template v-if="isLoading">
        <div>Loading...</div>
      </template>

      <template v-else-if="userHasEntries">
        <span class="is-block mb-4">{{ numOfEntriesText }}</span>
        <div class="mb-5" v-for="entry in sortedEntries" :key="entry.entry_id">
          <router-link :to="{ name: 'entry', params: { id: entry.entry_id } }">
            <EntryCard :entry="entry" />
          </router-link>
        </div>
      </template>

      <template v-else>
        <img src="public\img\woman-writing.svg" class="no-entries-img" />
        <p>Your journal has no entries yet. Try writing your first one!</p>
      </template>

      <button type="button" class="button is-primary mt-6" @click="showModal = true">
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
.no-entries-img {
  max-width: 400px;
  display: block;
  margin: 0 auto;
}

button {
  padding: 1.5em;
  position: fixed;
  bottom: 1em;
  right: 1em;
}
</style>
