
<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import { watch } from 'vue';
import { useContextParent } from '../context';
import type { OverwriteCursor } from '../types';

type Props = OverwriteCursor<PIXI.GraphicsOptions> & {
  isMask?: boolean;
  draw: (graphics: PIXI.Graphics) => void;
};

const props = defineProps<Props>();

const parentContext = useContextParent();
const graphics = new PIXI.Graphics();

watch(
  () => props,
  (newProps) => {
    Object.keys(newProps).forEach((key) => {
      if (key !== 'isMask' && key !== 'draw' && newProps[key as keyof Props] !== undefined) {
        // @ts-ignore
        graphics[key] = newProps[key as keyof Props];
      }
    });
  },
  { deep: true },
);

watch(
  () => props.isMask,
  (newVal) => {
    if (newVal !== undefined) {
      parentContext.parent.mask = newVal ? graphics : null;
    }
  },
);

watch(
  () => props.draw,
  (newVal) => {
    if (newVal) {
      graphics.clear();
      newVal(graphics);
    }
  },
);

parentContext.addToParent(graphics);
</script>
<template></template>
