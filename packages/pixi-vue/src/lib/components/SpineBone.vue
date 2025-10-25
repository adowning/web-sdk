
<script lang="ts" setup>
import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';
import { watch } from 'vue';
import { useContextSpine } from '../context';

type Props = Partial<SPINE_PIXI.Bone> & {
  boneName: Parameters<SPINE_PIXI.Spine['skeleton']['findBone']>[0];
};

const props = defineProps<Props>();
const spine = useContextSpine();
const bone = spine.skeleton.findBone(props.boneName);

watch(
  () => props,
  (newProps) => {
    Object.keys(newProps).forEach((key) => {
      if (key !== 'boneName' && key !== 'y' && newProps[key as keyof Props] !== undefined) {
        // @ts-ignore
        bone[key] = newProps[key as keyof Props];
      }
    });
  },
  { deep: true },
);

watch(
  () => props.y,
  (newVal) => {
    if (bone && newVal !== undefined) bone.y = -newVal;
  },
);
</script>
<template></template>
