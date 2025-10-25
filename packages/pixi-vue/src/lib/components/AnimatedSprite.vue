
<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import { watch } from 'vue';
import { useContextParent } from '../context';
import type { OverwriteCursor } from '../types';

type Props = OverwriteCursor<PIXI.AnimatedSpriteOptions> & {
  animationSpeed?: PIXI.AnimatedSprite['animationSpeed'];
  loop?: PIXI.AnimatedSprite['loop'];
  play?: boolean;
};

const props = defineProps<Props>();

const parentContext = useContextParent();
const animatedSprite = new PIXI.AnimatedSprite(props.textures ?? []);

watch(
  () => props,
  (newProps) => {
    Object.keys(newProps).forEach((key) => {
      if (key !== 'play' && newProps[key as keyof Props] !== undefined) {
        // @ts-ignore
        animatedSprite[key] = newProps[key as keyof Props];
      }
    });
  },
  { deep: true },
);

watch(
  () => props.play,
  (newVal) => {
    if (newVal) {
      animatedSprite.gotoAndPlay(0);
    } else {
      animatedSprite.gotoAndStop(0);
    }
  },
);

parentContext.addToParent(animatedSprite);
</script>
<template></template>
