
<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import { watch } from 'vue';
import { useContextParent } from '../context';
import type { OverwriteCursor } from '../types';

type Props = OverwriteCursor<PIXI.SpriteOptions> & {
  isMask?: boolean;
};

const props = defineProps<Props>();

const parentContext = useContextParent();
const sprite = new PIXI.Sprite(props.texture);

watch(
  () => props,
  (newProps) => {
    Object.keys(newProps).forEach((key) => {
      if (key !== 'isMask' && newProps[key as keyof Props] !== undefined) {
        // @ts-ignore
        sprite[key] = newProps[key as keyof Props];
      }
    });
  },
  { deep: true },
);

watch(
  () => props.isMask,
  (newVal) => {
    if (newVal !== undefined) {
      parentContext.parent.mask = newVal ? sprite : null;
    }
  },
);

parentContext.addToParent(sprite);
</script>
<template></template>
