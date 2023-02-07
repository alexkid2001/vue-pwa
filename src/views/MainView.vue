<template>
  <v-app>
    <v-layout class="h-100 d-flex flex-column pb-16">
      <v-app-bar class="text-blue-grey-darken-4" border flat>
        <v-btn to="/camera" class="d-none d-md-flex">
          <v-icon icon="mdi-camera" size="x-large" />
        </v-btn>
        <v-divider class="d-none d-md-flex" vertical />
        <v-toolbar-title>Instagram App</v-toolbar-title>
        <v-btn to="/" class="d-none d-md-flex">
          <v-icon icon="mdi-home" size="x-large" />
        </v-btn>
      </v-app-bar>
      <v-main class="bg-grey-lighten-4">
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
    <v-footer class="bg-white text-center d-flex flex-column border d-md-none">
      <v-tabs class="w-100 d-flex" slider-color="primary" color="primary" centered>
        <v-tab class="w-50" to="/">
          <v-icon icon="mdi-home" size="x-large" />
        </v-tab>
        <v-tab class="w-50" to="/camera">
          <v-icon icon="mdi-camera" size="x-large" />
        </v-tab>
      </v-tabs>
    </v-footer>
    <global-alert />
  </v-app>
</template>

<script setup lang="ts">
import GlobalAlert from '@/components/GlobalAlert.vue';
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap");

.v-app-bar {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
}

.v-toolbar-title {
  font-family: "Grand Hotel", cursive;
  font-size: 32px;
  @media screen and (max-width: 960px) {
    text-align: center;
  }
}

.v-toolbar__content {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.v-container {
  max-width: 1200px !important;
}

.v-footer {
  position: fixed !important;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
</style>
