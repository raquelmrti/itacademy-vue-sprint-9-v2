<script setup>
import { ref, computed, toRef, watch } from "vue";

const props = defineProps({
  entry: Object,
});
</script>

<template>
  <div class="entry-card box">
    <h2 class="title is-5 mb-1">{{ props.entry.headline }}</h2>
    <h3 class="date mb-4">{{ props.entry.date_created_parsed }}</h3>
    <p v-html="props.entry.body" class="entry-card-body"></p>
  </div>
</template>

<style scoped>
.entry-card {
  padding: 2.5em;
  max-height: 300px;
}

.date {
  font-size: 0.8em;
  color: #b3acac;
}

.entry-card-body {
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
}
</style>
