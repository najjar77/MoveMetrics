<script setup lang="ts">
import {ref} from 'vue';
import Checkbox from 'primevue/checkbox';
import type {SaunaInformation} from "~/models/formData/saunaInformation";

const prop = defineProps<{
  saunaInformation: SaunaInformation
}>();

const finnish = ref(false);
const steam = ref(false);
const bio = ref(false);
</script>

<template>
  <Divider
    align="center"
    type="solid"
  >
    <b>Sauna</b>
  </Divider>
  <div class="container">
    <div class="flex align-items-center">
      <Checkbox
        :model-value="saunaInformation.finnish"
        input-id="finnish"
        name="finnish"
        :binary="true"
        @update:model-value="$emit('update:saunaInformation', {...saunaInformation, finnish: $event})"
      />
      <label
        for="finnish"
        class="label-margin"
      > Finnish Sauna</label>
    </div>
    <div class="flex align-items-center">
      <Checkbox
        :model-value="saunaInformation.bio"
        input-id="bio"
        name="bio"
        :binary="true"
        @update:model-value="$emit('update:saunaInformation', {...saunaInformation, bio: $event})"
      />
      <label
        for="bio"
        class="label-margin"
      > Bio Sauna</label>
    </div>
    <div class="flex align-items-center">
      <Checkbox
        :model-value="saunaInformation.steam"
        input-id="steam"
        name="steam"
        :binary="true"
        @update:model-value="$emit('update:saunaInformation', {...saunaInformation, steam: $event})"
      />
      <label
        for="steam"
        class="label-margin"
      > Steam Sauna</label>
    </div>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-wrap: wrap; /* Allows items to wrap if not enough space */
  gap: 80px; /* Adjusts space between elements */
  justify-content: flex-start; /* Align the items to the left */
  align-items: center; /* Align the items vertically in the center */
}

.label-margin {
  margin-left: 5px; /* Adjust the space as needed */
}
</style>


