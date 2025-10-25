
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import { useContextApp } from '../context';

import InitialiseApplication from './InitialiseApplication.vue';
import InitialiseParent from './InitialiseParent.vue';
import AssetsLoader from './AssetsLoader.vue';

const context = useContextApp();

onMounted(() => context.stateApp.reset());
onUnmounted(() => context.stateApp.reset());
</script>

<template>
  <InitialiseApplication>
    <InitialiseParent>
      <AssetsLoader>
        <slot></slot>
      </AssetsLoader>
    </InitialiseParent>
  </InitialiseApplication>
</template>
