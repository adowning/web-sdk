
<script lang="ts" setup>
import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';
import { computed, watch } from 'vue';
import BaseSpineProvider from './BaseSpineProvider.vue';
import { anchorToPivot } from '../utils';
import { useContextApp } from '../context';
import type { PixiPoint } from '../types';

type Props = Omit<Parameters<typeof BaseSpineProvider>[0], 'spineData' | 'pivot' | 'scale'> & {
  debug?: boolean;
  key: string;
  anchor?: PixiPoint;
  scale?: PixiPoint;
};

const props = defineProps<Props>();
const context = useContextApp();
const spineData = computed(() => context.stateApp.loadedAssets?.[props.key] as SPINE_PIXI.SkeletonData);

const SCALE_BASE = { x: 1, y: 1 };

const scaleSize = computed(() => {
  if (!spineData.value) return SCALE_BASE;
  if (!spineData.value?.width || !spineData.value?.height) return SCALE_BASE;
  if (!props.width && !props.height) return SCALE_BASE;
  if (!props.width && props.height) {
    const scaleHeight = props.height / spineData.value.height;
    return { x: scaleHeight, y: scaleHeight };
  }
  if (props.width && !props.height) {
    const scaleWidth = props.width / spineData.value.width;
    return { x: scaleWidth, y: scaleWidth };
  }
  if (props.width && props.height) {
    return {
      x: props.width / spineData.value.width,
      y: props.height / spineData.value.height,
    };
  }
  return SCALE_BASE;
});

const scale = computed(() => {
  if (typeof props.scale === 'number')
    return { x: scaleSize.value.x * props.scale, y: scaleSize.value.y * props.scale };
  return { x: scaleSize.value.x * (props.scale?.x || 1), y: scaleSize.value.y * (props.scale?.y || 1) };
});

const pivot = computed(() => {
  if (!spineData.value) return 0;
  if (!spineData.value?.width || !spineData.value?.height) return 0;
  const factWidth = props.width || spineData.value.width;
  const factHeight = props.height || spineData.value.height;

  return anchorToPivot({ anchor: props.anchor, sizes: { width: factWidth, height: factHeight } });
});

watch(
  spineData,
  (newSpineData) => {
    if (!newSpineData) {
      console.error(`Spine: key "${props.key}" is not found in loadedAssets`);
    }
    if (!newSpineData || props.debug) {
      console.log('loadedAssets', context.stateApp.loadedAssets);
    }
  },
  { immediate: true },
);
</script>

<template>
  <BaseSpineProvider v-if="spineData" v-bind="props" :scale="scale" :pivot="pivot" :spineData="spineData">
    <slot></slot>
  </BaseSpineProvider>
</template>
