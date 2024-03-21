<script setup lang="ts">
import Card from "primevue/card";
import {useAuth} from "~/composables/useAuth";

const {user} = useAuth();

</script>

<template>
  <div class="card-container">
    <Card class="card-style">
      <template #title>
        <div v-if="!user">
          <img
            src="~/assets/google_logo.svg"
            alt="Google Logo"
            width="20"
            height="20"
          >
          Google Login
        </div>
        <div v-else>
          Logout
        </div>
      </template>
      <template #content>
        <div class="content-container">
          <span v-if="!user">Please Login to continue. Notice that you only can login via Google</span>
          <LoggingAndSignUp />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.card-container {
  display: flex; /* Aktiviert Flexbox */
  justify-content: center; /* Zentriert die Inhalte horizontal */
  align-items: center; /* Zentriert die Inhalte vertikal */
  height: 100vh; /* Setzt die Höhe des Containers auf die Höhe des Viewports */
}

.card-style {
  width: 350px;
}

.content-container {
  display: flex; /* Aktiviert Flexbox für den Inhalt der Karte */
  flex-direction: column; /* Richtet die Kinder (Text und LoggingAndSignUp) vertikal aus */
  align-items: center; /* Zentriert die Inhalte horizontal */
  gap: 20px; /* Fügt einen Abstand zwischen den Elementen hinzu */
}

/* Optional: Wenn Sie genauere Kontrolle über den Abstand wünschen */
.content-container > span {
  margin-bottom: 20px; /* Fügt einen Abstand unter dem Span-Element hinzu */
}

</style>