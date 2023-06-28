<script setup>
import { ref } from "vue";
import { PhPaperPlaneTilt } from "@phosphor-icons/vue";

// stores
import { useEntryStore } from "@/stores/entryStore.js";
const entryStore = useEntryStore();

// data
const entryHeadline = ref("");
const entryBody = ref("");

// methods
const emit = defineEmits(["closeModal"]);
const close = () => {
  emit("closeModal");
};

const resetForm = () => {
  entryHeadline.value = "";
  entryBody.value = "";
};

const onSubmit = () => {
  const date = new Date();
  const parsedDate = date.toLocaleString();
  const parsedBody = entryBody.value.replace(/\r\n|\r|\n/g, "<br>");
  entryStore.createEntry(entryHeadline.value, parsedBody, date, parsedDate);
  resetForm();
  close();
};
</script>

<template>
  <Teleport to="body">
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="modal-card mx-0">
          <form @submit.prevent="onSubmit">
            <header class="modal-card-head">
              <p class="modal-card-title">New journal entry</p>
              <button class="delete" aria-label="close" @click="close"></button>
            </header>

            <section class="modal-card-body">
              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Title"
                    v-model.trim="entryHeadline"
                  />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <textarea
                    class="textarea"
                    type="text"
                    placeholder="Start writing here"
                    v-model="entryBody"
                    required
                  />
                </div>
              </div>
            </section>
            <footer class="modal-card-foot">
              <button type="submit" class="button is-primary">
                <span class="icon mr-2"> <ph-paper-plane-tilt :size="20" /></span>
                Publish
              </button>
              <button class="button" @click="close">Cancel</button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
input::placeholder,
textarea::placeholder {
  color: #9b9b9b;
}
</style>
