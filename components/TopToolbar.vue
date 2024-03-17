<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Avatar from "primevue/avatar";

const visibilityOfMenu = ref(false);

const router = useRouter();

const toggle = (event: Event) => {
  menu.value.toggle(event);
};
const menu = ref();
const menuItems = ref([{
  label: 'Dashboard',
  value: 'dashboard',
  icon: 'pi pi-home',
  command: () => {
    router.push('/');
  }
}, {
  label: 'Data Table',
  value: 'DataTable',
  icon: 'pi pi-chart-bar',
  command: () => {
    router.push('/workoutOverview');
  }
}, {
  label: 'Statistics',
  value: 'statistics',
  icon: 'pi pi-chart-bar',
  command: () => {
    router.push('/statistics');
  }
}
]);

</script>

<template>
  <Toolbar style="border-radius: 4rem;">
    <template #start>
      <img
        src="../assets/MMLogo2.png"
        alt="Icon"
        class="toolbar-icon"
      >
      <label class="toolbar-label">MoveMetrics</label>
      <Button
        size="medium"
        icon="pi pi-bars"
        severity="secondary"
        class="toolbar-button"
        @click="toggle"
      />
      <Menu
        id="overlay_menu"
        ref="menu"
        :model="menuItems"
        :popup="true"
      />
    </template>
    <template #center />
    <template #end>
      <Button
        size="medium"
        icon="pi pi-wrench"
        severity="secondary"
        class="toolbar-button"
      />
      <Avatar
        image="https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp"
        class="toolbar-avatar"
      />
    </template>
  </Toolbar>
</template>

<style scoped>
/* Styles for the icon in the toolbar, adds space to its right */
.toolbar-icon {
  margin-right: 10px;
  width: 30px; /* Sets the width of the Logo */
  height: 30px; /* Sets the height of the Logo */
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
  width: 30px; /* Sets the width of the avatar */
  height: 30px; /* Sets the height of the avatar */
}

</style>
