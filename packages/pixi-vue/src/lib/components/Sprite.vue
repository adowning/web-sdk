
<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import { computed, watch } from 'vue';
import BaseSprite from './BaseSprite.vue';
import { useContextApp } from '../context';
import type { LoadedSprite } from '../types';

type Props = Omit<Parameters<typeof BaseSprite>[0], 'texture'> & {
  debug?: boolean;
  key: string;
};

const props = defineProps<Props>();
const context = useContextApp();
const texture = computed(
  () => (context.stateApp.loadedAssets?.[props.key] || PIXI.Texture.EMPTY) as LoadedSprite,
);

watch(
  texture,
  (newTexture) => {
    if (newTexture === PIXI.Texture.EMPTY || props.debug) {
      console.error(`Sprite: key "${props.key}" is not found in the loadedAssets`);
      console.log('loadedAssets', context.stateApp.loadedAssets);
    }
  },
  { immediate: true },
);
</script>

<template>
  <BaseSprite v-bind="props" :texture="texture" />
</template>
