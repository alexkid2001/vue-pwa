<template>
  <h2>Camera page</h2>
  <v-row justify="center">
    <v-col cols="12" lg="6">
      <div class="camera-frame pa-2">
        <video class="w-100" autoplay ref="video" v-show="!photoIsCreated">
          <source />
          <track src="captions_en.vtt" kind="captions" srclang="en" label="english_captions">
        </video>
        <canvas
          v-show="photoIsCreated"
          ref="canvas"
          class="w-100"
          height="240"
        />
      </div>
    </v-col>
  </v-row>
  <v-row justify="center" class="mt-8">
    <v-col cols="12" md="6" class="text-center">
      <v-btn
        v-if="isCameraSupport"
        class="text-white"
        color="blue-grey"
        fab
        x-large
        rounded
        icon
        @click="captureImage"
      >
        <v-icon size="x-large">mdi-camera</v-icon>
      </v-btn>

      <v-file-input
        v-else
        accept="image/*"
        label="Choose on image"
        v-model="imageUpload"
        @update:modelValue="captureImageFallback"
      ></v-file-input>
    </v-col>
  </v-row>
  <v-row justify="center" class="mt-8">
    <v-col cols="12" md="6" class="text-center">
      <v-text-field
        v-model="post.caption"
        label="Caption"
        required
        filled
        bg-color="transparent"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row justify="center" class="mt-2">
    <v-col cols="12" md="6" class="text-center">
      <v-text-field
        v-model="post.location"
        label="Location"
        required
        filled
        bg-color="transparent"
        :loading="isLocationLoading"
      >
        <template v-slot:append v-if="!isLocationLoading || !isLocationSupported">
          <v-icon @click="getLocation">mdi-map-marker</v-icon>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
  <v-row justify="center" class="mt-6">
    <v-col cols="12" md="6" class="text-center">
      <v-btn rounded color="success" size="large">Post Image</v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import {
  computed,
  inject, onBeforeUnmount, onMounted, ref,
} from 'vue';
import axios from 'axios';

require('md-gum-polyfill');

const post = ref({
  id: null,
  caption: '',
  location: '',
  photo: null,
  date: Date.now(),
});
// const axios = inject('axios');

const photoIsCreated = ref(false);
const isCameraSupport = ref(true);
const imageUpload = ref([]);
const isLocationLoading = ref(false);

const video = ref(null);
const canvas = ref(null);

const initCamera = () => {
  try {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        //   {
        //   facingMode: { exact: 'environment' },
        // },
      })
      .then((stream) => {
        video.value.srcObject = stream;
      })
      .catch((err) => {
        isCameraSupport.value = false;
        console.error(err);
        // alert(err);
      });
  } catch (error) {
    console.error(error);
    // alert(error);
    isCameraSupport.value = false;
  }
};

const dataURItoBlob = (dataURI) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  const ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  const blob = new Blob([ab], { type: mimeString });
  return blob;
};

const disableCamera = () => {
  video.value.srcObject.getVideoTracks().forEach((track) => {
    track.stop();
  });
};

const captureImage = () => {
  canvas.value.width = video.value.getBoundingClientRect().width;
  canvas.value.height = video.value.getBoundingClientRect().height;
  const context = canvas.value.getContext('2d');
  context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
  photoIsCreated.value = true;
  const canvasURI = canvas.value.toDataURL();
  post.value.photo = canvasURI ? dataURItoBlob(canvasURI) : null;
  disableCamera();
};

const captureImageFallback = (file) => {
  const context = canvas.value.getContext('2d');

  post.value.photo = file;
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      canvas.value.width = img.width;
      canvas.value.height = img.height;
      context.drawImage(img, 0, 0);
      photoIsCreated.value = true;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file[0]);
};

const locationSuccess = (data) => {
  const { city, country } = data;
  post.value.location = `${city}, ${country}`;
};

const locationError = (error) => {
  console.error(error);
  isLocationLoading.value = false;
};

const getCityAndCountry = (position) => {
  const { latitude, longitude } = position.coords;
  const apiURL = `https://geocode.xyz/${latitude},${longitude}?json=1`;
  axios.get(apiURL)
    .then((response) => {
      locationSuccess(response.data);
      isLocationLoading.value = false;
    })
    .catch(locationError);
};

const getLocation = () => {
  isLocationLoading.value = true;
  navigator.geolocation.getCurrentPosition((position) => {
    getCityAndCountry(position);
  }, locationError, { timeout: 7000 });
};

const isLocationSupported = computed(() => 'geolocation' in navigator);

onMounted(() => {
  initCamera();
});
onBeforeUnmount(() => {
  if (isCameraSupport.value) disableCamera();
});
</script>

<style scoped lang="scss">
.camera-frame {
  border: 2px solid #37474f;
  border-radius: 10px;
}
.caption-field {
  .v-field--focused {
    input {
      background-color: transparent !important;
    }
  }
}
</style>
