<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import EntryFull from "@/components/EntryFull.vue";

// stores
import { useEntryStore } from "@/stores/entryStore.js";
const entryStore = useEntryStore();

// data
const route = useRoute();
const entryId = route.params.id;
const entry = ref(null);

// lifecycle hooks
onMounted(async () => {
  entry.value = await entryStore.getEntryById(entryId);
});
</script>

<template>
  <template v-if="entry">
    <div class="columns is-flex-grow-1">
      <div class="column is-8 mx-auto p-5">
        <EntryFull :entry="entry" :entryId="entryId" />
      </div>
    </div>
  </template>
</template>
