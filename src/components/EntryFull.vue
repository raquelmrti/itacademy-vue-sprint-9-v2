<script setup>
import { ref, computed } from "vue";
import { PhPencilSimple, PhX, PhTrash, PhCheck } from "@phosphor-icons/vue";
import router from "@/router/index";

// stores
import { useEntryStore } from "@/stores/entryStore.js";
const entryStore = useEntryStore();

// data
const props = defineProps({
  entry: Object,
  entryId: String,
});

const isEditing = ref(false);
const entryId = ref(props.entryId);
const headline = ref(props.entry.headline);
const body = ref(props.entry.body);
const dateCreated = ref(props.entry.date_created);
const dateCreatedParsed = ref(props.entry.date_created_parsed);
const dateModified = ref(props.entry.date_modified);
const dateModifiedParsed = ref(props.entry.date_modified_parsed);

const entryWasModified = computed(() => {
  return dateModified.value - dateCreated.value === 0 ? false : true;
});

// methods

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
};
const onSave = () => {
  isEditing.value = false;
  const date = new Date();
  const parsedDate = date.toLocaleString();
  entryStore.updateEntry(entryId.value, headline.value, body.value, date, parsedDate);
};

const onCancel = () => {
  isEditing.value = false;
  headline.value = props.entry.headline;
  body.value = props.entry.body;
};

const onDelete = () => {
  const deleteConfirm = confirm("Are you sure you want to delete this entry?");
  if (deleteConfirm) {
    entryStore.deleteEntry(entryId.value);
    router.push("/home");
  }
};
</script>

<template>
  <div class="entry-card box">
    <div class="content">
      <h1 class="title mb-2" v-if="!isEditing">{{ headline }}</h1>
      <input class="input edit-title" v-else type="text" v-model="headline" />

      <span class="date is-block mb-1"
        >Written on {{ dateCreatedParsed }} by {{ props.entry.author_username }}</span
      >
      <span class="date is-block mb-4" v-if="entryWasModified"
        >Last modified on {{ dateModifiedParsed }}</span
      >

      <p v-html="body" class="entry-card-body" v-if="!isEditing"></p>
      <textarea class="textarea edit-body" v-else v-model="body"></textarea>

      <div class="buttons is-justify-content-flex-end">
        <button class="button is-brown-light" v-if="!isEditing" @click="toggleEditMode">
          <span class="icon mr-2">
            <ph-pencil-simple :size="20" />
          </span>
          Edit
        </button>

        <template v-else>
          <button class="button is-success is-fullwidth" @click="onSave">
            <span class="icon mr-2">
              <ph-check :size="20" weight="bold" />
            </span>
            Save
          </button>

          <button class="button is-brown-light is-fullwidth" @click="onCancel">
            <span class="icon mr-2">
              <ph-x :size="20" weight="bold" />
            </span>
            Cancel
          </button>

          <button class="button is-brown-light is-fullwidth" @click="onDelete">
            <span class="icon mr-2" weight="fill">
              <ph-trash :size="20" />
            </span>
            Delete entry
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.entry-card {
  padding: 3em;
}

.date {
  font-size: 0.8em;
  color: #b3acac;
}

.is-brown-light {
  background-color: #f1eded;
  color: gray;
  border: none;
}
.edit-title {
  height: 46px;
  color: #363636;
  font-weight: 600;
  line-height: 1.125;
  font-size: 2em;
  padding-left: 0.3em;
}

.edit-body {
  height: 400px;
  color: #757763;
  margin-bottom: 1em;
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: auto;
  scrollbar-color: #9d9799 #ffffff;
}

*::-webkit-scrollbar {
  width: 16px;
}

*::-webkit-scrollbar-track {
  background: #ffffff;
}

*::-webkit-scrollbar-thumb {
  background-color: #9d9799;
  border-radius: 10px;
  border: 3px solid #ffffff;
}
</style>
