
<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import { watch } from 'vue';
import { useContextParent, provideContextParticleParent } from '../context';
import type { OverwriteCursor } from '../types';

type Props = OverwriteCursor<PIXI.ParticleContainerOptions>;

const props = defineProps<Props>();
const parentContext = useContextParent();
const particleContainer = new PIXI.ParticleContainer();

watch(
  () => props,
  (newProps) => {
    Object.keys(newProps).forEach((key) => {
      if (key !== 'children' && newProps[key as keyof Props] !== undefined) {
        // @ts-ignore
        particleContainer[key] = newProps[key as keyof Props];
      }
    });
  },
  { deep: true },
);

parentContext.addToParent(particleContainer);
provideContextParticleParent(particleContainer);
</script>

<template>
  <slot></slot>
</template>
