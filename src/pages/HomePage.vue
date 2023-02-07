<template>
  <v-row>
    <v-col lg="8">
      <template v-if="posts.length">
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
      </template>
      <template v-else>
        <h5 class="text-center">No posts yet</h5>
      </template>
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
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import { useAlertStore } from '@/stores/alert';
import { mockPosts } from '@/constants/mockData';

const posts = ref<IPost[]>(mockPosts);

const globalAlert = useAlertStore();

const getPosts = () => {
  axios
    .get(`${process.env.VUE_APP_API}/posts`)
    .then((resp) => {
      posts.value = resp.data;
    })
    .catch((error) => {
      globalAlert.setAlert('error', 'Could not download posts');
      console.error(error);
    });
};

onBeforeMount(() => getPosts());
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
