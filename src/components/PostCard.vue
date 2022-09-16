<template>
  <v-card class="mx-auto card-post mb-5">
    <v-card-title>
      <v-list-item
        class="w-100"
        prepend-avatar="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        :title="user"
        :subtitle="location"
      />
    </v-card-title>
    <v-divider />

    <v-img :src="imageUrl" :lazy-src="imageUrl" height="300px" cover />
    <v-card-text>
      <v-card-title>{{ caption }}</v-card-title>
      <v-card-subtitle>{{ niceDate }}</v-card-subtitle>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{
  id: number;
  user: string;
  caption: string;
  date: number;
  imageUrl: string;
  location: string;
}>();

const niceDate = computed(() => {
  const date = new Date(props.date);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-EN', options).format(date);
});
</script>
