
<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import { watch, onMounted } from 'vue';
import { useContextParent } from '../context';
import type { Sizes, OverwriteCursor } from '../types';

type Props = OverwriteCursor<PIXI.ITextStyle> & {
  text: string;
  onresize?: (arg0: Sizes) => void;
};

const props = defineProps<Props>();

const parentContext = useContextParent();
const text = new PIXI.Text({ text: props.text, style: props });

watch(
  () => props,
  (newProps) => {
    Object.keys(newProps).forEach((key) => {
      if (key !== 'onresize' && newProps[key as keyof Props] !== undefined) {
        // @ts-ignore
        text[key] = newProps[key as keyof Props];
      }
    });
    props.onresize?.({ width: text.width, height: text.height });
  },
  { deep: true },
);

onMounted(() => {
  props.onresize?.({ width: text.width, height: text.height });
});

parentContext.addToParent(text);
</script>
<template></template>
