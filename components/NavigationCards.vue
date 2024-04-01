<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import Avatar from "primevue/avatar";

const { user } = useAuth();
</script>

<template>
  <div class="cards-container">
    <Card class="custom-card1">
      <template #header>
        <img
          src="~/assets/tableOverview.svg"
          alt="tableOverview"
          width="75px"
          height="75px"
        />
      </template>
      <template #title>
        <i class="pi pi-info-circle" /> Table Overview
      </template>
      <template #content>
        Here you can have an overview of all your workouts
      </template>
      <template #footer>
        <NuxtLink to="workoutOverview">
          <Button label="Let's dive in" severity="secondary" />
        </NuxtLink>
      </template>
    </Card>
    <Card class="custom-card2">
      <template #title>
        <div class="card-title-center">
          <i class="pi pi-chart-line"></i> Statistics
        </div>
      </template>
      <template #content>
        Here you can have a deeper look into your overall statistics
      </template>
      <template #footer>
        <NuxtLink to="workoutOverview">
          <Button label="Let's dive in" severity="secondary" />
        </NuxtLink>
      </template>
    </Card>

    <Card class="custom-card3">
      <template #title>
        <div class="card-title-center"><i class="pi pi-user"></i> Account</div>
      </template>
      <template #content>
        <div class="avatar-content">
          <Avatar
            :image="
              user && user.photoURL
                ? user.photoURL
                : 'https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp'
            "
            class="avatar-styling"
            shape="circle"
          />

          Welcome back, <strong>{{ user?.displayName }}</strong>
          <strong>{{ user?.email }}</strong>
        </div>
      </template>
      <template #footer>
        <div class="card-button-center">
          <NuxtLink to="workoutOverview">
            <Button label="Let's dive in" severity="secondary" />
          </NuxtLink>
        </div>
      </template>
    </Card>

    <Card class="custom-card4">
      <template #title><i class="pi pi-cog" /> Settings</template>
      <template #content>
        Here you can change the settings of the website
      </template>
      <template #footer>
        <NuxtLink to="workoutOverview">
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

.avatar-styling {
  width: 100px; /* Sets the width of the avatar */
  height: 100px; /* Sets the height of the avatar */
  margin: 10px 1px 10px 1px; /* Adds space to the right of the avatar */
}

.avatar-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.card-title-center {
  display: flex;
  justify-content: center; /* Zentriert die Elemente horizontal */
  align-items: center; /* Zentriert die Elemente vertikal */
  gap: 10px; /* Optional: Abstand zwischen Icon und Text */
}

.card-button-center {
  display: flex;
  justify-content: center;
}

.card-title-with-icon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.tooltip-icon {
  cursor: help;
}
</style>
