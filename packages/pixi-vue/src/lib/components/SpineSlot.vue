
<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import { onMounted, ref } from 'vue';
import { useContextSpine, provideContextParent, useContextSpineEventEmitter } from '../context';

type Props = {
  slotName: string;
};

const props = defineProps<Props>();
const spine = useContextSpine();
const slotContainer = new PIXI.Container();
const spineEventEmitter = useContextSpineEventEmitter();

const show = ref(!Boolean(spineEventEmitter));

onMounted(() => {
  if (spineEventEmitter) {
    spineEventEmitter.on('beforeUpdateWorldTransforms', () => {
      const slot = spine.skeleton.findSlot(props.slotName);
      if (slot) {
        show.value = Boolean(slot?.attachment);
      }
    });
  }
  spine.addSlotObject(props.slotName, slotContainer);
});

provideContextParent(slotContainer);
</script>

<template>
  <slot v-if="show"></slot>
</template>
