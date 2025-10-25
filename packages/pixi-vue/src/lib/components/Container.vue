
<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import { watch } from 'vue';
import { useContextParent, provideContextParent } from '../context';
import type { OverwriteCursor } from '../types';

type Props = OverwriteCursor<Omit<PIXI.ContainerOptions, 'children'>>;

const props = defineProps<Props>();
const parentContext = useContextParent();
const container = new PIXI.Container();

watch(
  () => props,
  (newProps) => {
    Object.keys(newProps).forEach((key) => {
      if (key !== 'children' && newProps[key as keyof Props] !== undefined) {
        // @ts-ignore
        container[key] = newProps[key as keyof Props];
      }
    });
  },
  { deep: true },
);

parentContext.addToParent(container);
provideContextParent(container);
</script>

<template>
  <slot></slot>
</template>
