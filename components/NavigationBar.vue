<script setup lang="ts">
import {ref} from "vue";
import Menu from 'primevue/menu';
import {useRouter} from 'vue-router';

const router = useRouter();
const visible = ref(false);

const menuOptions = ref([{
  label: 'Dashboard',
  icon: 'pi pi-home',
  command: () => router.push('dashboard')
}, {
  label: 'Statistics',
  icon: 'pi pi-chart-bar',
  command: () => router.push('statistics')

}, {
  label: 'Account',
  icon: 'pi pi-user',
  command: () => router.push('account')

}
]);

</script>

<template>
  <div>
    <Sidebar
      v-model:visible="visible"
      header="MoveMetrics"
    >
      <div class="sidebar-content">
        <Menu :model="menuOptions" />
        <div class="logout-menu">
          <Menu
            :model="[{
              label: 'Logout',
              icon: 'pi pi-power-off'
            }]"
          />
        </div>
      </div>
    </Sidebar>
    <Button
      icon="pi pi-bars"
      @click="visible = true"
    />
  </div>
</template>

<style scoped>
.sidebar-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.logout-menu {
  margin-top: auto; /* Pushes the logout menu to the bottom */
}
</style>
