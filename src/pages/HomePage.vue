<template>

  <transition name="fade">
    <v-row v-if="showAlert" >
      <v-alert type="error">{{ message }}</v-alert>
    </v-row>
  </transition>

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

const posts = ref<IPost[]>([
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
]);

const message = ref('');
const alertType = ref('info');
const showAlert = ref(false);

const showMessage = (type: string, msg: string) => {
  message.value = msg;
  alertType.value = type;
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 3000);
};

const getPosts = () => {
  axios.get(`${process.env.VUE_APP_API}/posts`)
    .then((resp) => {
      posts.value = resp.data;
    })
    .catch((error) => {
      showMessage('error', error);
      console.error(error);
    });
};

onBeforeMount(() => getPosts());
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
