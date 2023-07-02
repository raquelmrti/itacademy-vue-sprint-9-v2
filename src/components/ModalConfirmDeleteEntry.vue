<script setup>
import { ref } from "vue";
import router from "@/router/index";
import { useEntryStore } from "@/stores/entryStore.js";
const entryStore = useEntryStore();

// data
const props = defineProps({
  entryId: String,
});

const entryId = ref(props.entryId);

// methods
const emit = defineEmits(["closeModal"]);
const close = () => {
  emit("closeModal");
};

const onConfirm = () => {
  entryStore.deleteEntry(entryId.value);
  router.push("/home");
};
</script>

<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content box p-6">
      <p>Are you sure you want to delete this entry?</p>
      <div class="field is-grouped mt-5 is-justify-content-center">
        <p class="control">
          <button class="button" @click="close">Cancel</button>
        </p>
        <p class="control">
          <button class="button is-danger" @click="onConfirm">Yes</button>
        </p>
      </div>
    </div>
  </div>
</template>
