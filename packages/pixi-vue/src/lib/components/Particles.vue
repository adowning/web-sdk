
<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import { computed, onMounted, watch } from 'vue';
import { useContextApp, useContextParticleParent } from '../context';
import type { LoadedSprite } from '../types';

type Props = {
  key: string;
  size: number;
  init: (particles: PIXI.Particle[]) => void;
  update: (particles: PIXI.Particle[]) => void;
};

const props = defineProps<Props>();
const context = useContextApp();
const particleContainer = useContextParticleParent();
const texture = computed(
  () => (context.stateApp.loadedAssets?.[props.key] || PIXI.Texture.EMPTY) as LoadedSprite,
);

const particles: PIXI.Particle[] = Array.from(
  { length: props.size },
  () => new PIXI.Particle(texture.value),
);

onMounted(() => {
  particleContainer.addParticle(...particles);
  props.init(particles);

  if (context.stateApp.pixiApplication) {
    context.stateApp.pixiApplication.ticker.add(() => {
      props.update(particles);
      particleContainer.update();
    });
  }
});

watch(
  texture,
  (newTexture) => {
    if (newTexture === PIXI.Texture.EMPTY) {
      console.error(`Particle: key "${props.key}" is not found in the loadedAssets`);
      console.log('loadedAssets', context.stateApp.loadedAssets);
    }
  },
  { immediate: true },
);
</script>

<template></template>
