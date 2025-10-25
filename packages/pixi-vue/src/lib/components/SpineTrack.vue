
<script lang="ts" setup>
import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';
import { ref, watch, onUnmounted } from 'vue';
import { useContextSpine } from '../context';

type SpineState = SPINE_PIXI.Spine['state'];
type TrackEntry = SPINE_PIXI.TrackEntry;

type Props = Partial<TrackEntry> & {
  trackIndex: Parameters<SpineState['setAnimation']>[0];
  animationName: Parameters<SpineState['setAnimation']>[1];
};

const props = defineProps<Props>();
const spine = useContextSpine();
const track = ref(spine.state.tracks[props.trackIndex]);

watch(
  () => [props.trackIndex, props.animationName],
  () => {
    if (props.trackIndex !== track.value?.trackIndex || props.animationName !== track.value?.animation?.name) {
      if (track.value) spine.state.setEmptyAnimation(track.value.trackIndex, 0);
      try {
        track.value = spine.state.setAnimation(props.trackIndex, props.animationName, props.loop);
      } catch (error) {
        console.error(error);
        const animations = spine?.state?.data?.skeletonData?.animations;
        if (animations) {
          console.log(
            'Available animation names:',
            animations.map((animation) => animation.name),
          );
        }
      }
    }
  },
);

watch(
  () => props,
  (newProps) => {
    Object.keys(newProps).forEach((key) => {
      if (key !== 'trackIndex' && key !== 'animationName' && newProps[key as keyof Props] !== undefined) {
        // @ts-ignore
        track.value[key] = newProps[key as keyof Props];
      }
    });
  },
  { deep: true },
);

onUnmounted(() => {
  spine.state.setEmptyAnimation(props.trackIndex, 0);
});
</script>
<template></template>
