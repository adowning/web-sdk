
<script lang="ts" setup>
import { computed, watch } from 'vue';
import AnimatedSprite from './AnimatedSprite.vue';
import { useContextApp } from '../context';
import type { LoadedSpriteSheet } from '../types';

type Props = Omit<Parameters<typeof AnimatedSprite>[0], 'textures'> & {
  key: string;
};

const props = defineProps<Props>();
const context = useContextApp();
const textures = computed(() => context.stateApp.loadedAssets?.[props.key] as LoadedSpriteSheet);
const isValid = computed(() => textures.value && 'length' in textures.value);

watch(
  isValid,
  (newIsValid) => {
    if (!newIsValid) {
      console.error(`SpriteSheet: key "${props.key}" is not found in loadedAssets`);
      console.log('loadedAssets', context.stateApp.loadedAssets);
    }
  },
  { immediate: true },
);
</script

<template>
  <AnimatedSprite v-bind="props" :textures="isValid ? textures : []" />
</template>
