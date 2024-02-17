<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Avatar from "primevue/avatar";

</script>

<template>
  <Toolbar style="border-radius: 4rem;">
    <template #start>
      <img src="../assets/MMLogo.png" alt="Icon" class="toolbar-icon">
      <label class="toolbar-label">MoveMetrics</label>
      <Button icon="pi pi-bars" severity="secondary" class="toolbar-button"/>
    </template>
    <template #center>
    </template>
    <template #end>
      <Button icon="pi pi-wrench" severity="secondary" label="Settings" class="toolbar-button"/>
      <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="toolbar-avatar"/>
    </template>
  </Toolbar>
</template>

<style scoped>
/* Styles for the icon in the toolbar, adds space to its right */
.toolbar-icon {
  margin-right: 10px;
  width: 50px; /* Sets the width of the Logo */
  height: 50px; /* Sets the height of the Logo */
}

/* Styles for the label in the toolbar, adds bold font weight and space to its right */
.toolbar-label {
  margin-right: 10px; /* Adds spacing to the right, creating separation between the label and the next element */
  font-weight: bold; /* Makes the label text bold */
}

/* Styles for buttons in the toolbar, adds space to their right */
.toolbar-button {
  margin-right: 10px; /* Adds spacing to the right, creating separation between the button and the next element */
}

/* For the last element in the #end slot, no right margin is needed. Styles for the avatar, sets its size */
.toolbar-avatar {
  width: 50px; /* Sets the width of the avatar */
  height: 50px; /* Sets the height of the avatar */
}

</style>
