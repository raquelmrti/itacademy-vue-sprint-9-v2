<script setup>
const props = defineProps({
  entry: Object,
});
</script>

<template>
  <div class="box">
    <h2 class="title is-5 mb-1">{{ props.entry.headline }}</h2>
    <h3 class="mb-4">{{ props.entry.date_created }}</h3>
    <p>{{ props.entry.body }}</p>
  </div>
</template>
