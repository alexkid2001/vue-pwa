<template>
  <v-row>
    <v-col lg="8">
      <post-card
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :caption="post.caption"
        :date="post.date"
        :image-url="post.imageUrl"
        :location="post.location"
        :user="post.user"
      />
    </v-col>
    <v-col lg="4" class="d-none d-lg-block">
      <profile-preview class="position-fixed" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { IPost } from '@/models/post';
import PostCard from '@/components/PostCard.vue';
import ProfilePreview from '@/components/ProfilePreview.vue';

const posts: IPost[] = [
  {
    id: 1,
    user: 'danny__connell',
    caption: 'Golden Gate Bridge',
    date: 1663078058091,
    location: 'San Francisco, United State',
    imageUrl:
      'https://cdn.britannica.com/95/94195-050-FCBF777E/Golden-Gate-Bridge-San-Francisco.jpg',
  },
  {
    id: 2,
    user: 'danny__connell_2',
    caption: 'Golden Gate Bridge',
    date: 1663078058091,
    location: 'San Francisco, United State',
    imageUrl:
      'https://cdn.britannica.com/95/94195-050-FCBF777E/Golden-Gate-Bridge-San-Francisco.jpg',
  },
  {
    id: 3,
    user: 'danny__connell_3',
    caption: 'Golden Gate Bridge',
    date: 1663078058091,
    location: 'San Francisco, United State',
    imageUrl:
      'https://cdn.britannica.com/95/94195-050-FCBF777E/Golden-Gate-Bridge-San-Francisco.jpg',
  },
  {
    id: 3,
    user: 'danny__connell_4',
    caption: 'Golden Gate Bridge',
    date: 1663078058091,
    location: 'San Francisco, United State',
    imageUrl:
      'https://cdn.britannica.com/95/94195-050-FCBF777E/Golden-Gate-Bridge-San-Francisco.jpg',
  },
];
</script>
