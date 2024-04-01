<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import { useAuth } from "~/composables/useAuth";
import { logoutFromGoogle } from "~/firebase/authServices";

const router = useRouter();
const { user } = useAuth();
const toggle = (event: Event) => {
  menu.value.toggle(event);
};
const menu = ref();
const menuItems = ref([
  {
    label: "Dashboard",
    value: "dashboard",
    icon: "pi pi-home",
    command: () => {
      router.push("/dashboard");
    },
  },
  {
    label: "Data Table",
    value: "DataTable",
    icon: "pi pi-database",
    command: () => {
      router.push("/workoutOverview");
    },
  },
  {
    label: "Statistics",
    value: "statistics",
    icon: "pi pi-chart-bar",
    command: () => {
      router.push("/statistics");
    },
  },
  {
    label: "Settings",
    value: "settings",
    icon: "pi pi-cog",
    command: () => {
      router.push("/settings");
    },
  },
  {
    label: "Sign Out",
    value: "signOut",
    icon: "pi pi-sign-out",
    command: () => {
      logoutFromGoogle();
    },
  },
]);
</script>

<template>
  <Toolbar style="border-radius: 4rem">
    <template #start>
      <img src="../assets/MMLogo2.png" alt="Icon" class="toolbar-icon" />
      <label class="toolbar-label">MoveMetrics</label>
      <Button
        size="medium"
        icon="pi pi-bars"
        severity="secondary"
        class="toolbar-button"
        @click="toggle"
      />
      <Menu id="overlay_menu" ref="menu" :model="menuItems" :popup="true" />
    </template>
    <template #center>
      <div v-if="user" class="user-info">
        <span> Hello {{ user.displayName }}</span>
      </div>
    </template>
    <template #end>
      <Button
        size="medium"
        icon="pi pi-wrench"
        severity="secondary"
        class="toolbar-button"
      />
      <div v-if="user" class="user-info">
        <Avatar
          :image="
            user && user.photoURL
              ? user.photoURL
              : 'https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp'
          "
          class="avatar-styling"
          shape="circle"
        />
      </div>
      <div>
        <LoggingAndSignUp />
      </div>
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

.user-info {
  display: flex;
  align-items: center; /* Centers the elements vertically */
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
.avatar-styling {
  width: 35px; /* Sets the width of the avatar */
  height: 35px; /* Sets the height of the avatar */
  margin-left: 10px; /* Adds space to the left of the avatar */
  margin-right: 10px; /* Adds space to the right of the avatar */
}
</style>
