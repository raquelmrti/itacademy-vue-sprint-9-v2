<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
import { RouterLink } from "vue-router";
import { PhArrowLeft } from "@phosphor-icons/vue";
import EntryFull from "@/components/EntryFull.vue";

// stores
import { useEntryStore } from "@/stores/entryStore.js";
import { storeToRefs } from "pinia";

const entryStore = useEntryStore();
const { error } = storeToRefs(entryStore);

// data
const entryId = route.params.id;
const entry = ref(null);

// lifecycle hooks
onMounted(async () => {
  entry.value = await entryStore.getEntryById(entryId);
});

onUnmounted(() => {
  error.value = "";
});
</script>

<template>
  <div class="columns is-flex-grow-1">
    <div class="column is-8 mx-auto p-5">
      <span class="icon is-block mb-5">
        <router-link :to="{ name: 'home' }">
          <ph-arrow-left :size="30" />
        </router-link>
      </span>
      <main>
        <template v-if="error">
          <div>
            {{ error.message }}
          </div>
        </template>

        <template v-if="entry">
          <EntryFull :entry="entry" :entryId="entryId" />
        </template>
      </main>
    </div>
  </div>
</template>

<style scoped>
a {
  color: #363636;
}
</style>
