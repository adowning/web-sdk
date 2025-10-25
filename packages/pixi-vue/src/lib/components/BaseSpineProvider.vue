
<script lang="ts" setup>
import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';
import { watch } from 'vue';
import { provideContextSpine, useContextParent } from '../context';
import type { OverwriteCursor } from '../types';

type Props = OverwriteCursor<Omit<SPINE_PIXI.SpineOptions, 'children'>> & {
  spineData: SPINE_PIXI.SkeletonData;
};

const props = defineProps<Props>();

const parentContext = useContextParent();
const spine = new SPINE_PIXI.Spine(props.spineData);

watch(
  () => props,
  (newProps) => {
    Object.keys(newProps).forEach((key) => {
      if (key !== 'children' && newProps[key as keyof Props] !== undefined) {
        // @ts-ignore
        spine[key] = newProps[key as keyof Props];
      }
    });
  },
  { deep: true },
);

parentContext.addToParent(spine);
provideContextSpine(spine);
</script>

<template>
  <slot></slot>
</template>
