<template>
    <svg
    class="absolute text-black bg-none border-none opacity-60 right-1 top-8"
    xmlns="http://www.w3.org/2000/svg"
    :width="30" :height="30"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path :d="visible ? mdiEye : mdiEyeOff" />
  </svg>
  </template>
  
  
  <script setup>
  import { mdiEye, mdiEyeOff } from '@mdi/js';
  
  const props = defineProps({
    visible: Boolean
  })
  </script>