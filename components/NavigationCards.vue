<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
</script>

<template>
  <div class="cards-container">
    <Card class="custom-card1">
      <template #title>
        <i class="pi pi-info-circle" /> Table Overview
      </template>
      <template #content>
        Here you can have an overview of all your workouts</template
      >
      <template #footer>
        <NuxtLink to="tableOverview">
          <Button label="Let's dive in" severity="secondary" />
        </NuxtLink>
      </template>
    </Card>
    <Card class="custom-card2">
      <template #title> <i class="pi pi-chart-line" /> Statistics </template>
      <template #content>
        Here you can have a deeper look into your overall statistics</template
      >
      <template #footer>
        <NuxtLink to="tableOverview">
          <Button label="Let's dive in" severity="secondary" />
        </NuxtLink>
      </template>
    </Card>

    <Card class="custom-card3">
      <template #title> <i class="pi pi-user" /> Account </template>
      <template #content
        >Here you can change your personal Information</template
      >
      <template #footer>
        <NuxtLink to="tableOverview">
          <Button label="Let's dive in" severity="secondary" />
        </NuxtLink>
      </template>
    </Card>

    <Card class="custom-card4">
      <template #title> <i class="pi pi-cog" /> Settings </template>
      <template #content>
        Here you can change the settings of the website</template
      >
      <template #footer>
        <NuxtLink to="tableOverview">
          <Button label="Let's dive in" severity="secondary" />
        </NuxtLink>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem; /* Adds space between cards */
}

@media (max-width: 768px) {
  .cards-container {
    flex-direction: column;
    align-items: center;
  }

  .custom-card1,
  .custom-card2,
  .custom-card3,
  .custom-card4 {
    width: 90%;
  }
}

.custom-card1,
.custom-card2,
.custom-card3,
.custom-card4 {
  width: 25rem;
  background-color: #073b4c; /* Example color, adjust for each card */
  color: white;
  margin-bottom: 1rem; /* Adds space below each card for stacking */
}

/* You might want to adjust or remove these styles based on your outer card design */
.custom-card1 {
  background-color: #073b4c;
}

.custom-card2 {
  background-color: #344e41;
}

.custom-card3 {
  background-color: #4c0827;
}

.custom-card4 {
  background-color: #9e2a2b;
}
</style>
