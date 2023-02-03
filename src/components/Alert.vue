<template>
  <div>
    <v-alert
      :type="type"
      :value="!!alert['message']"
      dismissible
      outlined
    >{{ message }}</v-alert>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>
