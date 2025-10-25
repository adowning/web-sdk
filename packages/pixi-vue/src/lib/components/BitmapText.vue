
<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import { watch, onMounted } from 'vue';
import { useContextParent } from '../context';
import type { Sizes, OverwriteCursor } from '../types';

type Props = OverwriteCursor<PIXI.IBitmapTextStyle> & {
  text: string;
  onresize?: (arg0: Sizes) => void;
};

const props = defineProps<Props>();

const parentContext = useContextParent();
const bitmapText = new PIXI.BitmapText({ text: props.text, style: props });

watch(
  () => props,
  (newProps) => {
    Object.keys(newProps).forEach((key) => {
      if (key !== 'onresize' && newProps[key as keyof Props] !== undefined) {
        // @ts-ignore
        bitmapText[key] = newProps[key as keyof Props];
      }
    });
    props.onresize?.({ width: bitmapText.width, height: bitmapText.height });
  },
  { deep: true },
);

onMounted(() => {
  props.onresize?.({ width: bitmapText.width, height: bitmapText.height });
});

parentContext.addToParent(bitmapText);
</script>
<template></template>
