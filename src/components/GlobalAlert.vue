<template>
  <v-alert
    v-if="alert.message"
    :type="alert.type"
    :value="!!alert.message"
    dismissible
    outlined
    class='global-alert'
  >
    {{ alert.message }}
  </v-alert>
</template>

<script setup>
import { useAlertStore } from '@/stores/alert';

const alert = useAlertStore();

</script>

<style scoped>
 .global-alert {
   position: fixed;
   bottom: 0;
   left: 0;
   right: 0;
 }
</style>
